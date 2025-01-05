import Block, { Props } from "../../framework/Block";

export default class ChatHeader extends Block {

    constructor(){
        super('div', {
            attr:{
                class:'chat-header'
            }
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
                <button class="chat-header__controls-button chat-header_controls_pin">
                    <img src="/pin.svg" alt="">
                </button>
                <button class="chat-header__controls-button chat-header_controls_add_user">
                    <img src="/user-plus.svg" alt="">
                </button>
                <button class="chat-header__controls-button chat-header_controls_notifications">
                    <img src="/bell.svg" alt="">
                </button>
                <button class="chat-header__controls-button chat-header_controls_leave">
                    <img src="/export-arrow-right.svg" alt="">
                </button>
            </div>
        `;
    }
    
}
