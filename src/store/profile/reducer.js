import {createReducer} from "../createReducer";
import {SET_PROFILE} from "./actions";

const initState = {
    name: '',
}

const reducerEffects = {
    [SET_PROFILE] (state, payload) {
        return {
            ...payload
        }
    },
}

export const profileReducer = createReducer(reducerEffects, initState);
