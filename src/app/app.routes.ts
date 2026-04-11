import { Routes } from '@angular/router';
import { HomePage } from './components/pages/home-page/home-page';
import {LoginPage} from './components/pages/login-page/login-page'
import { RegisterPage } from './components/pages/register-page/register-page';
import { CreatePage } from './components/pages/create-page/create-page';
import { ArchivePage } from './components/pages/archive-page/archive-page';
import { ArchiveDisplayPage } from './components/pages/archive-display-page/archive-display-page';
import { VotePage } from './components/pages/vote-page/vote-page';

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
    },
    {
        path: 'archive',
        component: ArchivePage,
        title: 'Archive'
    },
    {
        path: 'archive/:id',
        component: ArchiveDisplayPage,
        title: 'Archive'
    },
    {
        path: 'vote',
        component: VotePage,
        title: 'Vote'
    }
]

export default routeConfig;