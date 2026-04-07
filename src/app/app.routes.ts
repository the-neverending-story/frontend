import { Routes } from '@angular/router';
import { HomePage } from './components/pages/home-page/home-page';
import {LoginPage} from './components/pages/login-page/login-page'
import { RegisterPage } from './components/pages/register-page/register-page';
import { CreatePage } from './components/pages/create-page/create-page';

const routeConfig: Routes = [
    {
        path: '',
        component: HomePage,
        title: 'World Of Teramir'
    },
    {
        path: 'login',
        component: LoginPage,
        title: 'Login'
    },
    {
        path: 'register',
        component: RegisterPage,
        title: 'Register'
    },
    {
        path: 'create',
        component: CreatePage,
        title: 'Create'
    }
]

export default routeConfig;