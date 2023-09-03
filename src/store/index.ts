import { configureStore } from '@reduxjs/toolkit';
import { reducer as postsReducer } from './reducer';
import { createAPI } from '../utils/axios';

export const api = createAPI();

export const store = configureStore({
    reducer: { postsReducer },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: api,
            },
        }),
});

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;