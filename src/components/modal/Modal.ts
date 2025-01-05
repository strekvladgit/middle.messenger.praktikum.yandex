import Block, { Props } from "../../framework/Block";

export default class Modal extends Block {


    constructor(props:Props){

        const {onClick} = props;

        super('div', {...props,
            events: {
                click: (e: Event)=>{
                    e.preventDefault();
                    const {target} = e;
                    if (target instanceof HTMLElement) {
                        const classList = target.classList;
                        if(classList&&classList.contains('modal-overlay')){
                            onClick()
                        }
                    }
                },
            }
        });
    }

    override render(){
        console.log(this.props.modalClass)
        return `
            {{{form}}}     
        `;
    }
}
