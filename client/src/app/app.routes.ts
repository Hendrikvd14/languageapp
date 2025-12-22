import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
import { LanguageCard } from '../features/cards/language-card/language-card';
import { NotFound } from '../shared/errors/not-found/not-found';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'cards', component: LanguageCard},
    {path: '**', component: NotFound}
];
