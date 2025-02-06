import Block, { Props, Indexed, ClassType } from "../framework/Block";
import Store, { StoreEvents } from "../framework/Store";
import isEqual from "./isEqual";

export default function connect(Component: new (props: Props) => Block, mapStateToProps: (state: Indexed) => Indexed): ClassType {
    return class extends Component {
        constructor(propsAndChildren: Props = {}) {
            let state = mapStateToProps(Store.getState());
            super({ ...propsAndChildren, ...state });

            // подписываемся на событие
            Store.on(StoreEvents.Updated, () => {
                const newState = mapStateToProps(Store.getState());
                console.log(state, newState);
                if (!isEqual(state, newState)) {
                    this.setProps({ ...newState });
                }
                state = newState;
            });
        }
    };
}
