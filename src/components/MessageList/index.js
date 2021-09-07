import './style.scss'
import {Fragment, useCallback, useEffect, useRef, useState} from "react";
import {Button} from "@material-ui/core";
import {TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        maxWidth: "350px",
        margin: "10px"
    },
    edit: {
        marginBottom: "10px"
    }
})

function Messages() {
    const classes = useStyles();
    const inputRef = useRef(null);
    const [messageList, setMessageList] = useState([]);
    const [message, setMessage] = useState('');
    const [author, setAuthor] = useState('Guest');
    const [messageCount, setMessageCount] = useState(0);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    // добавляем автора и сообщение в массив
    const addMessage = useCallback((author, message) => {
        setMessageList(prevList => [...prevList, {
            id: messageCount,
            message,
            author: author.trim() ? author : 'Anonymous'
        }]);
        setMessageCount(prev =>prev + 1);
        setMessage("");
        inputRef.current.focus();
    }, [messageCount]);

    useEffect(() => {
        if (messageList.length > 0
            && messageList[messageList.length - 1].author !== 'Bot') {
            const timerId = setTimeout(() => {
                addMessage('Bot', `Сообщение отправлено!`);
            }, 1500);
            return () => {
                clearTimeout(timerId)
            }
        }
    }, [messageList, addMessage]);

    const handleMessage = (event) => {
        setMessage(event.target.value);
    }

    const handleAuthor = (event) => {
        setAuthor(event.target.value);
    }

    const formSubmit = (event) => {
        event.preventDefault();
        addMessage(author, message);
    }

    return (
        <div className="">
            <div className='message-window'>
                {messageList.map((item) =>
                    <Fragment key={item.id}>
                        <div>Автор: {item.author}</div>
                        <pre>Сообщение: {item.message}</pre>
                    </Fragment>
                )}
            </div>
            <form action="#"
                  onSubmit={formSubmit}
                  className={classes.root}>
                <TextField required
                           id="author"
                           label="Author"
                           className={classes.edit}
                           value={author}
                           onChange={handleAuthor}/>
                <TextField id="message"
                           label="Сообщение"
                           className={classes.edit}
                           multiline
                           rows={1}
                           variant="outlined"
                           value={message}
                           onChange={handleMessage}
                           inputRef={inputRef}/>
                <Button type="submit"
                        variant="contained">Отправить</Button>
            </form>
        </div>
    );
}

export default Messages;
