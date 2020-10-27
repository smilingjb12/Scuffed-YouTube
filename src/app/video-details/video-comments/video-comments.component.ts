import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { CommentAdded, FetchVideoComments } from 'src/app/app.actions';
import { VideoComment } from 'src/app/app.model';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-video-comments',
  templateUrl: './video-comments.component.html',
  styleUrls: ['./video-comments.component.scss']
})
export class VideoCommentsComponent implements OnInit {
  public comments: VideoComment[];
  public commentForm: FormGroup;
  private videoId: number;

  constructor(
    private store: Store,
    private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.videoId = parseInt(params.id);
      this.store.dispatch(new FetchVideoComments(this.videoId));
    });

    this.store.select(AppState.getVideoComments)
      .subscribe(comments => this.comments = comments);

    this.commentForm = new FormGroup({
      comment: new FormControl('', [Validators.required])
    });
  }

  public addComment(): void {
    this.store.dispatch(new CommentAdded(this.commentForm.value.comment, this.videoId));
    this.commentForm.reset();
  }
}
