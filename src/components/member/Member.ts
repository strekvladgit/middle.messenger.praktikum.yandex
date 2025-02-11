import ChatController from "../../controllers/ChatController";
import Block, { Props } from "../../framework/Block";
import Store from "../../framework/Store";
import Button from "../button/Button";

export default class Member extends Block{
    constructor(props: Props){
        const chatId = (Store.getState() as Props).currentChat?.id
        console.log(props)
        console.log(chatId)
        super('div', {...props,
            attr: {
                class: 'multipanel-user'
            },
            btnAddUser: new Button({
                img:{
                    alt:"Добавить пользователя в чат",
                    src:"/user-plus.svg",
                },
                onClick: ()=>{
                    ChatController.addUser({
                        users: [
                            props.id
                        ],
                        chatId: chatId
                    })
                    .then(()=>{
                        ChatController.getChatUsers(chatId);
                    })
                }
            }),
            btnDeleteUser: new Button({
                img:{
                    alt:"Удалить пользователя из чата",
                    src:"/user-minus.svg",
                },
                onClick: ()=>{
                    ChatController.deleteUser({
                        users: [
                            props.id
                        ],
                        chatId: chatId
                    })
                }
            }),
            btnMessage: new Button({
                img:{
                    alt:"Отправить сообщение",
                    src:"/messages-text.svg",
                },
                onClick: ()=> {
                    ChatController.createChat({title: `${props.first_name} ${props.second_name}`})
                        .then((data)=>{
                            ChatController.addUser({
                                users: [
                                    props.id
                                ],
                                chatId: (data as Props).id
                            });
                            
                        })
                }
            })
        });
    }

    override render(){
        return `
            <div class="multipanel-user__data">
                <div class="multipanel-user__avatar">
                {{#if avatar}}
                    <img src="https://ya-praktikum.tech/api/v2/resources/{{avatar}}" alt="{{display_name}}-avatar">
                {{else}}
                    <img src="/default.jpg" />

                {{/if}}
                </div>
                <div class="multipanel-user__name">
                    {{#if display_name}}
                        {{display_name}}
                    {{else}}
                        {{first_name}} {{second_name}}
                    {{/if}}
                </div>
            </div>
            <div class="multipanel-user__controls">
                
                {{{btnMessage}}}
                {{{btnAddUser}}}
                {{{btnDeleteUser}}}
            </div>

        `
    }
}
