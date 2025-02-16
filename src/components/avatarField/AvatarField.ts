import Block, {Props} from "../../framework/Block";
import connect from "../../utils/connect";

class AvatarField extends Block {

    constructor(props:Props){
        super('div', {...props, isValid:true});

    }


    override render(){
        
        return `
            <label for="{{name}}" class="form-avatar-upload">
                {{#if avatar}}
                <img src="https://ya-praktikum.tech/api/v2/resources{{avatar}}" alt="">
                {{else}}
                <img src="{{imgsrc}}" alt="">
                {{/if}}
                
            </label>
            {{{input}}} 
            `;
    }
}
function mapAvatarToProps(state: Props){
    return {
        avatar: state.user?.avatar
    }
}
export default connect(AvatarField, mapAvatarToProps)
