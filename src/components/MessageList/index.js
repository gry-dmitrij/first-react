import './style.scss'
import {Fragment, useEffect, useRef, useState} from "react";

function Message() {
    const botTimers = useRef([]);
    const [messageList, setMessageList] = useState([]);
    const [message, setMessage] = useState('');
    const [author, setAuthor] = useState('Guest');

    useEffect(() => {
        if (messageList.length > 0
            && messageList[messageList.length - 1].author !== 'Bot') {
            const timerId = setTimeout(() => {
                botTimers.current.shift();
                addMessage('Bot', `Сообщение отправлено!`);
            }, 1500);
            return () => {
                clearTimeout(timerId)
            }
        }
    }, [messageList])

    const handleMessage = (event) => {
        setMessage(event.target.value);
    }

    const handleAuthor = (event) => {
        setAuthor(event.target.value);
    }

    // добавляем автора и сообщение в массив
    const addMessage = (author, message) => {
        setMessageList(prevList => [...prevList, {
            message,
            author: author.trim() ? author : 'Anonymous'
        }]);
    }

    const formSubmit = (event) => {
        event.preventDefault();
        addMessage(author, message);
    }

    return (
        <Fragment>
            <form action="#" onSubmit={formSubmit} className="chat-form">
                <label htmlFor="author" className="label">Автор:</label>
                <input type="text" id="author" className="edit" value={author} onChange={handleAuthor}/>
                <label htmlFor="message">Сообщение:</label>
                <textarea id="message" className="edit edit--area" value={message} onChange={handleMessage}/>
                <input type="submit" className="chat-form__button" value="Отправить"/>
            </form>
            {messageList.map((item, index) =>
                <Fragment key={index}>
                    <div>Автор: {item.author}</div>
                    <pre>Сообщение: {item.message}</pre>
                </Fragment>
            )}
        </Fragment>
    );
}

export default Message;
