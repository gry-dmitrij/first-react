import {ADD_MESSAGE, DELETE_MESSAGE, SET_MESSAGES} from "./actions";
import {createReducer} from "../createReducer";

const initState = {
    messages: {},
}

const reducerEffects = {
    [ADD_MESSAGE](state, {chatId, text, author}) {
        return {
            ...state,
            messages: {
                ...state.messages,
                [chatId]: [
                    ...(state.messages[chatId] || []),
                    {
                        id: `message-${Date.now()}`,
                        text,
                        author
                    },
                ],
            },
        }
    },
    [DELETE_MESSAGE](state, {chatId, id}) {
        const newChatMessages = state.messages[chatId].filter(
            ({mesId}) => mesId === id
        )
        return {
            ...state,
            messages: {
                ...state.messages,
                [chatId]: newChatMessages,
            }
        }
    },
    /*[DELETE_CHAT](state, payload) {
        const newChatMessages = {...state};
        delete newChatMessages.messages[payload];
        return newChatMessages;
    },*/
    [SET_MESSAGES] (state, payload) {
        return {
            ...state,
            messages: payload,
        }
    }
}

export const messagesReducer = createReducer(reducerEffects, initState);

