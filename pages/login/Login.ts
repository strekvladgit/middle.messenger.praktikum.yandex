import Block, { Props } from "../../src/framework/Block";
import Form from "../../src/components/form/Form";
import formField from "../../src/components/formField/formFiled";
import Link from "../../src/components/link/Link";
import Button from "../../src/components/button/Button";
import Router from "../../src/framework/Router";
import submitForm from "../../src/utils/submitForm";
import AuthController from "../../src/controllers/AuthController";
import { DataType } from "../../src/utils/HTTPTransport";
import connect from "../../src/utils/connect";
import Input from "../../src/components/input/Input";


class Login extends Block{
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
                        errorMessage:'Логин должен содержать от 3 до 20 символов, может включать буквы и цифры, но не состоять только из цифр. Без пробелов и спецсимволов.',
                        input: new Input({
                            pattern: '^(?=.{3,20}$)(?![0-9]*$)[a-zA-Z0-9-_]+$',
                            attr:{
                                name:'login',  
                                type:'text', 
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
                    })
                ],
                button: new Button({
                    text:'Войти', 
                    attr:{class: 'form-button'},
                    
                }),
                link: new Link({
                    text:'Зарегистрироваться', 
                    attr:{class: 'form-link', href:'#'},
                    events: {
                        click: (e: Event)=>{
                            e.preventDefault();
                            new Router('#app').go('/sign-up');
                        }
                    }
                }),
                events: {
                    submit: (e: Event)=>{submitForm(e, (data: DataType) => {AuthController.login(data)})}
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
                {{{loginForm}}}
            {{/if}}
        `
    }
}

function mapStateToProps(state: Props){
    return {
        user: state.user
    };
}

export default connect(Login, mapStateToProps)


