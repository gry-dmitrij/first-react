import './style.scss'
import {Fragment, useEffect, useRef, useState} from "react";
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

export const MessageList = ({messages, addMessage}) => {
    const classes = useStyles();
    const inputRef = useRef(null);
    const [message, setMessage] = useState('');
    const [author, setAuthor] = useState('Guest');

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleMessage = (event) => {
        setMessage(event.target.value);
    }

    const handleAuthor = (event) => {
        setAuthor(event.target.value);
    }

    const formSubmit = (event) => {
        event.preventDefault();
        addMessage(author, message);
        inputRef.current.focus();
    }

    return (
        <Fragment>
            <div className="message-window">
                {messages.map(item =>
                    <Fragment key={item.id}>
                        <div>Автор: {item.author}</div>
                        <pre>Сообщение: {item.message}</pre>
                    </Fragment>
                )}
            </div>
            <form onSubmit={formSubmit}
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
        </Fragment>
    )
    /*return (
        <div className="">
            <div className='message-window'>
                {messageList.map((item) =>
                    <Fragment key={item.id}>
                        <div>Автор: {item.author}</div>
                        <pre>Сообщение: {item.message}</pre>
                    </Fragment>
                )}
            </div>
            <form onSubmit={formSubmit}
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
    );*/
}
