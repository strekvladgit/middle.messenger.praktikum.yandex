import Block from "../../framework/Block";
import Input from "../input/Input";

export default class InputPanel extends Block {

    constructor(){
        const input = new Input({
            attr:{
                class: 'input-panel__input',
                name: 'message',
                type: 'text',
                placeholder: '@...',
            },
            onBlur:(response: boolean)=>{this.onValidation(response)}
        })
        super('div', {attr:{class:'input-panel'}, input, errorMessage:'Поле не должно быть пустым',isValid:true});
    }
    override render(){
        return `
            <div class="input-panel__wrap">
                {{{input}}}
                <span class="form-tooltip">{{#if isValid}}{{else}}{{errorMessage}}{{/if}}</span>
                <button class="input-panel__button input-panel__button_addfile"><img src="/paperclip.svg" alt=""></button>
            </div>
        `;
    }

    private onValidation(response: boolean){
        this.setProps({
            isValid: response
        })
    }
    
}
