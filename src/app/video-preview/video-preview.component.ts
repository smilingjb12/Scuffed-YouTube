import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Video } from '../app.model';

@Component({
  selector: 'app-video-preview',
  templateUrl: './video-preview.component.html',
  styleUrls: ['./video-preview.component.scss']
})
export class VideoPreviewComponent implements OnInit {
  @Input() public video: Video;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public goToVideo(video: Video): void {
    this.router.navigate(['videos', video.id]);
  }
}
