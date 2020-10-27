import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CategoryToggled, CommentAdded, FetchCategories, FetchHomeVideos as FetchHomeVideos, FetchProfileStats, FetchRecommendedVideos, FetchVideo, FetchVideoComments, VideoLiked, VideoWatched } from './app.actions';
import { VideoDataService } from './video-data.service';
import iassign from 'immutable-assign';
import { tap } from 'rxjs/operators';
import { ProfileStats, Video, VideoComment } from './app.model';
import { ProfileDataService } from './profile-data.service';

interface AppStateModel {
  homeVideos: Video[];
  trendingVideos: Video[];
  currentVideo: Video;
  recommendedVideos: Video[];
  profileStats: ProfileStats;
  videoComments: VideoComment[];
  categories: string[],
  selectedCategory: string
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    homeVideos: [],
    trendingVideos: [],
    currentVideo: null,
    videoComments: [],
    recommendedVideos: [],
    profileStats: {
      watched: 0,
      liked: 0
    },
    categories: [],
    selectedCategory: null
  }
})
@Injectable()
export class AppState {
  @Selector()
  public static getSelectedCategory(state: AppStateModel): string {
    return state.selectedCategory;
  }

  @Selector()
  public static getCategories(state: AppStateModel): string[] {
    return state.categories;
  }

  @Selector()
  public static getVideoComments(state: AppStateModel): VideoComment[] {
    return state.videoComments;
  }

  @Selector()
  public static getHomeVideos(state: AppStateModel): Video[] {
    return state.homeVideos;
  }

  @Selector()
  public static getProfileStats(state: AppStateModel): ProfileStats {
    return state.profileStats;
  }

  @Selector()
  public static getRecommendedVideos(state: AppStateModel): Video[] {
    return state.recommendedVideos;
  }

  @Selector()
  public static getCurrentVideo(state: AppStateModel): Video {
    return state.currentVideo;
  }

  constructor(
    private videoDataService: VideoDataService,
    private profileDataService: ProfileDataService) { }

  @Action(CategoryToggled)
  categoryToggled(ctx: StateContext<AppStateModel>, action: CategoryToggled) {
    const newState = iassign(ctx.getState(), draft => {
      if (draft.selectedCategory === action.category) {
        draft.selectedCategory = null;
      } else {
        draft.selectedCategory = action.category;
      }
      return draft;
    });
    ctx.setState(newState);
  }

  @Action(FetchCategories)
  fetchCategories(ctx: StateContext<AppStateModel>, action: FetchCategories) {
    return this.videoDataService.fetchCategories().pipe(tap(categories => {
      const newState = iassign(ctx.getState(), draft => {
        draft.categories = categories;
        return draft;
      });
      ctx.setState(newState);
    }));
  }

  @Action(FetchVideoComments)
  fetchVideoComments(ctx: StateContext<AppStateModel>, action: FetchVideoComments) {
    const newState = iassign(ctx.getState(), draft => {
      draft.videoComments = null;
      return draft;
    });
    ctx.setState(newState);
    return this.videoDataService.fetchComments(action.videoId).pipe(tap(comments => {
      const newState = iassign(ctx.getState(), draft => {
        draft.videoComments = comments;
        return draft;
      });
      ctx.setState(newState);
    }));
  }

  @Action(FetchVideo)
  fetchVideo(ctx: StateContext<AppStateModel>, action: FetchVideo) {
    const newState = iassign(ctx.getState(), draft => {
      draft.currentVideo = null;
      draft.videoComments = null;
      return draft;
    });
    ctx.setState(newState);
    return this.videoDataService.fetchVideo(action.id).pipe(tap(video => {
      const newState = iassign(ctx.getState(), draft => {
        draft.currentVideo = video;
        return draft;
      });
      ctx.setState(newState);
    }));
  }

  @Action(FetchHomeVideos)
  fetchHomeVideos(ctx: StateContext<AppStateModel>, action: FetchHomeVideos) {
    ctx.setState(iassign(ctx.getState(), draft => {
      draft.homeVideos = null;
      return draft;
    }));
    return this.videoDataService.fetchVideos(action.query, action.category).pipe(tap(videos => {
      const newState = iassign(ctx.getState(), draft => {
        draft.homeVideos = videos;
        return draft;
      });
      ctx.setState(newState);
    }));
  }

  @Action(FetchProfileStats)
  fetchProfileStats(ctx: StateContext<AppStateModel>, action: FetchProfileStats) {
    return this.profileDataService.fetchStats().pipe(tap(stats => {
      const newState = iassign(ctx.getState(), draft => {
        draft.profileStats = stats;
        return draft;
      });
      ctx.setState(newState);
    }));
  }

  @Action(FetchRecommendedVideos)
  fetchRecommendedVideos(ctx: StateContext<AppStateModel>, action: FetchRecommendedVideos) {
    return this.videoDataService.fetchRecommendedVideos(action.videoId).pipe(tap(videos => {
      const newState = iassign(ctx.getState(), draft => {
        draft.recommendedVideos = videos;
        return draft;
      });
      ctx.setState(newState);
    }));
  }

  @Action(VideoLiked)
  videoLiked(ctx: StateContext<AppStateModel>, action: VideoLiked) {
    return this.videoDataService.likeVideo(action.videoId).pipe(tap(likes => {
      const newState = iassign(ctx.getState(), draft => {
        draft.currentVideo.likes = likes;
        return draft;
      });
      ctx.setState(newState);
      return ctx.dispatch(new FetchProfileStats());
    }));
  }

  @Action(VideoWatched)
  videoWatched(ctx: StateContext<AppStateModel>, action: VideoWatched) {
    return this.videoDataService.watchVideo(action.videoId).pipe(tap(likes => {
      const newState = iassign(ctx.getState(), draft => {
        draft.currentVideo.likes = likes;
        return draft;
      });
      ctx.setState(newState);
      return ctx.dispatch(new FetchProfileStats());
    }));
  }

  @Action(CommentAdded)
  commentAdded(ctx: StateContext<AppStateModel>, action: CommentAdded) {
    ctx.setState(iassign(ctx.getState(), draft => {
      draft.videoComments = null;
      return draft;
    }));
    return this.videoDataService.addComment(action.videoId, action.comment).pipe(tap(likes => {
      return ctx.dispatch(new FetchVideoComments(action.videoId));
    }));
  }
}