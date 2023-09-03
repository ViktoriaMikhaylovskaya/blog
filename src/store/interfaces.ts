export interface IUserReactions {
    likesCount?: number,
    dislikesCount?: number,
    userAction?: string,
}

export interface IPost extends IUserReactions {
    id: number,
    userId?: number,
    title?: string,
    body?: string,
}

export interface IPostList {
    [key: number]: IPost,
}

export interface IPostResponse {
    id: number,
    userId: number,
    title: string,
    body: string,
}