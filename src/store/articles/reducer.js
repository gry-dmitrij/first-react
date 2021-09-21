import {REQUEST_STATUS} from "../../utils/constants";
import {createReducer} from "../createReducer";
import {
    ADD_ARTICLES_SUCCESS,
    GET_ARTICLES_FAILURE,
    GET_ARTICLES_PENDING,
    GET_ARTICLES_SUCCESS
} from "./actions";

const initState = {
    list: [],
    request: {
        status: REQUEST_STATUS.IDLE,
        error: null
    }
}

const reducerEffects = {
    [GET_ARTICLES_PENDING] (state) {
        return {
            ...state,
            request: {
                ...state.request,
                error: null,
                status: REQUEST_STATUS.PENDING,
            }
        }
    },
    [GET_ARTICLES_FAILURE] (state, payload) {
        return {
            ...state,
            request: {
                ...state.request,
                error: payload,
                status: REQUEST_STATUS.FAILURE,
            }
        }
    },
    [GET_ARTICLES_SUCCESS] (state, payload) {
        return {
            ...state,
            list: payload,
            request: {
                ...state.request,
                error: null,
                status: REQUEST_STATUS.SUCCESS,
            }
        }
    },
    [ADD_ARTICLES_SUCCESS] (state, payload) {
        return {
            ...state,
            list: [
                ...state.list,
                ...payload
            ],
            request: {
                ...state.request,
                error: null,
                status: REQUEST_STATUS.SUCCESS,
            }
        }
    }
}

export const articlesReducer = createReducer(reducerEffects, initState);
