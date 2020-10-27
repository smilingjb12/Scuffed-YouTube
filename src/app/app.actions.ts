export class FetchHomeVideos {
  static readonly type = 'FetchHomeVideos';
  constructor(public query: string, public category: string) { }
}

export class FetchRecommendedVideos {
  static readonly type = 'FetchRecommendedVideos';
  constructor(public videoId: number) { }
}

export class FetchVideo {
  static readonly type = 'FetchVideo';
  constructor(public id: number) { }
}

export class FetchProfileStats {
  static readonly type = 'FetchProfileStats';
  constructor() { }
}

export class FetchVideoComments {
  static readonly type = 'FetchVideoComments';
  constructor(public videoId: number) { }
}

export class VideoLiked {
  static readonly type = 'LikeVideo';
  constructor(public videoId: number) { }
}

export class VideoWatched {
  static readonly type = 'VideoWatched';
  constructor(public videoId: number) { }
}