import {db} from "../../services/firebase";
import {ref, onValue, update, remove} from "firebase/database";

export const SET_CHAT = "CHATS::SET_CHAT";

export const setChats = (chats) => ({
    type: SET_CHAT,
    payload: chats,
})

export const initChats = () => (dispatch) => {
    const chatsDbRef = ref(db, 'chats');
    onValue(chatsDbRef, (snapshot) => {
        const data = snapshot.val();
        dispatch(setChats(data || {}));
    })
}

export const addChat = (name) => () => {
    const newId = `chat-${Date.now()}`;
    const chatsDbRef = ref(db, `chats`);
    update(chatsDbRef, {
        [newId]: name,
    })
        .catch((error) => {
            console.log(`An error occurred while adding a chat: ${error}`)
        })
}

export const deleteChat = (id) => async () => {
    const chatsDbRef = ref(db, `chats/${id}`);
    const messagesDbRef = ref(db, `messages/${id}`);
    try {
        await remove(chatsDbRef);
        await remove(messagesDbRef);
    } catch (error) {
        console.log(`An error occurred while deleting a chat: ${error}`)
    }
}

