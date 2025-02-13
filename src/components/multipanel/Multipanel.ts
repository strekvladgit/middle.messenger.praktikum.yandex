import Block, { Props } from "../../framework/Block";
import Store from "../../framework/Store";
import connect from "../../utils/connect";
import { createList } from "../../utils/createListFromProps";
import Member from "../member/Member";


class Multipanel extends Block{
    
    constructor(props: Props){

        super('div', {
            ...props,
            
        });
    }

    protected componentDidMount(): void {
        const {userFound} = Store.getState()
        console.log('mounted Multipanel', userFound)
        this.children.searchResult.setProps({
            users: createList(userFound as Props, Member)
        })
    }

    protected componentDidUpdate(): void {
        console.log('updated Multipanel', this.props.chats)
        this.children.searchResult.setProps({
            users: createList(this.props.userFound, Member)
        })
        this.children.userList.setProps({
            users: createList(this.props.chatUsers, Member)
        })
    }

    override render(){
        return `
        {{#if userFound}}
            <div class="multipanel-title">Результаты поиска</div>
            {{{searchResult}}}  
        {{/if}}
        {{#if chatUsers}}
            <div class="multipanel-title">Пользователей в чате</div>
            {{{userList}}}
        {{/if}}
        `
    }
}

function mapChatsUsersToProps(state: Props){
    return {
        chatUsers: state.chatUsers,
        userFound: state.userFound
    }
}


export default connect(Multipanel, mapChatsUsersToProps);
