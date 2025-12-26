import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
import { LanguageCard } from '../features/cards/language-card/language-card';
import { NotFound } from '../shared/errors/not-found/not-found';
import { Register } from '../features/account/register/register';
import { Login } from '../features/account/login/login';
import { authGuard } from '../core/guards/auth-guard';
import { MemberProfile } from '../features/members/member-profile/member-profile';

export const routes: Routes = [
    { path: '', component: Home },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            { path: 'cards', component: LanguageCard },
            { path: 'member-profile/:id', component: MemberProfile }
            
        ]
    },
    { path: 'register', component: Register },
    { path: 'login', component: Login },
    { path: '**', component: NotFound }
];
