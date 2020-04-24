import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { ExchangeComponent } from './exchange';
import { PrincipalComponent } from './principal';
import { AuthGuard } from './_helpers';

const routes: Routes = [
    { path: '', component: PrincipalComponent, canActivate: [AuthGuard] },
    { path: 'updateExchange', component: RegisterComponent, canActivate: [AuthGuard] },
    { path: 'executeExchange', component: ExchangeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);