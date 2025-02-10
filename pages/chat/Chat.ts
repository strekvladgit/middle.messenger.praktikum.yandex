import Block from "../../src/framework/Block";
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



export default class Chat extends Block{
    
    constructor(){

        

        super('div', {
            attr:{id:'chat'},
            modalClass:'modal',
            chatHeader: new ChatHeader(),
            searchPanel: new SearchPanel(),
            chatPanel: new ChatsPanel({
                chatList: new ChatList({
                    attr: {class: 'chat-list'},
                    chats: [],

                }),                
                btnCreateChat: new Button({
                    text: 'создать чат',
                    attr: {class: 'chat-list-button'},
                    onClick : () => {this.onShowModal()}
                }),
            }),
            messages: [
                new ChatMessage({user:'user1', avatar:'/exmplAva2.jpg', content: 'Hello', }),
                new ChatMessage({user:'user2', avatar:'/exmplAva.jpg', content: '', imgs: ['/default.jpg'] }),
                new ChatMessage({user:'MyUserName', avatar:'/default.jpg', content: 'sup', status:'my'}),
            ],
            inputPanel: new InputPanel(),
            profilePanel: new ProfilePanel({}),
            
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
                                    .then(()=>{this.onHideModal()})
                            })
                        }
                    }
                }),
                onClick: ()=>{this.onHideModal()},
                
            })
        });
    }

    private onShowModal(){
        this.children.modalCreateChat.setProps({
            attr: { class: 'modal'}
        })
    }

    private onHideModal(){
        this.children.modalCreateChat.setProps({
            attr: { class: 'modal hidden' }
        })
    }

    override render(){
        return `
        <div class="logo">#BEZDISCORD</div>

        {{{chatHeader}}}
        {{{searchPanel}}}

        {{{chatPanel}}}
        


        <div class="chat-content">
            {{#each messages}}
                {{{this}}}
            {{/each}}
        </div>


        <div class="multipanel">
            <div class="multipanel-search-title">Ищем "lorem ipsum"</div>
                <div class="multipanel-search-result">
                    <div class="message ">
                    <div class="message-avatar">
                        <img src="/exmplAva2.jpg" alt="">
                    </div>
                    <div class="message-content">
                        <div class="message-content__user-name">user1</div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <span class="message-content__time">11:00</span>
                    </div>
                </div>
            </div>
        </div>


        {{{profilePanel}}}


        {{{inputPanel}}}
        {{{modalCreateChat}}}
        `
    }
}
