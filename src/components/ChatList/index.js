import {Link} from "react-router-dom";
import './style.scss';
import {Button, Dialog, DialogTitle, TextField} from "@material-ui/core";
import {ListItem, List} from "@material-ui/core";
import {useState} from "react";


export const ChatList = ({chats, onDeleteChat, onAddChat}) => {
    const [dialogVisible, setDialogVisible] = useState(false);
    const [newChatName, setNewChatName] = useState('');
    const chatsList = Object.keys(chats)

    const handleDelete = (id) => {
        if (typeof onDeleteChat === 'function') {
            onDeleteChat(id);
        }
    }

    const handleAdd = () => {
        if (typeof onAddChat === 'function') {
            onAddChat(newChatName);
        }
        setNewChatName('');
        handleClose();
    }

    const handleChange = (e) => setNewChatName(e.target.value);


    const handleOpen = () => setDialogVisible(true);
    const handleClose = () => setDialogVisible(false);

    return (
        <>
            <div className="chat-container">
                <button type="button"
                        className="chat-button chat-button--add"
                        onClick={handleOpen}>
                    Добавить чат
                </button>
                <List>
                    {chatsList.map(item => {
                            return (
                                <ListItem key={item}>
                                    <Link to={`/chats/${item}`}>{chats[item]}</Link>
                                    <button type="button"
                                            className="chat-button chat-button--del"
                                            onClick={() => handleDelete(item)}>
                                        Удалить
                                    </button>
                                </ListItem>
                            )
                        }
                    )}
                </List>
            </div>
            <Dialog open={dialogVisible} onClose={handleClose} >
                <DialogTitle>Please enter a name for new chat</DialogTitle>
                <TextField value={newChatName} onChange={handleChange} />
                <Button onClick={handleAdd} disabled={!newChatName}>
                    Добавить
                </Button>
            </Dialog>
        </>

    )
}
