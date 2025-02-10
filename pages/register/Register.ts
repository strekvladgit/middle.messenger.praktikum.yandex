import Block, { Props } from "../../src/framework/Block";
import Form from "../../src/components/form/Form";
import formField from "../../src/components/formField/formFiled";
import Link from "../../src/components/link/Link";
import Button from "../../src/components/button/Button";
import Router from "../../src/framework/Router";
import AuthController from "../../src/controllers/AuthController";
import submitForm from "../../src/utils/submitForm";
import { DataType } from "../../src/utils/HTTPTransport";
import connect from "../../src/utils/connect";
import Input from "../../src/components/input/Input";




class Register extends Block{
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
                        errorMessage:'Email должен быть корректным и содержать "собаку" (@) и точку после неё.',
                        input: new Input({
                            pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$',
                            attr:{
                                name:'email',  
                                type:'email', 
                                class: 'form-input',
                            }
                        })
                    }),
                    new formField({
                        attr: {class: 'form-input-wrap'}, 
                        text:'Логин', 
                        errorMessage:'Логин должен содержать от 3 до 20 символов, может включать буквы и цифры, но не состоять только из цифр. Без пробелов и спецсимволов.',
                        input: new Input({
                            pattern: '^(?=.{3,20}$)(?![0-9]*$)[a-zA-Z0-9-_]+$',
                            attr: {
                                name:'login',  
                                type:'text', 
                                class: 'form-input',
                            }
                        })
                    }),
                    new formField({
                        attr: {class: 'form-input-wrap'}, 
                        text:'Имя', 
                        errorMessage:'Имя должно начинаться с заглавной буквы, содержать только буквы, без пробелов и цифр, допускается дефис.',
                        input: new Input({
                            pattern: '^[A-ZА-ЯЁ][a-zа-яёA-ZА-ЯЁ0-9-]*$',
                            attr:{
                                name:'first_name', 
                                type:'text', 
                                class: 'form-input',
                            }
                        })
                    }),
                    new formField({
                        attr: {class: 'form-input-wrap'}, 
                        text:'Фамилия', 
                        errorMessage:'Имя должно начинаться с заглавной буквы, содержать только буквы, без пробелов и цифр, допускается дефис.',
                        input: new Input({
                            pattern: '^[A-ZА-ЯЁ][a-zа-яёA-ZА-ЯЁ0-9-]*$',
                            attr: {
                                name:'second_name', 
                                type:'text', 
                                class: 'form-input',
                            }
                        })
                    }),
                    new formField({
                        attr: {class: 'form-input-wrap'}, 
                        text:'Телефон', 
                        errorMessage:'Телефон должен содержать от 10 до 15 символов и состоять только из цифр, может начинаться с плюса.',
                        input: new Input({
                            pattern: '^+?d{10,15}$',
                            attr: {
                                name:'phone',  
                                type:'tel', 
                                class: 'form-input',
                            }
                        })
                    }),
                    new formField({
                        attr: {class: 'form-input-wrap'}, 
                        text:'Пароль', 
                        errorMessage:'Пароль должен содержать от 8 до 40 символов, обязательно хотя бы одну заглавную букву и цифру.',
                        input: new Input({
                            pattern: '^(?=.*[A-Z])(?=.*d)[A-Za-zd]{8,40}$',
                            attr: {
                                name:'password', 
                                type:'password', 
                                class: 'form-input',
                            }

                        })
                    }),
                    new formField({
                        attr: {class: 'form-input-wrap'}, 
                        text:'Повторите пароль', 
                        errorMessage:'Пароль должен содержать от 8 до 40 символов, обязательно хотя бы одну заглавную букву и цифру.',
                        input: new Input({
                            pattern: '^(?=.*[A-Z])(?=.*d)[A-Za-zd]{8,40}$',
                            attr:{
                                name:'password-2', 
                                type:'password', 
                                class: 'form-input',
                            }
                        })
                    })
                ],
                button: new Button({text:'Зарегистрироваться', attr:{class: 'form-button'}}),
                links: [
                    new Link({
                        text:'Войти', 
                        attr:{class: 'form-link', href:'#'},
                        events: {
                            click: (e: Event) => {
                                e.preventDefault();
                                new Router('#app').go('/login')
                            }
                        }
                    }),
                    new Link({
                        text:'TEST LOGOUT', 
                        attr:{class: 'form-link', href:'#'},
                        events: {
                            click: (e: Event) => {
                                e.preventDefault();
                                
                                AuthController.logout();
                            }
                        }
                    }),
                ],
                
                events: {
                    submit: (e: Event)=>{submitForm(e, (data: DataType) => AuthController.create(data))}
                }
                
                //<a class="form-link {{#each classes}}{{this}} {{/each}}" href="{{this.link}}" data-modal="{{modal}}">{{this.text}}</a>
            }),
            backLink: new Link({
                text: 'Вернуться назад',
                attr: {
                    href: '#'
                },
                events: {
                    click: (e: Event)=>{
                        e.preventDefault();
                        new Router('#app').back()
                    }
                }
            }),
            
        });
    }
    override render(){
        return `
        {{#if user}}
            <p>Вы уже зарегистрированы и вошли в систему</p>
            {{{backLink}}}
        {{else}}
            {{{regForm}}}
        {{/if}}
        
        `
    }
}

function mapStateToProps(state: Props){
    return {
        user: state.user
    };
}

export default connect(Register, mapStateToProps)
