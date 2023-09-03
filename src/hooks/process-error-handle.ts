import { store } from "../store";
import { clearErrorAction } from "../store/api-actions";
import actions from "../store/reducer";

export const processErrorHandle = (message: string): void => {
    store.dispatch(actions.fail(message));
    store.dispatch(clearErrorAction());
};