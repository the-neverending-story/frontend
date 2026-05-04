import { ResolveFn, Routes } from '@angular/router';
import { HomePage } from './components/pages/home-page/home-page';
import {LoginPage} from './components/pages/login-page/login-page'
import { RegisterPage } from './components/pages/register-page/register-page';
import { CreatePage } from './components/pages/create-page/create-page';
import { ArchivePage } from './components/pages/archive-page/archive-page';
import { ArchiveDisplayPage } from './components/pages/archive-display-page/archive-display-page';
import { VotePage } from './components/pages/vote-page/vote-page';
import { WebPage } from './components/pages/web-page/web-page';
import { ProfilePage } from './components/pages/profile-page/profile-page';

const profileTitleResolver: ResolveFn<string> = (route) => {
    return route.paramMap.get('username') || 'User not found'
}

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
    },
    {
        path: 'web',
        component: WebPage,
        title: 'Web of Teramir'
    },
    {
        path: 'profile/:username',
        component: ProfilePage,
        title: profileTitleResolver
    }
]

export default routeConfig;