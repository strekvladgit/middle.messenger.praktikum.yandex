import Block, { Props } from "../../framework/Block";
import Router from "../../framework/Router";
import connect from "../../utils/connect";

class ProfilePanel extends Block {

    constructor(props: Props){

        super('div', 
            {
                ...props, 
                attr:{
                    class:'profile-panel'
                },
                events: {
                    click: (e: Event)=>{
                        e.preventDefault();
                        new Router('#app').go('/settings');
                    }
                }
            }
        );
    }
    
    override render(){
        return `
            <div class="profile-panel__link">
                <div class="profile-panel__avatar">
                {{#if avatar}}
                    <img src="https://ya-praktikum.tech/api/v2/resources{{avatar}}" alt="">
                {{else}}
                    <img src="/default.jpg" alt="">
                {{/if}}
                
                </div>
                <div class="profile-panel__username">
                {{#if displayName}}
                    {{displayName}}
                {{else}}
                    {{name}} {{surname}}.
                {{/if}}
                
                <div class="profile-panel__status">статус тут</div>
                </div>
            </div>
        `;
    }
    
}

function mapUserToProps(state: Props) {
    return {
        name: state.user?.first_name,
        surname: state.user?.second_name,
        displayName: state.user?.display_name,
        avatar: state.user?.avatar
    };
  }

export default connect(ProfilePanel, mapUserToProps)
