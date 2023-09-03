import { AxiosInstance } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, State, store } from ".";
import actions from "./reducer";
import { ERRORS, TIMEOUT_SHOW_ERROR } from "./constants";
import { processErrorHandle } from "../hooks/process-error-handle";
import { IPostResponse, IUserReactions } from "./interfaces";

export const clearErrorAction = createAsyncThunk(
    'data/clearError',
    () => {
        setTimeout(
            () => store.dispatch(actions.fail(null)),
            TIMEOUT_SHOW_ERROR,
        );
    },
);

export const fetchPostsAction = createAsyncThunk<void, { postCount: string, searchValue: string }, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
}>(
    'posts/fetch',
    async ({ postCount, searchValue }, { dispatch, extra: api }) => {
        try {
            dispatch(actions.setDataLoadedStatus(true));
            const response: IPostResponse[] = await api.get(`/posts${postCount}${searchValue}`);
            dispatch(actions.getPosts(response));
        } catch (error) {
            processErrorHandle(ERRORS.DEFAULT);
            throw new Error(String(error));
        } finally {
            dispatch(actions.setDataLoadedStatus(false));
        }
    },
);

export const getPost = createAsyncThunk<void, { id: string, reactions: IUserReactions }, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
}>(
    'postInfo/fetch',
    async ({ id, reactions }, { dispatch, extra: api }) => {
        try {
            dispatch(actions.setDataLoadedStatus(true));
            const response: IPostResponse = await api.get(`/posts/${id}`);
            dispatch(actions.getPostInfo({ ...response, ...reactions }));
        } catch (error) {
            processErrorHandle(ERRORS.DEFAULT);
            throw new Error(String(error));
        } finally {
            dispatch(actions.setDataLoadedStatus(false));
        }
    },
);