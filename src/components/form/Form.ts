import Block, { Props } from "../../framework/Block";
import './form.css'

interface FormValues {
    [key: string]: string | File | null;
}

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
                        const jsonForm: FormValues = {};
                        formData.forEach((value: FormDataEntryValue, key:string)=>{
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
