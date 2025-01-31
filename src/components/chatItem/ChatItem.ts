import Block, { Props } from "../../framework/Block";

export default class ChatItem extends Block {

    constructor(props: Props){
        super('div', {...props, attr:{class:'chat-listitem'}});
    }
    override render(){
        
        return `
            <div class="chat-listitem__image">
                {{#each users}}
                    <img src="{{this.avatar}}" alt="{{this.name}}-avatar">
                {{/each}}
            </div>
            <div class="chat-listitem__name">
                {{#if name}}
                    <span>{{name}}</span>
                {{else}}
                    {{#each users}}
                        <span>{{{this.name}}}</span>&nbsp;
                    {{/each}}
                {{/if}}
            </div>
            <button class="chat-listitem__button_delete">
                <img src="/x-close-delete.svg" alt="">
            </button>
        `;
    }
    
}
