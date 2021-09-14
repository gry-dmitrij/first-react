export const createReducer = (actions, initState) =>
    (state = initState, {type, payload}) => {
        return typeof actions[type] === 'function' ?
            actions[type](state, payload) :
            state;
    }
