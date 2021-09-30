import {messagesReducer} from "../reducer";
import {ADD_MESSAGE, addMessage, setMessages} from "../actions";

const initState = {
    messages: {},
}

describe('messagesReducer test', () => {
    it('add message', () => {
        let messagesTestReducer = messagesReducer(initState, addMessage('id1', 'Text message 1', 'Bot'));
        expect(messagesTestReducer).toEqual({
                messages: {
                    id1: [expect.objectContaining({
                        author: 'Bot',
                        text: 'Text message 1',
                    })]
                }
            }
        );
        messagesTestReducer = messagesReducer(messagesTestReducer, addMessage('id1', 'Text message 2', 'Guest'));
        messagesTestReducer = messagesReducer(messagesTestReducer, addMessage('id2', 'Text message 1', 'Anonym'));
        expect(messagesTestReducer).toEqual({
            messages: {
                id1: [
                    expect.objectContaining({
                        author: 'Bot',
                        text: 'Text message 1',
                    }),
                    expect.objectContaining({
                        author: 'Guest',
                        text: 'Text message 2',
                    }),
                ],
                id2: [
                    expect.objectContaining({
                        author: 'Anonym',
                        text: 'Text message 1',
                    })
                ]
            }
        });
    })
    it('set messages', () => {
        const addedObject = {
            id1: [
                {
                    id: 'id1',
                    text: 'Text message1',
                    author: 'Bot',
                },
                {
                    id: 'id2',
                    text: 'Text message2',
                    author: 'Guest',
                },
            ],
            id2: [
                {
                    id: 'id1',
                    text: 'Text message1',
                    author: 'Bot',
                }
            ]
        }
        const messagesTestReducer = messagesReducer(initState, setMessages(addedObject));
        expect(messagesTestReducer).toEqual({ messages: addedObject });
    })
});
