export const getChatMessages = (id) => (state) => {
    return state.messages.messages[id] || [];
}
