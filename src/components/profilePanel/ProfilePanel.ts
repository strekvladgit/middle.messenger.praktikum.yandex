import Block, { Props } from "../../framework/Block";

export default class ProfilePanel extends Block {

    constructor(props: Props){
        super('div', {...props, attr:{class:'profile-panel'}});
    }
    override render(){
        return `
            <a href="../profile/profile.html" class="profile-panel__link">
                <div class="profile-panel__avatar">
                <img src="/default.jpg" alt="">
                </div>
                <div class="profile-panel__username">
                {{username}}
                <div class="profile-panel__status">статус тут</div>
                </div>
            </a>
        `;
    }
    
}
