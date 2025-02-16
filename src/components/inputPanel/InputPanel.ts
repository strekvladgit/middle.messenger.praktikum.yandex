import ChatController from "../../controllers/ChatController";
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
            onBlur:(response: boolean)=>{this.onValidation(response)},
        })
        super('form', {
            attr:{class:'input-panel'}, 
            input, 
            errorMessage:'Поле не должно быть пустым',
            isValid:true,
            events: {
                submit: (e: Event) => {
                    e.preventDefault();
                
                    // Приводим target к HTMLFormElement
                    const form = e.target as HTMLFormElement;
                
                    // Используем типизацию для доступа к элементам формы
                    const messageInput = form.elements.namedItem('message') as HTMLInputElement;
                
                    if (messageInput) {
                        const message = messageInput.value;
                        if(!message){
                            this.setProps({
                                isValid: false
                            })
                        } else {
                            this.setProps({
                                isValid: true
                            })
                            ChatController.sendMessage(message);
                            messageInput.value = '';
                        }
                        
                    } else {
                        console.error("Поле 'message' не найдено");
                    }
                }
            }
        });
    }
    override render(){
        return `
            <div class="input-panel__wrap">
                {{{input}}}
                <span class="form-tooltip">{{#if isValid}}{{else}}{{errorMessage}}{{/if}}</span>
                <button class="input-panel__button"><img src="/send-message.svg" alt=""></button>
            </div>
        `;
    }

    private onValidation(response: boolean){
        this.setProps({
            isValid: response
        })
    }
    
}
