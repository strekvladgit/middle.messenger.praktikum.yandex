import Block, { Props } from "../../src/framework/Block";
import ChatHeader from "../../src/components/chatHeader/ChatHeader";
import SearchPanel from "../../src/components/searchPanel/searchPanel";
import ChatItem from "../../src/components/chatItem/ChatItem";
import ChatMessage from "../../src/components/chatMessage/ChatMessage";
import ProfilePanel from "../../src/components/profilePanel/ProfilePanel";
import InputPanel from "../../src/components/inputPanel/InputPanel";

export default class Chat extends Block{
    
    constructor(props: Props){
        const {username} = props;

        super('div', {...props,
            attr:{id:'chat'},
            chatHeader: new ChatHeader(),
            searchPanel: new SearchPanel(),
            chatlist: [
                new ChatItem({name: '', users: [{name:'user1', avatar:'/exmplAva.jpg'}], selected:''}),
                new ChatItem({name: '', 
                    users: [
                        {name:'user2', avatar:'/exmplAva.jpg',},
                        {name:'user1', avatar:'/exmplAva2.jpg',}
                    ], 
                    selected:''
                }),
          
                new ChatItem({name: 'Some Chat Name', 
                    users: [
                        {name:'user1', avatar:'/exmplAva2.jpg',},
                        {name:'user2', avatar:'/exmplAva.jpg',}
                    ], 
                    selected:'true'
                }),
            ],
            messages: [
                new ChatMessage({user:'user1', avatar:'/exmplAva2.jpg', content: 'Hello', }),
                new ChatMessage({user:'user2', avatar:'/exmplAva.jpg', content: '', imgs: ['/content1.jpg'] }),
                new ChatMessage({user:'MyUserName', avatar:'/default.jpg', content: 'sup', status:'my'}),
            ],
            inputPanel: new InputPanel(),
            profilePanel: new ProfilePanel({username}),
        });
    }
    override render(){
        return `
        <div class="logo">#BEZDISCORD</div>

        {{{chatHeader}}}
        {{{searchPanel}}}


        <div class="chat-list">
            {{#each chatlist}}
                {{{this}}}
            {{/each}}
        </div>


        <div class="chat-content">
            {{#each messages}}
                {{{this}}}
            {{/each}}
        </div>


        <div class="multipanel">
            <div class="multipanel-search-title">Ищем "lorem ipsum"</div>
                <div class="multipanel-search-result">
                    <div class="message ">
                    <div class="message-avatar">
                        <img src="/exmplAva2.jpg" alt="">
                    </div>
                    <div class="message-content">
                        <div class="message-content__user-name">user1</div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <span class="message-content__time">11:00</span>
                    </div>
                </div>
            </div>
        </div>


        {{{profilePanel}}}


        {{{inputPanel}}}
        `
    }
}



