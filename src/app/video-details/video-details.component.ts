import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FetchRecommendedVideos, FetchVideo, VideoLiked, VideoWatched } from '../app.actions';
import { Video } from '../app.model';
import { AppState } from '../app.state';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss']
})
export class VideoDetailsComponent implements OnInit {
  public video: Video;
  public recommendedVideos: Video[];

  constructor(
    private store: Store,
    private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.store.select(AppState.getCurrentVideo)
      .subscribe(video => this.video = video);

    this.store.select(AppState.getRecommendedVideos)
      .subscribe(videos => this.recommendedVideos = videos);

    this.route.params.subscribe(params => {
      window.scrollTo(0, 0);
      const videoId = parseInt(params.id);
      this.store.dispatch(new VideoWatched(videoId));
      this.store.dispatch(new FetchVideo(videoId));
      this.store.dispatch(new FetchRecommendedVideos(videoId));
    });
  }
}
