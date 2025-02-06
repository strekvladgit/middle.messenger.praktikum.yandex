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
    protected override componentDidMount(): void {
        console.log('mounted')
    }
    protected override componentDidUpdate(): void{
        console.log('updated')
    }
    override render(){
        return `
            <div class="profile-panel__link">
                <div class="profile-panel__avatar">
                <img src="/default.jpg" alt="">
                </div>
                <div class="profile-panel__username">
                {{name}} {{surname}}.
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
    };
  }

export default connect(ProfilePanel, mapUserToProps)
