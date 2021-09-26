import './style.scss';
import {useParams} from "react-router-dom";
import {Fragment, useCallback, useEffect, useMemo} from "react";
import {ChatList} from "../ChatList";
import {MessageList} from "../MessageList";
import {NoChat} from "../NoChat";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getChatMessages} from "../../store/messages/selectors";
import {addMessageFb, initMessages} from "../../store/messages/actions";
import {addChat, deleteChat, initChats} from "../../store/chats/actions";
import {getChats} from "../../store/chats/selectors";

export const Chats = () => {
    const {chatId} = useParams();
    const dispatch = useDispatch();
    const chats = useSelector(getChats);
    const getMessages = useMemo(() => getChatMessages(chatId), [chatId]);
    const messages = useSelector(getMessages, shallowEqual);

    useEffect(() => {
        dispatch(initChats());
        dispatch(initMessages());
    }, [dispatch]);

    const sendMessage = useCallback(
        (author, message) => {
            // dispatch(addMessageWithReply(chatId, message, author));
            dispatch(addMessageFb(chatId, message, author));
        }, [dispatch, chatId]
    )

    const handleDeleteChat = (id) => {
        // dispatch(deleteChat(id));
        dispatch(deleteChat(id));
    }

    const handleAddChat = (name) => {
        dispatch(addChat(name))
    }

    return (
        <Fragment>
            <h1>Chats</h1>
            <div className="chats-container">
                <ChatList chats={chats}
                          onDeleteChat={handleDeleteChat}
                          onAddChat={handleAddChat}/>
                {chats[chatId] ?
                    <MessageList messages={Object.values(messages || {})}
                                 addMessage={sendMessage}/>
                    : <NoChat/>}
            </div>
        </Fragment>
    )
}
