export const getChatMessages = (id) => (state) =>
    state.messages.messages[id] || [];
