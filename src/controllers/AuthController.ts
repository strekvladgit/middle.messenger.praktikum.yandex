import AuthAPI from "../api/AuthAPI";
import Router from "../framework/Router";
import Store from "../framework/Store";
import { DataType } from "../utils/HTTPTransport";

class AuthController{

    public create(data: DataType){
        AuthAPI.create(data)
            .then(()=>{
                return this.getSelf()
            })
            .then((data)=>{
                Store.set('user', data);
                new Router('#app').go('/messenger');
            })
            
    }

    public login(data: DataType){
        AuthAPI.login(data)
            .then(()=>{
                return this.getSelf()
            })
            .then((response)=>{
                Store.set('user', response);
                new Router('#app').go('/messenger');
            })
    }

    public getSelf(){
        return AuthAPI.getUser().then((data)=>data)
            .then(data=>{Store.set('user', data); return data})
            .catch(()=>{new Router('#app').go('/')});;
    }

    public logout(){
        AuthAPI.logout().then(()=>{
            Store.set('user', null);
            new Router('#app').go('/');
        });
    }
   
}

export default new AuthController();
