import Block, { Props } from "../../framework/Block";
import './form.css'

export default class Form extends Block {

    constructor(props:Props){
        super('form', {
            ...props, 
            events: {
                submit: (e:Event) => {
                    e.preventDefault();
                    const {target} = e;
                    if (target instanceof HTMLFormElement) {
                        const formData = new FormData(target);
                        const jsonForm = {};
                        formData.forEach((value, key)=>{
                            jsonForm[key]=value;

                        })
                        console.log(JSON.stringify(jsonForm));
                    }
                }
            }
        });
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
