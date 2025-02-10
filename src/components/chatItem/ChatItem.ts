import ChatController from "../../controllers/ChatController";
import Block, { Props } from "../../framework/Block";
import Store from "../../framework/Store";
import Button from "../button/Button";
import ChatAvatar from "../chatAvatar/ChatAvatar";

export default class ChatItem extends Block {

    constructor(props: Props){
        const chatId = props.id;
        super('div', {...props, 
            attr:{class:'chat-listitem'},
            btnDeleteChat: new Button({
                attr: {
                    class: 'chat-listitem__button_delete'
                },
                img:{
                    alt:"Удалить чат",
                    src:"/x-close-delete.svg",
                },
                onClick: () => {ChatController.deleteChat({chatId})}
            }),
            chatAvatar: new ChatAvatar({avatar: props.avatar, title: props.title}),
            events: {
                click: (e: Event)=>{
                    const target = e.target as HTMLElement;
                    if(target&&!target.classList.contains('chat-listitem__button_delete')){
                        Store.set('currentChat', {...props})
                        console.log(Store.getState())
                    }
                }
            }
        });
    }

    override render(){
        return `
            {{{chatAvatar}}}
            <div class="chat-listitem__name">
                {{#if title}}
                    <span>{{title}}</span>
                {{else}}
                    {{#each users}}
                        <span>{{{this.name}}}</span>&nbsp;
                    {{/each}}
                {{/if}}
            </div>
            {{{btnDeleteChat}}}
        `;
    }
    
}
