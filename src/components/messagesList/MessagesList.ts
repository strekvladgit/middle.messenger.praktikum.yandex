import Block, { Props } from "../../framework/Block";

export default class MessagesList extends Block{
    constructor(props : Props){
        super('div', {...props,
            messages: [],
            attr: {
                class: 'chat-content'
            }
        })
    }

    protected componentDidUpdate(): void {
        console.log('Messages List updated', this.props.messages)
    }

    override render(){
        return ` 
                {{#each messages}}
                    {{{this}}}
                {{/each}}
        `
    }
}
