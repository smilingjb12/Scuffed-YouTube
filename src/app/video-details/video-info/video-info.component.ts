import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { VideoLiked } from 'src/app/app.actions';
import { Video } from 'src/app/app.model';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-video-info',
  templateUrl: './video-info.component.html',
  styleUrls: ['./video-info.component.scss']
})
export class VideoInfoComponent implements OnInit {
  public video: Video;

  constructor(private store: Store) { }

  public ngOnInit(): void {
    this.store.select(AppState.getCurrentVideo)
      .subscribe(video => this.video = video);
  }

  public likeVideo(): void {
    this.store.dispatch(new VideoLiked(this.video.id));
  }
}
