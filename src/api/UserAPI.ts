
import HTTPTransport, { Options, DataType } from "../utils/HTTPTransport";

const baseAPI = new HTTPTransport();

class UserAPI {
    public patch(data: DataType) {
        return baseAPI.put('user/profile', {data} as Options)
    }

    public avatar(data: FormData) {
        return baseAPI.put('user/profile/avatar', {data} as Options)
    }

    public password(data: DataType) {
        return baseAPI.put('user/password', {data} as Options)
    }

    public search(data: DataType) {
        return baseAPI.post('user/search', {data} as Options)
    }
}

export default new UserAPI();
