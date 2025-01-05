import Block, { Props } from "../../framework/Block";

export default class Input extends Block {

    constructor(props:Props){

        const {onBlur, pattern} = props;

        super('input', {...props,
            events: {
                blur: (e: Event)=>{
                    const {target} = e;
                    if (target instanceof HTMLInputElement) {
                        const value = target.value;
                        const isValid = this.validate(value, pattern)
                        if(onBlur){
                            onBlur(isValid);
                            console.log(isValid)
                        }
                    }
                },
            }
        });
    }

    private validate(input: string, regexString: RegExp): boolean {
        if(input){
            const regex = new RegExp(regexString)
            if (regex.test(input)) {
                return true;
            }
        }
        return false;
    }
    
}
