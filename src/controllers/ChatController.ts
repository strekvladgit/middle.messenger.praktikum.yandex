import ChatAPI from "../api/ChatAPI";
import Socket from "../framework/Socket";
import Store from "../framework/Store";
import { DataType } from "../utils/HTTPTransport";

class ChatController{

    private socket: Socket | null = null;

    public async createChat(data : DataType){
        return ChatAPI.createChat(data)
            .then((data)=>{
                this.getChats({
                    limit:'10',
                })
                return data;
            })
            .catch((error)=>{
                alert(error);
            });
    }

    public async deleteChat(data : DataType){
        return ChatAPI.deleteChat(data)
            .then(()=>{this.getChats({
                limit:'10',
            })})
            .catch((error)=>{
                alert(error);
            });
    }

    public async getChats(data : DataType){
        return ChatAPI.getChats(data)
            .then(data=>{Store.set('chats', data); return data})
            .catch((error)=>{
                alert(error);
            });
    }

    public async setChatAvatar(data: FormData){
        ChatAPI.setChatAvatar(data)
            .then((data)=>{
                Store.set('currentChat', data);
            })
            .then(()=>{this.getChats({
                limit:'10',
            })})
            .catch((error)=>{
                alert(error);
            });
    }

    public async addUser(data: DataType){
        ChatAPI.addUser(data)
            .then(()=>{this.getChatUsers(data.chatId as number)})
            .catch((error)=>{
                alert(error);
            });
    }

    public async deleteUser(data: DataType){
        ChatAPI.deleteUser(data)
            .then(()=>{this.getChatUsers(data.chatId as number)})
            .catch((error)=>{
                alert(error);
            });
    }

    public async getChatUsers(chatID : number){
        ChatAPI.getChatUsers(chatID)
            .then((data)=>{
                Store.set('chatUsers', data)
            })
            .catch((error)=>{
                alert(error);
            });
    }

    public async initChat(chatID : number){
        ChatAPI.getToken(chatID)
            .then((data)=>{
                if(this.socket){
                    Store.set('messages', '')
                    this.socket.close(1000, 'чат закрыт');
                }
                
                const userID = (Store.getState().user as DataType).id;
                this.socket = new Socket({userID: +userID, chatID, token: (data as DataType).token as string}) 
            })
            .catch((error)=>{
                alert(error);
            });
    }

    public sendMessage(message : string){
        this.socket?.sendMessage('message', message);
    }

}

export default new ChatController();
