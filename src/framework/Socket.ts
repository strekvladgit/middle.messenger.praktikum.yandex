import { Props } from "./Block";
import Store from "./Store";

type WebsocketProps = {
    userID: number,
    chatID: number,
    token: string
}

export type Message = {
    content: unknown;
    type: string;
};

export default class Socket{
    private socket : WebSocket;

    private baseURL : string = 'wss://ya-praktikum.tech/ws/chats/'

    constructor({
        userID, chatID, token
    }: WebsocketProps){
        this.socket = new WebSocket(`${this.baseURL}${userID}/${chatID}/${token}`);

        this.setEvents();

    }

    private setEvents(){
        this.socket.addEventListener('open', ()=>{
            this.ping();
            this.sendMessage('get old', '0')
            console.log('Соединение установлено');

        })

        this.socket.addEventListener('close', (e: CloseEvent)=>{
            if (e.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }
        
            console.log(`Код: ${e.code} | Причина: ${e.reason}`);
        })

        this.socket.addEventListener('message', (e: MessageEvent) => {
            const data = JSON.parse(e.data);
            if (data.type !== 'user connected' && data.type !== 'pong') {
                const messages = (Store.getState() as Props).messages;
                console.log(messages)
                if(!messages){
                    Store.set('messages', data.reverse())
                } else {
                    Store.set('messages', [...messages, data])
                }
                
            }
        });

        this.socket.addEventListener('error', (e: Event) => {
            console.log('Ошибка', e);
        }); 
    }

    private ping(){
        if(this.socket.readyState == 1){
            this.sendMessage('ping', 'ping');
        } else {
            alert('Соединение закрыто')
        }
    }

    public getReadyState(){
        return this.socket.readyState
    }

    public sendMessage(type:unknown, message : string){
        if(this.socket.readyState == 1){
            this.socket.send(JSON.stringify({
                content: message,
                type: type,
            }));
        } else {
            alert('Соединение закрыто')
        }
    }

    public close(code: number, reason: string){
        this.socket.close(code, reason)
    }

}

