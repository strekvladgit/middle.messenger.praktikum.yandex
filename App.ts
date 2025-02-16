import './style.css';
import Router from './src/framework/Router.ts'
import {Chat, Login, Register, PagesList, Profile, Page404} from './pages'
import AuthController from './src/controllers/AuthController.ts'


AuthController.getSelf()
    .then(()=>{
        const router = new Router("#app");
        router
            .use('/', Login)
            .use('/messenger', Chat)
            .use('/sign-up', Register)
            .use('/settings', Profile)
            .use('/404-not-found', Page404)
            .start();
    })








  




