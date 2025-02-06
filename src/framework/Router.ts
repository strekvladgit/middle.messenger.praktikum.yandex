import {ClassType} from "./Block";
import Route from "./Route";


export default class Router {
    private routes:Route[] = [];
    private history: History = window.history;
    private _currentRoute : Route | null = null;
    private static __instance: Router | null;
    private _rootQuery:string = '';

    constructor(rootQuery: string){

        if(Router.__instance) {
            return Router.__instance
        }

        this._rootQuery = rootQuery;

        Router.__instance = this;

    }
    use(pathname: string, block: ClassType){//регистрируем пути
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
        this.routes?.push(route);
        return this;

    }
    start(){//отлавливаем изменения истории
        window.onpopstate = (event: PopStateEvent) => {
            const location = (event.currentTarget as Window)?.location;
            if(location){
                this._onRoute(location.pathname);
            }
            
        }

        this._onRoute(window.location.pathname)

    }

    _onRoute(pathname: string){//
        let route = this.getRoute(pathname);
        if(!route){
            route = this.getRoute('/404-not-found');
        }
        if(this._currentRoute && this._currentRoute !== route){
            this._currentRoute.leave()
        }
        if(!route){
            return;
        }
        this._currentRoute = route;

        route.render();//рисует вот этот рендер

    }

    go(pathname: string){
        this.history.pushState({}, "", pathname)
        this._onRoute(pathname);
    }

    getRoute(pathname :string){
        return this.routes?.find((route: Route) => route.match(pathname))
    }
    back() {
        this.history.back()
    }

    forward() {
        this.history.forward()
    }
}
