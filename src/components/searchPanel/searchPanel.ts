import Block, { Props } from "../../framework/Block";
import Input from "../input/Input";

export default class SearchPanel extends Block {

    constructor(){
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
            })
        });
    }
    override render(){
        return `
            {{{input}}}
        `;
    }
    
}
