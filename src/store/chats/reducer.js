import {ADD_CHAT, DELETE_CHAT} from "./actions";
import {createReducer} from "../createReducer";

const initState = {
    chats: {
        'chat-1': 'Chat1',
        'chat-2': 'Chat2',
    }
}

const reducerEffects = {
    [ADD_CHAT] (state, payload) {
        const id = `chats-${Date.now()}`;
        return {
            ...state,
            chats: {
                ...state.chats,
                [id]: payload,
            }
        }
    },
    [DELETE_CHAT] (state, payload) {
        const newChats = { ...state.chats };
        delete newChats[payload];
        return {
            ...state,
            chats: newChats,
        }
    },
}

export const chatsReducer = createReducer(reducerEffects, initState);
