import Block, { Props } from "../../framework/Block";
import './form.css'

export default class Form extends Block {
    
    constructor(props:Props){
        
        super('form', props);
    }
    
    override render(){
        return `
        <h1 class='form-title'>{{title}}</h1>
        {{#each formFields}}
            {{{this}}}
        {{/each}}
        {{{button}}}
        {{#each buttons}}
            {{{this}}}
        {{/each}}
        {{{link}}}
        {{#each links}}
            {{{this}}}
        {{/each}} `
    }
}
