import Block, { Props } from "../../framework/Block";

export default class ChatList extends Block{
    constructor(props: Props) {
        super('div', {...props});
        
    }

    override render(){
        return `
            {{#each chats}}
                {{{this}}}
            {{/each}}
            `
    }
}
