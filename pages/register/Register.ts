import Block from "../../src/framework/Block";
import Form from "../../src/components/form/Form";
import formField from "../../src/components/formField/formFiled";
import Link from "../../src/components/link/Link";
import Button from "../../src/components/button/Button";

export default class Register extends Block{
    constructor(){
        super('div', {
            attr: {class: 'page'},
            regForm: new Form({
                title: 'Регистрация',
                attr: {
                    method: 'POST',
                    class: 'form'
                },
                formFields: [
                    new formField({
                        attr: {class: 'form-input-wrap'},
                        text:'Почта',
                        name:'email',  
                        type:'email', 
                        class: 'form-input',
                        errorMessage:'Email должен быть корректным и содержать "собаку" (@) и точку после неё.',
                        pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$',
                    }),
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
                        text:'Имя', 
                        name:'first_name', 
                        type:'text', 
                        class: 'form-input',
                        errorMessage:'Имя должно начинаться с заглавной буквы, содержать только буквы, без пробелов и цифр, допускается дефис.',
                        pattern: '^[A-ZА-ЯЁ][a-zа-яёA-ZА-ЯЁ0-9-]*$',
                    }),
                    new formField({
                        attr: {class: 'form-input-wrap'}, 
                        text:'Фамилия', 
                        name:'second_name', 
                        type:'text', 
                        class: 'form-input',
                        errorMessage:'Имя должно начинаться с заглавной буквы, содержать только буквы, без пробелов и цифр, допускается дефис.',
                        pattern: '^[A-ZА-ЯЁ][a-zа-яёA-ZА-ЯЁ0-9-]*$',
                    }),
                    new formField({
                        attr: {class: 'form-input-wrap'}, 
                        text:'Телефон', 
                        name:'phone',  
                        type:'tel', 
                        class: 'form-input',
                        errorMessage:'Телефон должен содержать от 10 до 15 символов и состоять только из цифр, может начинаться с плюса.',
                        pattern: '^+?d{10,15}$',
                    }),
                    new formField({
                        attr: {class: 'form-input-wrap'}, 
                        text:'Пароль', 
                        name:'password', 
                        type:'password', 
                        class: 'form-input',
                        errorMessage:'Пароль должен содержать от 8 до 40 символов, обязательно хотя бы одну заглавную букву и цифру.',
                        pattern: '^(?=.*[A-Z])(?=.*d)[A-Za-zd]{8,40}$',
                    }),
                    new formField({
                        attr: {class: 'form-input-wrap'}, 
                        text:'Повторите пароль', 
                        name:'password-2', 
                        type:'password', 
                        class: 'form-input',
                        errorMessage:'Пароль должен содержать от 8 до 40 символов, обязательно хотя бы одну заглавную букву и цифру.',
                        pattern: '^(?=.*[A-Z])(?=.*d)[A-Za-zd]{8,40}$',
                    })
                ],
                button: new Button({text:'Зарегистрироваться', attr:{class: 'form-button'}}),
                link: new Link({text:'Войти', attr:{class: 'form-link', href:'#'}})
                //<a class="form-link {{#each classes}}{{this}} {{/each}}" href="{{this.link}}" data-modal="{{modal}}">{{this.text}}</a>
            })
            
        });
    }
    override render(){
        return `{{{regForm}}}`
    }
}



