import Block from "../../src/framework/Block";
import Form from "../../src/components/form/Form";
import formField from "../../src/components/formField/formFiled";
import Button from "../../src/components/button/Button";
import Modal from "../../src/components/modal/Modal";

export default class Profile extends Block{

    constructor(){
        super('div', {
            attr: {class: 'page'},
            
            modalClass: 'modal hidden',

            profileForm: new Form({
                title: 'Профиль',
                attr: {
                    method: 'POST',
                    class: 'form'
                },
                formFields: [
                    new formField({
                        attr: {class: 'form-input-wrap'},
                        name:'avatar',  
                        type:'file', 
                        class: 'form-hidden',
                        imgsrc: '/default.jpg'
                          
                    }),
                    new formField({
                        attr: {class: 'form-input-wrap'}, 
                        text:'Почта', 
                        name:'email',  
                        type:'email', 
                        class: 'form-input form-input_profile ',
                        value: 'pochta@pochta.ru',
                        errorMessage:'Email должен быть корректным и содержать "собаку" (@) и точку после неё.',
                        pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$',
                    }),
                    new formField({
                        attr: {class: 'form-input-wrap'}, 
                        text:'Логин',
                        name:'login',  
                        type:'text', 
                        class: 'form-input form-input_profile ',
                        value: 'MyUserName',
                        errorMessage:'Логин должен содержать от 3 до 20 символов, может включать буквы и цифры, но не состоять только из цифр. Без пробелов и спецсимволов.',
                        pattern: '^(?=.{3,20}$)(?![0-9]*$)[a-zA-Z0-9-_]+$',
                    }),
                    new formField({
                        attr: {class: 'form-input-wrap'}, 
                        text:'Отображаемое имя', 
                        name:'display_name',  
                        type:'text', 
                        class: 'form-input form-input_profile ',
                        value: 'MyUserName',
                        errorMessage:'',
                        pattern: '',
                    }),
                    new formField({
                        attr: {class: 'form-input-wrap'}, 
                        text:'Имя',
                        name:'first_name',  
                        type:'text', 
                        class: 'form-input form-input_profile ',
                        value: 'Vasya',
                        errorMessage:'Имя должно начинаться с заглавной буквы, содержать только буквы, без пробелов и цифр, допускается дефис.',
                        pattern: '^[A-ZА-ЯЁ][a-zа-яёA-ZА-ЯЁ0-9-]*$',
                    }),
                    new formField({
                        attr: {class: 'form-input-wrap'}, 
                        text:'Фамилия', 
                        name:'second_name',  
                        type:'text', 
                        class: 'form-input form-input_profile ',
                        value: 'Pupkin',
                        errorMessage:'Имя должно начинаться с заглавной буквы, содержать только буквы, без пробелов и цифр, допускается дефис.',
                        pattern: '^[A-ZА-ЯЁ][a-zа-яёA-ZА-ЯЁ0-9-]*$',
                    }),
                    new formField({
                        attr: {class: 'form-input-wrap'}, 
                        text:'Телефон', 
                        name:'phone',  
                        type:'tel', 
                        class: 'form-input form-input_profile ',
                        value: '+79999999999',
                        errorMessage:'Телефон должен содержать от 10 до 15 символов и состоять только из цифр, может начинаться с плюса.',
                        pattern: '^+?d{10,15}$',
                    }),
                ],
                buttons:[ 
                    new Button({text:'Изменить данные', attr:{class: 'form-button form-button_edit'}}),
                    new Button({text:'Изменить пароль', attr:{class: 'form-link form-button_change-pass'}, onClick: (e:Event)=>{e.preventDefault();this.onShowModal()} } ),
                    new Button({text:'Выйти', attr:{class: 'form-link'}})
                ]
                
            }),

            modal: new Modal({
                    attr: {class:'modal-overlay'},
                    onClick: ()=>{this.onHideModal()},
                    form: new Form({
                        title:'Изменить пароль',
                        attr:{class: 'form'},
                        formFields: [
                            new formField({
                                attr: {class: 'form-input-wrap'}, 
                                text:'Старый пароль',
                                name:'oldPassword',  
                                type:'password', 
                                class: 'form-input ',
                                errorMessage:'Пароль должен содержать от 8 до 40 символов, обязательно хотя бы одну заглавную букву и цифру.',
                                pattern: '^(?=.*[A-Z])(?=.*d)[A-Za-zd]{8,40}$',
                            }),
                            new formField({
                                attr: {class: 'form-input-wrap'}, 
                                text:'Новый пароль',
                                name:'newPassword',  
                                type:'password', 
                                class: 'form-input ',
                                errorMessage:'Пароль должен содержать от 8 до 40 символов, обязательно хотя бы одну заглавную букву и цифру.',
                                pattern: '^(?=.*[A-Z])(?=.*d)[A-Za-zd]{8,40}$',
                            }),
                        ],
                        button: new Button({
                            text: 'Сохранить',
                            attr:{class:'form-button '},
                        })
                    })
                }),

        });
        
    }

    private onShowModal(){
        this.setProps({
            modalClass: 'modal'
        })
    }

    private onHideModal(){
        this.setProps({
            modalClass: 'modal hidden'
        })
    }

    override render(){
        return `{{{profileForm}}}
        <div class="{{{modalClass}}}">
            {{{modal}}} 
        </div>
        `
    }
}
