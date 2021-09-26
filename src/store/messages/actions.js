import {db} from "../../services/firebase";
import {ref, onValue, set} from "firebase/database";

export const ADD_MESSAGE = "MESSAGES::ADD_MESSAGE";
export const DELETE_MESSAGE = "MESSAGES::DELETE_MESSAGE";
export const SET_MESSAGES = "MESSAGES::SET_MESSAGE";

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

export const setMessages = (messages) => ({
    type: SET_MESSAGES,
    payload: messages,
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

export const initMessages = () => (dispatch) => {
    const messagesDbRef = ref(db, 'messages');
    onValue(messagesDbRef, (snapshot) => {
        const data = snapshot.val();
        dispatch(setMessages(data || {}))
    })
}

export const addMessageFb = (chatId, text, author) => () => {
    const newId = `mes-${author}-${Date.now()}`;
    const messageDbRef = ref(db, `messages/${chatId}/${newId}`);
    set(messageDbRef, {
        id: newId,
        author,
        text,
    })
}
