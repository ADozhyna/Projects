import { DetailedPageComponent } from './youtube/pages/detailed-page/detailed-page.component';
import { AuthGuardGuard } from './core/guards/auth-guard.guard';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./youtube/youtube.module').then(m => m.YoutubeModule),
    canLoad: [AuthGuardGuard],
  },
  { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
