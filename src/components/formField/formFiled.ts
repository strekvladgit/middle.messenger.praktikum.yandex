import Block, {Props} from "../../framework/Block";

export default class FormField extends Block {

    constructor(props:Props){
        
        super('div', {...props, isValid:true});

        this.children.input.setProps({
            onBlur:(response: boolean)=>{this.onValidation(response)}
        })

    }

    private onValidation(response: boolean){
        this.setProps({
            isValid: response
        })
    }

    override render(){
        
        return `
            {{{input}}}
            <label class="form-label" for="{{attr.name}}">{{text}} </label>
            <span class="form-tooltip">{{#if isValid}}{{else}}{{errorMessage}}{{/if}}</span>
            `;
    }
}

