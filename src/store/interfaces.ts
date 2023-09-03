export interface IPost {
    id: number,
    userId?: number,
    title?: string,
    body?: string,
    likesCount?: number,
    dislikesCount?: number,
    userAction?: string,
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