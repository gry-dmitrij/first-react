export const TOGGLE_ACTION = 'PROFILE::TOGGLE_ACTION';

/*export const toggleAction = {
    type: TOGGLE_ACTION,
    payload: false;
}*/

export const toggleAction = (payload) => {
    return {
        type: TOGGLE_ACTION,
        payload
    }
}
