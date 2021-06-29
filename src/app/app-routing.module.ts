import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { VerifyEmailGuard } from './auth/verify-email/verify-email.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: `about`,
    loadChildren: () => import('./pages/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: `home`,
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'prediction',
    loadChildren: () => import('./pages/prediction/prediction.module').then((m) => m.PredictionModule),
  },
  {
    path: `dashboard`,
    loadChildren: () => import('./pages/dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [AuthGuard],
  },
  {
    path: `train-online`,
    loadChildren: () => import('./pages/train-online/house-data.module').then((m) => m.HouseDataModule),
  },
  {
    path: 'verify-email',
    loadChildren: () =>
      import('./auth/verify-email/verify-email.module').then(
        (m) => m.VerifyEmailModule
      ),
    canActivate: [VerifyEmailGuard],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      paramsInheritanceStrategy: 'always',
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
