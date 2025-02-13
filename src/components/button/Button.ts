import Block, { Props } from "../../framework/Block";

export default class Button extends Block {

    constructor(props: Props){

        const {onClick} = props;

        super('button', {...props,
            events: {
                click: (e: Event)=>{
                    if(onClick){
                        onClick(e)
                    }
                },
            }
        });
    }
    override render(){
        return `
            {{#if img}}
                <img src="{{img.src}}" alt="{{img.alt}}"/>
            {{/if}}
            {{text}}
        `;
    }
    
}
