import Block, { Props } from "../../framework/Block";

export default class ChatMessage extends Block {

    constructor(props: Props){
        super('div', props);
    }
    override render(){
        return `
            <div class="message {{#if status}}my-message{{/if}}">
                {{#if avatar}}
                <div class="message-avatar">
                    <img src="{{avatar}}" alt="{{user}}-avatar">
                </div>
                {{/if}}
                <div class="message-content">
                    <div class="message-content__user-name">{{user}}</div>
                    <p>{{content}}</p>
                    {{#if imgs}}
                        {{#each imgs}}
                            <img src="{{this}}" alt="some-generated-image-name">
                        {{/each}}
                    {{/if}}
                    <span class="message-content__time">11:00</span>
                </div>
            </div>
        `;
    }
    
}
