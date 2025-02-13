import Block from "../../framework/Block";

class UserList extends Block{
    constructor(){
        super('div', {
            attr: {
                class: 'multipanel-search-result'
            },
            users: [
            ]
            
        })
    }
    override render() {
        return `
            <div class="multipanel-memberslist">
                {{#each users}}
                    {{{this}}}
                {{/each}}
            </div>
            
        `
    }
}


export default UserList;
