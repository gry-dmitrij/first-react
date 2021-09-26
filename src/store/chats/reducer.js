import {SET_CHAT} from "./actions";
import {createReducer} from "../createReducer";

const initState = {
    chats: {}
}

const reducerEffects = {
    [SET_CHAT] (state, payload) {
        return {
            ...state,
            chats: {...payload},
        }
    }
}

export const chatsReducer = createReducer(reducerEffects, initState);
