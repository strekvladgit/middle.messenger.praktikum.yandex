import UserController from "../../controllers/UserController";
import Block from "../../framework/Block";
import Input from "../input/Input";

export default class SearchPanel extends Block {

    constructor(){
        let timeout : number | null = null;
        super('div', {
            attr:{
                class:'chat-search-wrap'
            },
            input: new Input({
                attr:{
                    class:'chat-search-input',
                    name:'search',
                    type:'text',
                    placeholder: 'Поиск'
                }
            }),
            events: {
                input: (e: Event)=>{
                    const target = e.target as HTMLInputElement;
                    if(timeout){
                        clearTimeout(timeout);
                    }
                    timeout = setTimeout(()=>{
                        UserController.searchUser({
                            login: target.value
                        })
                    }, 500);
                }
            }
        });
    }
    override render(){
        return `
            {{{input}}}
        `;
    }
    
}
