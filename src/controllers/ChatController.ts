import ChatAPI from "../api/ChatAPI";
import Store from "../framework/Store";
import { DataType } from "../utils/HTTPTransport";

class ChatController{

    public async createChat(data : DataType){
        return ChatAPI.createChat(data)
            .then((data)=>{
                this.getChats({
                    limit:'10',
                })
                return data;
            })
    }

    public async deleteChat(data : DataType){
        return ChatAPI.deleteChat(data)
            .then(()=>{this.getChats({
                limit:'10',
            })})
    }

    public async getChats(data : DataType){
        return ChatAPI.getChats(data)
            .then(data=>{Store.set('chats', data); return data})
            .catch((error)=>{console.log(error)});
    }

    public async setChatAvatar(data: FormData){
        ChatAPI.setChatAvatar(data)
            .then((data)=>{
                Store.set('currentChat', data);
            })
            .then(()=>{this.getChats({
                limit:'10',
            })})
    }

    public async addUser(data: DataType){
        ChatAPI.addUser(data)
            .then(()=>{this.getChatUsers(data.chatId as number)})
    }

    public async deleteUser(data: DataType){
        ChatAPI.deleteUser(data)
            .then(()=>{this.getChatUsers(data.chatId as number)})
    }

    public async getChatUsers(chatID : number){
        ChatAPI.getChatUsers(chatID)
            .then((data)=>{
                Store.set('chatUsers', data)
            })
    }

}

export default new ChatController();
