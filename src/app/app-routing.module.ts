import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'videos',
    loadChildren: () =>
      import('./videos/videos.module').then((m) => m.VideosModule),
  },
  {
    path: 'consult',
    loadChildren: () =>
      import('./consult/consult.module').then((m) => m.ConsultModule),
  },
  {
    path: '',
    redirectTo: 'videos',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
