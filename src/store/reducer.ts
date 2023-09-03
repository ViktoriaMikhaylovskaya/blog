import { createReducer, createAction } from '@reduxjs/toolkit';
import { IPost, IPostList, IPostResponse } from './interfaces';

export const actions = {
    getPosts: createAction<IPostResponse[]>('posts/fetch'),
    changeReaction: createAction<{ id: number, postInfo: IPost }>('posts/changeReaction'),

    getPostInfo: createAction<IPostResponse>('post/fetchPostInfo'),
    changePostReaction: createAction<IPost>('post/changeReaction'),

    fail: createAction<string | null>('data/fetchPostsFail'),
    setDataLoadedStatus: createAction<boolean>('data/setDataLoadedStatus'),
};

export interface State {
    postList: IPostList,
    postInfo: IPost,
    isLoading: boolean,
    error: string | null,
};

const initialState: State = {
    postList: {},
    postInfo: { id: 0 },
    isLoading: false,
    error: null,
};

export const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(actions.getPosts, (state, { payload }) => {
            state.isLoading = false;
            state.error = null;
            state.postList = payload.reduce((acc: IPostList, el: IPost) => ({
                ...acc, [el.id]: {
                    ...el,
                    likesCount: Math.floor(Math.random() * 50),
                    dislikesCount: Math.floor(Math.random() * 50),
                    userAction: 'default',
                }
            }), {});
        })
        .addCase(actions.getPostInfo, (state, { payload }) => {
            state.isLoading = false;
            state.error = null;
            state.postInfo = {
                ...payload,
                likesCount: Math.floor(Math.random() * 50),
                dislikesCount: Math.floor(Math.random() * 50),
                userAction: 'default',
            }
        })
        .addCase(actions.fail, (state, { payload }) => {
            state.error = payload;
            state.isLoading = false;
        })
        .addCase(actions.setDataLoadedStatus, (state, { payload }) => {
            state.isLoading = payload;
        })
        .addCase(actions.changeReaction, (state, { payload }) => {
            state.postList = { ...state.postList, [payload.id]: payload.postInfo };
        })
        .addCase(actions.changePostReaction, (state, { payload }) => {
            state.postInfo = payload;
        });
});

export default actions;
