import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
  PreloadingStrategy,
  PreloadAllModules,
} from '@angular/router';

import { LoginComponent } from './views/login/login.component';

import { AuthenticatedGuardService as AuthenticatedGuard } from './guards/authenticated-guard.service';
import { AppComponent } from './app.component';
import { RequestComponent } from './views/request/request.component';

const routes: Routes = [
  {
    path: '',
    component: RequestComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthenticatedGuard],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
