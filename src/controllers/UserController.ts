import UserAPI from "../api/UserAPI";
import Router from "../framework/Router";
import Store from "../framework/Store";
import { DataType } from "../utils/HTTPTransport";

class UserController{

    public patchProfile(data: DataType){
        UserAPI.patch(data)
            .then((data)=>{
                Store.set('user', data);
            })
            .then(()=>{
                new Router('#app').go('/messenger')
            })
            .catch((error)=>{
                alert(error);
            });
    }

    public setAvatar(data: FormData){
        UserAPI.avatar(data)
            .then((data)=>{
                const {avatar} = data as DataType;
                Store.set('user.avatar', avatar);
            })
            .catch((error)=>{
                alert(error);
            });
    }

    public changePassword(data: DataType){
        return UserAPI.password(data)
    }

    public searchUser(data: DataType){
        UserAPI.search(data)
            .then((data)=>{
                Store.set('userFound', data)
            })
            .catch((error)=>{
                alert(error);
            });
    }
}

export default new UserController();
