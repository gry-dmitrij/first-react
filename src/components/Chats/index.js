import './style.scss';
import {Link, useParams} from "react-router-dom";
import {Fragment, useCallback, useEffect, useMemo} from "react";
import {ChatList} from "../ChatList";
import {MessageList} from "../MessageList";
import {NoChat} from "../NoChat";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getChatMessages} from "../../store/messages/selectors";
import {addMessage} from "../../store/messages/actions";
import {addChat, deleteChat} from "../../store/chats/actions";

export const Chats = () => {
    const {chatId} = useParams();
    const dispatch = useDispatch();
    const chats = useSelector(state => state.chats.chats);
    const getMessages = useMemo(() => getChatMessages(chatId), [chatId]);
    const messages = useSelector(getMessages, shallowEqual);

    const sendMessage = useCallback(
        (author, message) => {
            dispatch(addMessage(chatId, message, author));
        }, [dispatch, chatId]
    )

    const botMessage = useCallback(() => {
        if (!messages) return;

        if (messages.length > 0
            && messages[messages.length - 1].author !== 'Bot') {
            const timerId = setTimeout(() => {
                sendMessage('Bot', 'Привет!')
            }, 1500)
            return () => {
                clearTimeout(timerId);
            }
        }
    }, [messages, sendMessage]);

    useEffect(() => {
        botMessage();
    }, [botMessage]);

    const handleDeleteChat = (id) => {
        dispatch(deleteChat(id));
    }

    const handleAddChat = (name) => {
        dispatch(addChat(name))
    }

    return (
        <Fragment>
            <Link to="/">Home</Link>
            <h1>Chats</h1>
            <div className="chats-container">
                <ChatList chats={chats}
                          onDeleteChat={handleDeleteChat}
                          onAddChat={handleAddChat}/>
                {chats[chatId] ?
                    <MessageList messages={messages}
                                 addMessage={sendMessage}/>
                    : <NoChat/>}
            </div>
        </Fragment>
    )
}
