import Block, { Props } from "../../framework/Block";
import Store from "../../framework/Store";

function getUserAvatar(id: number){
    const users = Store.getState().chatUsers as Props[];
    if(users){
        const currentUser = users.find((item : Props)=>{
            return item.id===id
        })
        return currentUser
    }
    return 
}

export default class ChatMessage extends Block {

    constructor(props: Props){
        const {user_id} = props;
        const user = getUserAvatar(user_id)
        super('div', {...props, 
            avatar: user?.avatar,
            displayName: user?.display_name,
            firstName: user?.first_name,
            secondName: user?.second_name
        });
    }
    override render(){
        return `
            <div class="message {{#if status}}my-message{{/if}}">
                
                <div class="message-avatar">
                {{#if avatar}}
                    <img src="https://ya-praktikum.tech/api/v2/resources{{avatar}}" alt="{{displayName}}-avatar">
                {{else}}
                    <img src="/default.jpg" alt="{{displayName}}-avatar">
                {{/if}}
                </div>
                
                <div class="message-content">
                    <div class="message-content__user-name">
                    {{#if displayName}}
                        {{displayName}}
                    {{else}}
                        {{firstName}} {{secondName}}
                    {{/if}}
                    
                    </div>
                    <p>{{content}}</p>
                </div>
            </div>
        `;
    }
    
}
