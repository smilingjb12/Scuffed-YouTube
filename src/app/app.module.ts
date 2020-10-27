import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TrendsComponent } from './trends/trends.component';
import { ProfileComponent } from './profile/profile.component';
import { NgxsModule } from '@ngxs/store';
import { AppState } from './app.state';
import { VideoPreviewComponent } from './video-preview/video-preview.component';
import { VideoDetailsComponent } from './video-details/video-details.component';
import { HeaderComponent } from './header/header.component';
import { VideoInfoComponent } from './video-details/video-info/video-info.component';
import { VideoCommentsComponent } from './video-details/video-comments/video-comments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TrendsComponent,
    ProfileComponent,
    VideoPreviewComponent,
    VideoDetailsComponent,
    HeaderComponent,
    VideoInfoComponent,
    VideoCommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([AppState])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
