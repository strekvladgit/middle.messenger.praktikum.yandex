import Block, { Props } from "../../framework/Block";
import './modal.css';

export default class Modal extends Block {


    constructor(props:Props){

        const {onClick } = props;

        super('div', {...props,
            events: {
                click: (e: Event)=>{
                    const {target} = e;
                    if (target instanceof HTMLElement) {
                        const classList = target.classList;
                        if(classList&&classList.contains('modal-overlay')){
                            onClick()
                        }
                    }
                },
            },
        });
    }

    override render(){
        return `
            <div class="modal-overlay">
                {{{form}}}
            </div>
        `;
    }
}
