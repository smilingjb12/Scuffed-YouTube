import { Video, VideoComment, ProfileStats } from './app.model';

export const DATABASE = {
  VIDEOS: [
    {
      id: 1,
      previewUrl: 'https://i.ytimg.com/vi/D9VtrNThLjU/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAod6VVifL67IOM2Q6Q-akmxu8wLQ',
      likes: 120,
      dislikes: 3,
      title: 'Some guy playing a classical guitar - Joao Fuss',
      description: `Arranjo para guitarra clássica do tema "No Surprises" - Radiohead - João Ferreira Fuss
Tabs - joaofuss@hotmail.com
mymusicsheet.com`,
      category: 'Music',
      views: 153
    },
    {
      id: 2,
      previewUrl: 'https://i.ytimg.com/vi/MixZfUIiSvY/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAGRToWVNsqwpKjyPud5dDpVMsRUA',
      likes: 42350,
      dislikes: 125,
      title: 'Fox hanging out in the yard | 2020',
      description: `Yep, that winter coat time of the year again!!  and the fox go FLOOF, all fluffed up and poofy!  This is his 6th edition winter coat (being 5 1/2 years old)!`,
      category: 'Animals',
      views: 236263
    }
  ] as Video[],
  COMMENTS: [
    {
      id: 1,
      text: 'Wow amazing guitar there',
      postedAt: new Date(),
      videoId: 1
    },
    {
      id: 2,
      text: 'I could never play like that. But I like ice cream.',
      postedAt: new Date(),
      videoId: 1
    },
    {
      id: 3,
      text: 'The fact that people still watch this',
      postedAt: new Date(),
      videoId: 2
    }
  ] as VideoComment[],
  PROFILE_STATS: {
    watched: 1,
    liked: 2
  } as ProfileStats,
  CATEGORIES: [
    'Animals',
    'Music'
  ]
}