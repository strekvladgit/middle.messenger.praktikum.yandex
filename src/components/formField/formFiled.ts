import Block, {Props} from "../../framework/Block";
import Input from "../input/Input";

export default class formField extends Block {

    constructor(props:Props){

        const inputProps = {
            imgsrc: props.imgsrc,
            pattern: props.pattern,
            attr: {
                name: props.name,
                type: props.type,
                class: props.class,
                value: props.value || ''
            },
            onBlur:(response: boolean)=>{this.onValidation(response)}
        }

        const input = new Input(inputProps as Props);
        
        super('div', {...props, input, isValid:true});

    }

    private onValidation(response: boolean){
        this.setProps({
            isValid: response
        })
    }

    override render(){
        return `
            {{#if imgsrc}}
                <label for="{{attr.name}}" class="form-avatar-upload">
                    <img src="{{imgsrc}}" alt="">
                </label>
                {{{input}}} 
            {{else}}
                {{{input}}}
                <label class="form-label" for="{{attr.name}}">{{text}} </label>
                <span class="form-tooltip">{{#if isValid}}{{else}}{{errorMessage}}{{/if}}</span>
            {{/if}}`;
    }
}
