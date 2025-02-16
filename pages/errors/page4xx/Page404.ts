import Block from "../../../src/framework/Block";
import Link from "../../../src/components/link/Link";
import Router from "../../../src/framework/Router";

export default class Page404 extends Block{
    constructor(){
        super('div', {
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
            attr: {
                class: 'error-page'
            }
        });
    }
    override render(){
        return `<h1>404</h1>
          <h2>Not Found</h2>
        {{{backLink}}}
          `
    }
}



