export const ADD_MESSAGE = "MESSAGES::ADD_MESSAGE";
export const DELETE_MESSAGE = "MESSAGES::DELETE_MESSAGE";

export const addMessage = (chatId, text, author) => ({
    type: ADD_MESSAGE,
    payload: {
        chatId,
        text,
        author
    }
});

export const deleteMessage = (chatId, id) => ({
    type: DELETE_MESSAGE,
    payload: {
        chatId,
        id
    }
})

let timeout;

export const addMessageWithReply = (chatId, text, author) => (dispatch) => {
    dispatch(addMessage(chatId, text, author));
    const bot = 'Bot'

    if (author !== bot) {
        clearTimeout(timeout)
        timeout = setTimeout( () => {
            dispatch(addMessage(chatId, 'Привет!', bot));
        }, 1500);
    }
}
