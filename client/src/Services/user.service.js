import APIProvider from "./../APIProvider";

const headers = {
    Accept: "application/json",
    "Content-type": "application/json",
};


class UserService {
    getUserId = () => APIProvider.get("userId", null, headers);
    getUserList = (userId) => APIProvider.get(`users/${userId}`, null, headers);
    getUserInfo = (userId, chatUser) => APIProvider.get(`users/${userId}/${chatUser}`, null, headers);
    getMessages = (userId, chatUserId) => APIProvider.get(`messages/${userId}/${chatUserId}`, null, headers);
}

export default new UserService()