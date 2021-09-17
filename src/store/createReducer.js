export const createReducer = (reducerEffects, initState) =>
    (state = initState, {type, payload}) => {
        return typeof reducerEffects[type] === 'function' ?
            reducerEffects[type](state, payload) :
            state;
    }
