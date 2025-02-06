import './style.css';
import Router from './src/framework/Router.ts'
import {Chat, Login, Register, PagesList, Profile, Page404} from './pages'
import {default as Store} from './src/framework/Store.ts';
import AuthController from './src/controllers/AuthController.ts'




const router = new Router("#app");
router
    .use('/', PagesList)
    .use('/messenger', Chat)
    .use('/login', Login)
    .use('/sign-up', Register)
    .use('/settings', Profile)
    .use('/404-not-found', Page404)
    .start();


const appState = {
  user: null,
}

new AuthController().getSelf()
  .then(data=>{Store.set('user', data)})
  .catch(()=>{router.go('/login')})

  




