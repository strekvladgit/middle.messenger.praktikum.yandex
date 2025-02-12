import Block, { Props } from "../../src/framework/Block";
import ChatHeader from "../../src/components/chatHeader/ChatHeader";
import SearchPanel from "../../src/components/searchPanel/searchPanel";
import ChatMessage from "../../src/components/chatMessage/ChatMessage";
import ProfilePanel from "../../src/components/profilePanel/ProfilePanel";
import InputPanel from "../../src/components/inputPanel/InputPanel";
import Button from "../../src/components/button/Button";
import Modal from "../../src/components/modal/Modal";
import Form from "../../src/components/form/Form";
import formFiled from "../../src/components/formField/formFiled";
import Input from "../../src/components/input/Input";
import ChatList from "../../src/components/chatList/ChatList";
import submitForm from "../../src/utils/submitForm";
import { DataType } from "../../src/utils/HTTPTransport";
import ChatController from "../../src/controllers/ChatController";
import ChatsPanel from "../../src/components/chatsPanel/ChatsPanel";

import "./chat.css"
import Store from "../../src/framework/Store";
import ChatsAvatarField from "../../src/components/chatsAvatarField/ChatsAvatarField";
import Multipanel from "../../src/components/multipanel/Multipanel";
import UserList from "../../src/components/userList/UserList";
import ChatContent from "../../src/components/chatContent/ChatContent";



export default class Chat extends Block{
    
    constructor(){

        

        super('div', {
            attr:{id:'chat'},
            modalClass:'modal',
            chatHeader: new ChatHeader({
                onModalChatsAvatarShow: ()=>{this.onModalChatsAvatarShow()},
            }),
            searchPanel: new SearchPanel(),
            chatPanel: new ChatsPanel({
                chatList: new ChatList({
                    attr: {class: 'chat-list'},
                    chats: [],

                }),                
                btnCreateChat: new Button({
                    text: 'создать чат',
                    attr: {class: 'chat-list-button'},
                    onClick : () => {this.onModalCreateChatShow()}
                }),
            }),
            messages: [
                new ChatMessage({user:'user1', avatar:'/exmplAva2.jpg', content: 'Hello', }),
                new ChatMessage({user:'user2', avatar:'/exmplAva.jpg', content: '', imgs: ['/default.jpg'] }),
                new ChatMessage({user:'MyUserName', avatar:'/default.jpg', content: 'sup', status:'my'}),
            ],
            inputPanel: new InputPanel(),
            profilePanel: new ProfilePanel({}),

            chatContent: new ChatContent({}),
            
            modalCreateChat: new Modal({
                attr: {class: 'modal hidden'},
                form: new Form({
                    title: 'Создать чат',
                    attr:{
                        class:'form',
                        method: 'POST'
                    },
                    formFields: [new formFiled({
                        attr: {class: 'form-input-wrap'}, 
                        text:'Название чата',
                        input: new Input({
                            pattern: '',
                            attr: {
                                name:'title',  
                                type:'text', 
                                class: 'form-input ',
                            }
                        })
                    })],
                    button: new Button({
                        text: 'Создать',
                        attr:{class:'form-button '},
                    }),
                    events: {
                        submit: (e: Event)=>{
                            submitForm(e, (data: DataType) => {
                                ChatController.createChat(data)
                                    .then(()=>{this.onModalCreateChatHide()})
                            })
                        }
                    }
                }),
                onClick: ()=>{this.onModalCreateChatHide()},
                
            }),
            modalChatsAvatar: new Modal({
                attr: {class: 'modal hidden'},
                form: new Form({
                    title: 'Изменить аватар чата',
                    attr:{
                        class:'form',
                        method: 'POST'
                    },
                    formFields: [new ChatsAvatarField({
                            name:'avatar',  
                            attr: {class: 'form-input-wrap'},
                            imgsrc: '/defaultChat.jpg',
                            type:'file', 
                            class: 'form-hidden',
                            input: new Input({
                                    attr: {
                                        name: 'avatar',
                                        type:'file', 
                                        class: 'form-hidden',
                                        accept: "image/png, image/jpeg"
                                    },
                                    events: {
                                        change: (e: Event) => {
                                            const target = e.target as HTMLInputElement;
                                            const file = target.files ? target.files[0] : null;
                                            if(file){
                                                const formData = new FormData();
                                                const chatId = (Store.getState() as Props).currentChat?.id
                                                formData.append('avatar', file);
                                                formData.append('chatId', chatId)
                                                ChatController.setChatAvatar(formData)
                                            }
                                        }
                                    }
                                })     
                        })],
                    button: new Button({
                        text: 'Закрыть',
                        attr:{class:'form-button '},
                        onClick: (e: Event)=>{e.preventDefault(); this.onModalChatsAvatarHide()},
                    }),
                    
                }),
                onClick: ()=>{this.onModalChatsAvatarHide()},
                
            }),
            multipanel: new Multipanel({
                attr:{
                    class: 'multipanel'
                },
                userList: new UserList(),
                searchResult: new UserList(),
            })
            
        });
    }

    private onModalCreateChatShow(){
        this.children.modalCreateChat.setProps({
            attr: { class: 'modal'}
        })
    }

    private onModalCreateChatHide(){
        this.children.modalCreateChat.setProps({
            attr: { class: 'modal hidden' }
        })
    }

    private onModalChatsAvatarShow(){
        this.children.modalChatsAvatar.setProps({
            attr: { class: 'modal'}
        })
    }

    private onModalChatsAvatarHide(){
        this.children.modalChatsAvatar.setProps({
            attr: { class: 'modal hidden' }
        })
    }

    override render(){
        return `
        <div class="logo">#BEZDISCORD</div>

        {{{chatHeader}}}
        {{{searchPanel}}}

        {{{chatPanel}}}
        


        {{{chatContent}}}


        {{{multipanel}}}


        {{{profilePanel}}}


        {{{inputPanel}}}
        {{{modalCreateChat}}}
        {{{modalChatsAvatar}}}
        {{{modalSearchAndAddUser}}}
        `
    }
}
