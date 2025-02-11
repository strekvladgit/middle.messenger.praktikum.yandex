import Block, { Props } from "../../framework/Block";

export default class ChatAvatar extends Block{
    constructor(props: Props){
        super('div', {...props,
            attr: {
                class: 'chat-listitem__image'
            }
        })

    }

    override render(){
        return `
            {{#if avatar}}
                <img src="https://ya-praktikum.tech/api/v2/resources/{{avatar}}" alt="{{title}}-avatar">
            {{else}}

                <img src="/defaultChat.jpg" alt="{{title}}-avatar">
            {{/if}}
            
        `
    }
}
