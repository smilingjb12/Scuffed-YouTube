import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Video, VideoComment } from './app.model';
import { DATABASE } from './database.model';
import { cloneDeep } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class VideoDataService {
  constructor() { }

  public fetchVideos(query: string, category: string): Observable<Video[]> {
    let videos = DATABASE.VIDEOS;
    if (query) {
      videos = videos.filter(v => v.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    if (category) {
      videos = videos.filter(v => v.category === category);
    }

    return of(videos);
  }

  public fetchComments(videoId: number): Observable<VideoComment[]> {
    const comments = DATABASE.COMMENTS.filter(c => c.videoId === videoId);
    return of(cloneDeep(comments));
  }

  public fetchRecommendedVideos(videoId: number): Observable<Video[]> {
    const videos = DATABASE.VIDEOS;
    return of(cloneDeep(videos));
  }

  public fetchVideo(id: number): Observable<Video> {
    const video = DATABASE.VIDEOS.find(v => v.id === id);
    return of(cloneDeep(video));
  }

  public likeVideo(id: number): Observable<number> {
    const video = DATABASE.VIDEOS.find(v => v.id === id);
    video.likes = video.likes + 1;
    DATABASE.PROFILE_STATS.liked += 1;
    return of(video.likes);
  }

  public watchVideo(id: number): Observable<number> {
    DATABASE.VIDEOS.find(v => v.id === id).views += 1;
    DATABASE.PROFILE_STATS.watched += 1;
    return of(DATABASE.PROFILE_STATS.watched);
  }
}
