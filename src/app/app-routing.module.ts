import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { VerifyEmailGuard } from './auth/verify-email/verify-email.guard'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: `about`,
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'prediction',
    loadChildren: () => import('./prediction/prediction.module').then(m => m.PredictionModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), children: [
      { path: '/add', loadChildren:()=> import('./dashboard/add-patient/add-patient.module').then(m=>m.AddPatientModule)  },
      { path: '/edit/:id', loadChildren:()=> import('./dashboard/edit-patient/edit-patient.module').then(m=>m.EditPatientModule)},
      { path : '/list', loadChildren:()=> import('./dashboard/patient-list/patient-list.module').then(m=>m.PatientListModule)},
      { path: '/details/:id',loadChildren:()=> import('./dashboard/patient-details/patient-details.module').then(m=>m.PatientDetailsModule) }
    ],
    canActivate:[AuthGuard]
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./auth/verify-email/verify-email.module').then(m => m.VerifyEmailModule),
    canActivate:[VerifyEmailGuard]
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      paramsInheritanceStrategy: 'always',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
