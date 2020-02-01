import SocketStore from "./socket.store";
import UserStore from "./users.store"
class CombinesStore {
    constructor () {
        this.socket = new SocketStore( this );
        this.users = new UserStore( this );
    }
}

export default CombinesStore