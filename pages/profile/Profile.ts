import Block, { Props } from "../../src/framework/Block";
import Form from "../../src/components/form/Form";
import FormField from "../../src/components/formField/formFiled";
import Button from "../../src/components/button/Button";
import Modal from "../../src/components/modal/Modal";
import connect from "../../src/utils/connect";
import Input from "../../src/components/input/Input";
import submitForm from "../../src/utils/submitForm";
import { DataType } from "../../src/utils/HTTPTransport";
import UserController from "../../src/controllers/UserController";
import AvatarField from "../../src/components/avatarField/AvatarField";
import Store from "../../src/framework/Store";
import Router from "../../src/framework/Router";

const inputs = {
    avatar: new Input({
        attr: {
            name: 'avatar',
            type:'file', 
            class: 'form-hidden',
            accept: "image/png, image/jpeg"
        },
        events: {
            change: (e: Event) => {
                const target = e.target as HTMLInputElement;
                const file = target.files ? target.files[0] : null;
                if(file){
                    const formData = new FormData();
                    formData.append('avatar', file);
                    UserController.setAvatar(formData)
                }
            }
        }
    }),
    email: new Input({
        pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$',
        attr: {
            name:'email',  
            type:'email', 
            class: 'form-input form-input_profile ',
            value: 'vasyapupkin@mail.ru'
        },
    }),
    login: new Input({
        pattern: '^(?=.{3,20}$)(?![0-9]*$)[a-zA-Z0-9-_]+$',
        attr: {
            name:'login',  
            type:'text', 
            class: 'form-input form-input_profile ',
            value: 'MyUserName',
        },
    }),
    displayName: new Input({
        pattern: '',
        attr: {
            name:'display_name',  
            type:'text', 
            class: 'form-input form-input_profile ',
            value: 'MyUserName',
        },
    }),
    firstName: new Input({
        pattern: '^[A-ZА-ЯЁ][a-zа-яёA-ZА-ЯЁ0-9-]*$',
        attr: {
            name:'first_name',  
            type:'text', 
            class: 'form-input form-input_profile ',
            value: 'Vasya',
        },
    }),
    secondName: new Input({
        pattern: '^[A-ZА-ЯЁ][a-zа-яёA-ZА-ЯЁ0-9-]*$',
        attr: {
            name:'second_name',  
            type:'text', 
            class: 'form-input form-input_profile ',
            value: 'Pupkin',
        },
    }),
    phone: new Input({
        pattern: '^+?d{10,15}$',
        attr: {
            name:'phone',  
            type:'tel', 
            class: 'form-input form-input_profile ',
            value: '+79999999999',
        },
    })
}

const formFields =  [
    new AvatarField({
        name:'avatar',  
        attr: {class: 'form-input-wrap'},
        imgsrc: '/default.jpg',
        type:'file', 
        class: 'form-hidden',
        input: inputs.avatar          
    }),
    new FormField({
        attr: {class: 'form-input-wrap'}, 
        text:'Почта', 
        errorMessage:'Email должен быть корректным и содержать "собаку" (@) и точку после неё.',
        input: inputs.email
    }),
    new FormField({
        attr: {class: 'form-input-wrap'}, 
        text:'Логин',
        errorMessage:'Логин должен содержать от 3 до 20 символов, может включать буквы и цифры, но не состоять только из цифр. Без пробелов и спецсимволов.',
        input: inputs.login
    }),
    new FormField({
        attr: {class: 'form-input-wrap'}, 
        text:'Отображаемое имя', 
        errorMessage:'',
        input: inputs.displayName
    }),
    new FormField({
        attr: {class: 'form-input-wrap'}, 
        text:'Имя',
        errorMessage:'Имя должно начинаться с заглавной буквы, содержать только буквы, без пробелов и цифр, допускается дефис.',
        input: inputs.firstName
    }),
    new FormField({
        attr: {class: 'form-input-wrap'}, 
        text:'Фамилия', 
        errorMessage:'Имя должно начинаться с заглавной буквы, содержать только буквы, без пробелов и цифр, допускается дефис.',
        input: inputs.secondName
    }),
    new FormField({
        attr: {class: 'form-input-wrap'}, 
        text:'Телефон', 
        errorMessage:'Телефон должен содержать от 10 до 15 символов и состоять только из цифр, может начинаться с плюса.',
        input: inputs.phone
    }),
]
class Profile extends Block{


