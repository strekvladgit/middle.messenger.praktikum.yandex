import Block from "../../src/framework/Block";
import Link from "../../src/components/link/Link";

export default class PagesList extends Block{
    constructor(){
        super('nav', {
            regLink: new Link({
                text: 'Регистрация',
                attr: {
                    href: '/pages/register/register.html'
                }
            }),
            loginLink: new Link({
                text: 'Вход',
                attr: {
                    href: '/pages/login/login.html'
                }
            }),
            profileLink: new Link({
                text: 'Профиль',
                attr: {
                    href: '/pages/profile/profile.html'
                }
            }),
            chatLink: new Link({
                text: 'Чат',
                attr: {
                    href: '/pages/chat/chat.html'
                }
            }),
            page4xxLink: new Link({
                text: '404',
                attr: {
                    href: '/pages/errors/page4xx/page4xx.html'
                }
            }),
            page5xxLink: new Link({
                text: '500',
                attr: {
                    href: '/pages/errors/page4xx/page5xx.html'
                }
            })
        });
    }
    override render(){
        return `<ul>
        <li>{{{regLink}}}</li>
        <li>{{{loginLink}}}</li>
        <li>{{{chatLink}}}</li>
        <li>{{{profileLink}}}</li>
        <li>{{{page4xxLink}}}</li>
        <li>{{{page5xxLink}}}</li>
          
        </ul>`
    }
}



