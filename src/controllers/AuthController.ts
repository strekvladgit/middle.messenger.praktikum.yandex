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
                console.log(error)
                if (error === "User already in system"){
                    new Router('#app').go('/')
                }
            });
    }

    public getSelf(){
        AuthAPI.getUser().then((data)=>data)
            .then(data=>{Store.set('user', data); return data})
            .then(()=>{ChatController.getChats({limit:'5'})})
            .catch((error)=>{
                console.log(error)
                if (error === "Cookie is not valid"){
                    new Router('#app').go('/')
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
