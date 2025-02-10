import Block, { Props } from "../../framework/Block";
import Store from "../../framework/Store";
import connect from "../../utils/connect";
import ChatItem from "../chatItem/ChatItem";

function createChatItems(chatsProps: Props){
    if(Array.isArray(chatsProps)){
        return chatsProps.map((props: Props)=>{
            return new ChatItem(props)
        })
    }
    return [];
}

class ChatsPanel extends Block{
    constructor(props: Props) {
        super('div', {...props});
        
    }

    protected componentDidMount(): void {
        const {chats} = Store.getState()
        console.log('mounted ChatsPanel', chats)
        this.children.chatList.setProps({
            chats: createChatItems(chats as Props)
        })
    }

    protected componentDidUpdate(): void {
        console.log('updated ChatsPanel', this.props.chats)
        this.children.chatList.setProps({
            chats: createChatItems(this.props.chats)
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
