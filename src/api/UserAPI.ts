

class UserAPI extends BaseAPI {
    create() {
        return api.post('/', {})
            .then(data => someUpdate(data))
            .then(data => someOtherChanges(data))
            .then(data => moreLogic);
    }
}
