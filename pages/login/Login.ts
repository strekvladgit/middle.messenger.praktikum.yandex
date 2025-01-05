import Block from "../../src/framework/Block";
import Form from "../../src/components/form/Form";
import formField from "../../src/components/formField/formFiled";
import Link from "../../src/components/link/Link";
import Button from "../../src/components/button/Button";

export default class Login extends Block{
    constructor(){
        super('div', {
            attr: {class: 'page'},
            loginForm: new Form({
                title: 'Вход',
                attr: {
                    method: 'POST',
                    class: 'form'
                },
                formFields: [
                    new formField({
                        attr: {class: 'form-input-wrap'}, 
                        text:'Логин', 
                        name:'login',  
                        type:'text', 
                        class: 'form-input',
                        errorMessage:'Логин должен содержать от 3 до 20 символов, может включать буквы и цифры, но не состоять только из цифр. Без пробелов и спецсимволов.',
                        pattern: '^(?=.{3,20}$)(?![0-9]*$)[a-zA-Z0-9-_]+$',
                    }),
                    new formField({
                        attr: {class: 'form-input-wrap'}, 
                        text:'Пароль', 
                        name:'password', 
                        type:'password', 
                        class: 'form-input',
                        errorMessage:'Пароль должен содержать от 8 до 40 символов, обязательно хотя бы одну заглавную букву и цифру.',
                        pattern: '^(?=.*[A-Z])(?=.*d)[A-Za-zd]{8,40}$',
                    })
                ],
                button: new Button({text:'Войти', attr:{class: 'form-button'}}),
                link: new Link({text:'Зарегистрироваться', attr:{class: 'form-link', href:'#'}})
                //<a class="form-link {{#each classes}}{{this}} {{/each}}" href="{{this.link}}" data-modal="{{modal}}">{{this.text}}</a>
            })
            
        });
    }
    override render(){
        return `{{{loginForm}}}`
    }
}



