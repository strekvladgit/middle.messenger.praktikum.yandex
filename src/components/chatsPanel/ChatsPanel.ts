import Block, { Props } from "../../framework/Block";
import Store from "../../framework/Store";
import connect from "../../utils/connect";
import { createList } from "../../utils/createListFromProps";
import ChatItem from "../chatItem/ChatItem";


class ChatsPanel extends Block{
    constructor(props: Props) {
        super('div', {...props});
        
    }

    protected componentDidMount(): void {
        const {chats} = Store.getState()
        console.log('mounted ChatsPanel', chats)
        this.children.chatList.setProps({
            chats: createList(chats as Props, ChatItem)
        })
    }

    protected componentDidUpdate(): void {
        console.log('updated ChatsPanel', this.props.chats)
        this.children.chatList.setProps({
            chats: createList(this.props.chats, ChatItem)
        })
    }

    override render(){
        return `
            {{{chatList}}}
            {{{btnCreateChat}}}
            `
    }
}

function mapChatsToProps(state: Props) {
    return {
        chats: state.chats,
    };
}

export default connect(ChatsPanel, mapChatsToProps);
