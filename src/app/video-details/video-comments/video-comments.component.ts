import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { FetchVideoComments } from 'src/app/app.actions';
import { VideoComment } from 'src/app/app.model';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-video-comments',
  templateUrl: './video-comments.component.html',
  styleUrls: ['./video-comments.component.scss']
})
export class VideoCommentsComponent implements OnInit {
  public comments: VideoComment[];

  constructor(
    private store: Store,
    private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      const videoId = parseInt(params.id);
      this.store.dispatch(new FetchVideoComments(videoId));
    });
    this.store.select(AppState.getVideoComments)
      .subscribe(comments => this.comments = comments);
  }
}
