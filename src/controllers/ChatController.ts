import ChatAPI from "../api/ChatAPI";
import Store from "../framework/Store";
import { DataType } from "../utils/HTTPTransport";

class ChatController{

    public async createChat(data : DataType){
        return ChatAPI.createChat(data)
            .then(()=>{
                return this.getChats({
                    limit:'5',
                })
            })
    }

    public async deleteChat(data : DataType){
        return ChatAPI.deleteChat(data)
            .then(()=>{this.getChats({
                limit:'5',
            })})
    }

    public async getChats(data : DataType){
        return ChatAPI.getChats(data)
            .then(data=>{Store.set('chats', data); return data})
            .catch((error)=>{console.log(error)});
    }

}

export default new ChatController();
