import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { SelectivePreloadStrategy } from './SelectivePreloadStrategy';
import { AuthGuard } from '../user/auth.guard';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { 
      path: 'profile', 
      canActivate: [AuthGuard],
      loadChildren: '../profile/profile.module#ProfileModule',
      data: { preload: true }
  },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: SelectivePreloadStrategy
    })
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
