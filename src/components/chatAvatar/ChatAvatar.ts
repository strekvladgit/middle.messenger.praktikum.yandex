import Block, { Props } from "../../framework/Block";

export default class ChatAvatar extends Block{
    constructor(props: Props){
        console.log(props)
        super('div', {...props,
            attr: {
                class: 'chat-listitem__image'
            }
        })

    }

    override render(){
        return `
            {{#if avatar}}
                <img src="{{avatar}}" alt="{{title}}-avatar">
            {{else}}

                <img src="/defaultChat.jpg" alt="{{title}}-avatar">
                {{#each users}}
                    <img src="{{this.avatar}}" alt="{{this.name}}-avatar">
                {{/each}}
            {{/if}}
            
        `
    }
}
