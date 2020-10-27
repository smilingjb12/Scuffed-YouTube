import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { TrendsComponent } from './trends/trends.component';
import { VideoDetailsComponent } from './video-details/video-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'trends',
    component: TrendsComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'videos/:id',
    component: VideoDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
