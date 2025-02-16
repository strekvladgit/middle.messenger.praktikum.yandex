import AuthAPI from "../api/AuthAPI";
import Router from "../framework/Router";
import Store from "../framework/Store";
import { DataType } from "../utils/HTTPTransport";
import ChatController from "./ChatController";

class AuthController{

    public create(data: DataType){
        AuthAPI.create(data)
            .then(()=>{
                return this.getSelf()
            })
            .then(()=>{
                new Router('#app').go('/messenger');
            })
            .catch((error)=>{
                alert(error);
            });
            
    }

    public login(data: DataType){
        AuthAPI.login(data)
            .then(()=>{
                this.getSelf()
            })
            .then(()=>{new Router('#app').go('/messenger');})
            .catch((error)=>{
                if (error === "User already in system"){
                    new Router('#app').go('/messenger')
                } else {
                    alert(error)
                }
            });
    }

    public getSelf(){
        return AuthAPI.getUser().then((data)=>data)
            .then(data=>{Store.set('user', data); return data})
            .then((data)=>{ChatController.getChats({limit:'10'});return data})
            .catch((error)=>{
                if (error === "Cookie is not valid"){
                    new Router('#app').go('/')
                } else {
                    alert(error)
                }
            });
    }

    public logout(){
        AuthAPI.logout().then(()=>{
            Store.set('user', null);
            new Router('#app').go('/');
        })
        .catch((error)=>{
            alert(error);
        });
    }
   
}

export default new AuthController();
