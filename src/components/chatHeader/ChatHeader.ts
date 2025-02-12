import AuthController from "../../controllers/AuthController";
import Block, { Props } from "../../framework/Block";
import connect from "../../utils/connect";
import Button from "../button/Button";
import ChatAvatar from "../chatAvatar/ChatAvatar";

class ChatHeader extends Block {

    constructor(props: Props){
        const {onModalChatsAvatarShow} = props;
        super('div', {
            attr:{
                class:'chat-header'
            },
            chatAvatar: new ChatAvatar({
                events: {
                    click : ()=>{
                        if(this.props.title){
                            onModalChatsAvatarShow()
                        }
                    }
                }
            }),
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
                        AuthController.logout();
                    }
                })
            ]
        });
    }

    protected componentDidUpdate(): void {
        this.children.chatAvatar.setProps({
            avatar: this.props.avatar,
        })
    }

    override render(){
        return `
            {{#if title}}
            <div class="chat-header__title">
                {{{chatAvatar}}}
                <div class="chat-listitem__name">
                    {{title}}
                </div>
            </div>
            {{/if}}
            <div class="chat-header__controls">
                {{#each buttons}}
                    {{{this}}}
                {{/each}}
            </div>
            
        `;
    }
    
}

function mapChatinfoToProps(state: Props){
    return {
        avatar: state.currentChat?.avatar,
        title: state.currentChat?.title
    }
}

export default connect(ChatHeader, mapChatinfoToProps);
