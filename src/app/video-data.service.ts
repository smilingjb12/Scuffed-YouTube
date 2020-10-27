import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Video, VideoComment } from './app.model';
import { DATABASE } from './database.model';
import { cloneDeep } from 'lodash';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideoDataService {
  private REQUEST_DELAY = () => Math.random() * 1000;
  constructor() { }

  public fetchVideos(query: string, category: string): Observable<Video[]> {
    let videos = DATABASE.VIDEOS;
    if (query) {
      videos = videos.filter(v => v.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    if (category) {
      videos = videos.filter(v => v.category === category);
    }

    return of(videos).pipe(delay(this.REQUEST_DELAY()));
  }

  public fetchComments(videoId: number): Observable<VideoComment[]> {
    const comments = DATABASE.COMMENTS.filter(c => c.videoId === videoId);
    return of(cloneDeep(comments)).pipe(delay(this.REQUEST_DELAY() * 3));
  }

  public fetchRecommendedVideos(videoId: number): Observable<Video[]> {
    const videos = DATABASE.VIDEOS;
    return of(cloneDeep(videos)).pipe(delay(this.REQUEST_DELAY()));
  }

  public fetchVideo(id: number): Observable<Video> {
    const video = DATABASE.VIDEOS.find(v => v.id === id);
    return of(cloneDeep(video)).pipe(delay(this.REQUEST_DELAY() * 2));
  }

  public likeVideo(id: number): Observable<number> {
    const video = DATABASE.VIDEOS.find(v => v.id === id);
    video.likes += 1;
    DATABASE.PROFILE_STATS.liked += 1;
    return of(video.likes).pipe(delay(this.REQUEST_DELAY()));
  }

  public watchVideo(id: number): Observable<number> {
    const video = DATABASE.VIDEOS.find(v => v.id === id);
    video.views += 1;
    DATABASE.PROFILE_STATS.watched += 1;
    return of(video.likes).pipe(delay(this.REQUEST_DELAY()));
  }

  public fetchCategories(): Observable<string[]> {
    return of(cloneDeep(DATABASE.CATEGORIES)).pipe(delay(this.REQUEST_DELAY()));
  }

  public addComment(videoId: number, text: string): Observable<VideoComment> {
    const comment = {
      id: DATABASE.COMMENTS.length + 1,
      videoId,
      text: text,
      postedAt: new Date()
    } as VideoComment;
    DATABASE.COMMENTS.push(comment);
    return of(cloneDeep(comment)).pipe(delay(this.REQUEST_DELAY()));
  }
}