    constructor(){
        const {user} = Store.getState();
        

        super('div', {
            user,
            attr: {class: 'page'},
            
            modalClass: 'modal hidden',

            profileForm: new Form({
                title: 'Профиль',
                attr: {
                    method: 'POST',
                    class: 'form'
                },
                formFields: formFields,
                buttons:[ 
                    new Button({text:'Изменить данные', attr:{class: 'form-button form-button_edit'}}),
                    new Button({text:'Изменить пароль', attr:{class: 'form-link form-button_change-pass'}, onClick: (e:Event)=>{e.preventDefault();this.onShowModal()} } ),
                    new Button({text:'Выйти', attr:{class: 'form-link'}, onClick: (e:Event)=>{e.preventDefault();new Router('#app').go('/messenger')}})
                ],
                events: {
                    submit: (e: Event)=>{submitForm(e, (data: DataType) => {UserController.patchProfile(data)})}
                }
                
            }),

            modalChangePassword: new Modal({
                    attr: {class:'modal hidden'},
                    onClick: ()=>{this.onHideModal()},
                    form: new Form({
                        title:'Изменить пароль',
                        attr:{
                            class: 'form',
                            method: 'POST',
                        },
                        
                        formFields: [
                            new FormField({
                                attr: {class: 'form-input-wrap'}, 
                                text:'Старый пароль',
                                errorMessage:'Пароль должен содержать от 8 до 40 символов, обязательно хотя бы одну заглавную букву и цифру.',
                                input: new Input({
                                    pattern: '^(?=.*[A-Z])(?=.*d)[A-Za-zd]{8,40}$',
                                    attr: {
                                        name:'oldPassword',  
                                        type:'password', 
                                        class: 'form-input ',
                                    }
                                })
                            }),
                            new FormField({
                                attr: {class: 'form-input-wrap'}, 
                                text:'Новый пароль',
                                errorMessage:'Пароль должен содержать от 8 до 40 символов, обязательно хотя бы одну заглавную букву и цифру.',
                                input: new Input({
                                    pattern: '^(?=.*[A-Z])(?=.*d)[A-Za-zd]{8,40}$',
                                    attr:{
                                        name:'newPassword',  
                                        type:'password', 
                                        class: 'form-input ',
                                    }
                                }),
                                
                            }),
                        ],
                        button: new Button({
                            text: 'Сохранить',
                            attr:{class:'form-button '},
                        }),
                        events: {
                            submit: (e: Event)=>{submitForm(e, (data: DataType) => {UserController.changePassword(data).then(()=>{this.onHideModal()})})}
                        },
                    })
                }),

        });
        
    }

    protected componentDidMount(): void {
        console.log(this.props.user)
        this.updateChildren()
    }
    protected override componentDidUpdate(): void {
        this.updateChildren()
    }

    private updateChildren(){
        if(this.props.user){
            const {email, login, display_name, first_name, second_name, phone} = this.props.user;
            inputs.email.setProps({attr:{value: email}})
            inputs.login.setProps({attr:{value: login}})
            inputs.displayName.setProps({attr:{value: display_name || ''}})
            inputs.firstName.setProps({attr:{value: first_name || ''}})
            inputs.secondName.setProps({attr:{value: second_name || ''}})
            inputs.phone.setProps({attr:{value: phone || ''}})
        }
    }
    
    private onShowModal(){
        this.children.modalChangePassword.setProps({
            attr: { class: 'modal'}
        })
    }

    private onHideModal(){
        this.children.modalChangePassword.setProps({
            attr: { class: 'modal hidden' }
        })
    }

    override render(){
        return `
        {{{profileForm}}}
        {{{modalChangePassword}}} 
        `
    }
}

function mapUserToProps(state: Props) {
    return {
        user: state.user
    };
  }

export default connect(Profile, mapUserToProps)
