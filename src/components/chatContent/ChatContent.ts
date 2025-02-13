import Block, { Props } from "../../framework/Block"
import Store from "../../framework/Store"
import connect from "../../utils/connect"
import { createList } from "../../utils/createListFromProps"
import ChatMessage from "../chatMessage/ChatMessage"
import MessagesList from "../messagesList/MessagesList"

class ChatContent extends Block{
    constructor(){
        super('div', {
            attr: {
                class:'chat-area'
            },
            messagesList:new MessagesList({}),
        })
    }

    protected componentDidMount(): void {
        const {messages} = Store.getState()
        console.log('mounted ChatsPanel', messages)
        this.children.messagesList.setProps({
            messages: createList(messages as Props, ChatMessage)
        })
        this.scrollToBottom()
    }

    protected componentDidUpdate(): void {
        
        console.log('updated ChatsPanel', this.props.messages)
        this.children.messagesList.setProps({
            messages: createList(this.props.messages, ChatMessage)
        })
        this.scrollToBottom()
    }

    private scrollToBottom() {
        if(this.element){
            this.element.scrollTop = this.element.scrollHeight;
        }
    }

    override render(){
        return `
            {{{messagesList}}}
            <div class="scroll-to"></div>
        `
    }
}
function mapMessagesToProps(state: Props){
    return {
        messages: state.messages
    }
}
export default connect(ChatContent, mapMessagesToProps)
