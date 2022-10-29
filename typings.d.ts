export interface Tweet extends TweetBody {
  // Coming from sanity
  _id: string
  _createdAt: string
  _updatedAt: string
  _rev: string
  _type: 'tweet'
}

export type TweetBody = {
  text: string
  userName: string
  profileImage: string
  image?: string
}

export type CommentBody = {
  comment: string
  userName: string
  profileImage: string
  tweetId: string
}

export interface Comment extends CommentBody {
  _id: string
  _createdAt: string
  _updatedAt: string
  _rev: string
  _type: 'comment'
  tweet: {
    _ref: string
    _type: 'references'
  }
}
