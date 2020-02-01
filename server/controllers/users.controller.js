const dbHelper = require( './../helpers/db.helper' );
const socketClass = require('./../socket')
const userObject = {
    user_id: null,
    chats_ids: [],
    user_name: null
}

class UserController {

    getRandomId() {
        return new Promise( async ( resolve ) => {
            const IdGenerated = Math.round( Math.random() * 500 );
            const usersAlreadyAdded = await dbHelper.getDbData( "users", { user_id: IdGenerated } );
            if ( usersAlreadyAdded && usersAlreadyAdded.length ) {
                await this.getRandomId()
            }
            if ( usersAlreadyAdded && !usersAlreadyAdded.length ) {
                userObject.user_id = IdGenerated;
                userObject.user_name = "User - " + IdGenerated;
                await dbHelper.inserDbData( "users", userObject )
                return resolve( IdGenerated )
            }
        } )
    }

    getUserListAndInfo( userId, chatUserId ) {
        return new Promise( async ( resolve, reject ) => {
            try {
                const response = {
                    user: {},
                    chatedUsers: []
                }
                const userInfo = await dbHelper.getDbData( "users", { user_id: userId } );
                console.log( "userInfo", userInfo );
                if ( userInfo && !userInfo.length ) {
                    return reject( "ERR_ID" )
                }
                response.user = userInfo[ 0 ]
                response.user.chatsTopic = 'topic_user_' + response.user.user_id
                if ( userInfo[ 0 ].chats_ids && userInfo[ 0 ].chats_ids.length ) {
                    const userInfos = await dbHelper.getDbData( "users", { user_id: { $in: userInfo[ 0 ].chats_ids } } );
                    response.chatedUsers = userInfos
                }
                return resolve( response )
            } catch ( error ) {
                console.error( "[getUserListAndInfo] Error : ", error )
                return reject()
            }
        } )
    }

    getUsersInfo( userId, chatUserId ) {
        return new Promise( async ( resolve, reject ) => {
            try {
                /*                      */
                const response = {
                    chatuser: {},
                }
                const userInfo = await dbHelper.getDbData( "users", { user_id: chatUserId } );
                console.log( "userInfo", userInfo );
                if ( userInfo && !userInfo.length ) {
                    return reject( "ERR_NOT_FOUND" )
                }
                response.user = userInfo[ 0 ]
                if ( userInfo[ 0 ].chats_ids ) {
                    if ( userInfo[ 0 ].chats_ids.includes( chatUserId ) ) {
                        return reject( "ALREADY_ADDED" )
                    }
                    console.log("--- TO HERE");
                    
                    const mainUserInfo = await dbHelper.getDbData( "users", { user_id: userId } );
                    await dbHelper.updateDbData( "users", userId, { $push: { chats_ids: chatUserId } } )
                    await dbHelper.updateDbData( "users", chatUserId, { $push: { chats_ids: userId } } )
                    socketClass.sendToUsers(userId, response.user);
                    socketClass.sendToUsers(chatUserId, mainUserInfo[0]);
                }
                return resolve( response )
            } catch ( error ) {
                console.error( "[getUsersList] Error : ", error )
                return reject( error );
            }
        } )
    }

    getUserMessages( userId, chatUserId ) {
        return new Promise( async ( resolve, reject ) => {
            try {
                const response = {
                    messages: [],
                }
                const messages = await dbHelper.getDbData( "chats", { $or: [{ dept: chatUserId + userId }, { dept: userId + chatUserId }] } );
                response.messages = messages
                return resolve( response )
            } catch ( error ) {
                console.error( "[getUsersList] Error : ", error )
                return reject( error );
            }
        } )
    }

}

module.exports = new UserController();