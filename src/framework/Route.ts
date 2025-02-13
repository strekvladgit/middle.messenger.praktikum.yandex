import Block, {Props, ClassType} from "./Block";
import { renderDOM } from "../utils/renderDOM";



export default class Route {

    private _pathname: string;
    private _blockClass: ClassType;
    private _block: Block | null; 
    private _props:Props;

    constructor(pathname:string, view: ClassType, props:Props) {

        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
        
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block = null;
        }
    }

    match(pathname: string) : boolean{
        return pathname === this._pathname;
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass({});
            renderDOM(this._props.rootQuery, this._block as Block);
            return;
        }
    }
}
