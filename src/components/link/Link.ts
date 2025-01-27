import Block, { Props } from "../../framework/Block";

export default class Link extends Block {

    constructor(props:Props){
        super('a', props);
    }
    override render(){
        return `{{text}}`;
    }
}
