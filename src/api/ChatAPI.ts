import { Props } from "../framework/Block";
import HTTPTransport, { DataType, Options } from "../utils/HTTPTransport";
import queryString from "../utils/queryString";

const baseAPI = new HTTPTransport();

class ChatAPI {
    public getChats(data : Props) {
        return baseAPI.get(`chats?${queryString(data)}`, {})
    }

    public createChat(data : DataType) {
        return baseAPI.post(`chats`, {data} as Options)
    }

    public deleteChat(data : DataType) {
        return baseAPI.delete(`chats`, {data} as Options)
    }

    public getNewMessagesCount(chatID : number){
        return baseAPI.post(`chats/new/${chatID}`, {})
    }

    public addUser(data : DataType){
        return baseAPI.put('chats/users', {data} as Options)
    }

    public deleteUser(data : DataType){
        return baseAPI.delete('chats/users', {data} as Options)
    }

    public setChatAvatar(data : FormData){
        return baseAPI.put('chats/avatar', {data} as Options)
    }

    public getChatUsers(chatID : number){
        return baseAPI.get(`chats/${chatID}/users`, {})
    }
}

export default new ChatAPI();
