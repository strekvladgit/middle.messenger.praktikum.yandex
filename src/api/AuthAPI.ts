import HTTPTransport, { Options, DataType } from "../utils/HTTPTransport";

const baseAPI = new HTTPTransport();

class AuthAPI {
    public create(data: DataType) {
        return baseAPI.post('auth/signup', {data} as Options)
    }

    public login(data: DataType) {
        return baseAPI.post('auth/signin', {data} as Options)
    }

    public logout(){
        return baseAPI.post('auth/logout', {})
    }

    public getUser(){
        return baseAPI.get('auth/user', {})
    }
}

export default new AuthAPI();
