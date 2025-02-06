import AuthAPI from "../api/AuthAPI";
import Router from "../framework/Router";
import Store from "../framework/Store";
import { DataType } from "../utils/HTTPTransport";



export default class AuthController{

    private authAPI : AuthAPI = new AuthAPI();

    public create(data: DataType){
        this.authAPI.create(data)
            .then((response)=>{
                Store.set('user', response);
                new Router('#app').go('/messenger');
            })
            
    }

    public login(data: DataType){
        this.authAPI.login(data)
            .then(()=>{
                return this.getSelf()
            })
            .then((response)=>{
                Store.set('user', response);
                new Router('#app').go('/messenger');
            })
    }

    public getSelf(){
        return this.authAPI.getUser().then((data)=>data);
    }

    public logout(){
        this.authAPI.logout().then(()=>{
            Store.set('user', null);
            new Router('#app').go('/login');
        });
    }
   
}
