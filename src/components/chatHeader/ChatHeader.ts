import AuthController from "../../controllers/AuthController";
import Block from "../../framework/Block";
import Button from "../button/Button";

export default class ChatHeader extends Block {

    constructor(){
        super('div', {
            attr:{
                class:'chat-header'
            },
            buttons: [
                new Button({
                    attr: {
                        class: 'chat-header__controls-button chat-header_controls_pin'
                    },
                    img:{
                        alt:"Закрепленные сообщения",
                        src:"/pin.svg",
                    }
                }),
                new Button({
                    attr: {
                        class: 'chat-header__controls-button chat-header_controls_add_user'
                    },
                    img:{
                        alt:"Добавить участника",
                        src:"/user-plus.svg",
                    }
                }),
                new Button({
                    attr: {
                        class: 'chat-header__controls-button chat-header_controls_notifications'
                    },
                    img:{
                        alt:"Оповещения",
                        src:"/bell.svg",
                    }
                }),
                new Button({
                    attr: {
                        class: 'chat-header__controls-button chat-header_controls_leave'
                    },
                    img:{
                        alt:"Выход",
                        src:"/export-arrow-right.svg",
                    },
                    
                    onClick: (e:Event) => {
                        e.preventDefault();
                        new AuthController().logout();
                    }
                })
            ]
        });
    }
    override render(){
        return `
            <div class="chat-header__title">
                <div class="chat-listitem__image">
                    <img src="/exmplAva.jpg" alt="">
                    <img src="/exmplAva2.jpg" alt="">
                </div>
                <div class="chat-listitem__name">
                    <span>user2</span>&nbsp;
                    <span>user1</span>&nbsp;
                </div>
            </div>
            <div class="chat-header__controls">
                {{#each buttons}}
                    {{{this}}}
                {{/each}}
            </div>
        `;
    }
    
}
