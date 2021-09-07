import {useState} from "react";
import './style.scss';
import {List} from "@material-ui/core";
import {ListItem} from "@material-ui/core";

const chatInit = [
    {
        id: 1,
        name: 'Chat1'
    },
    {
        id: 2,
        name: 'Chat2'
    }
];

function ChatList() {
    const [chatList] = useState(chatInit);
    return (
        <div className="chat-container">
            <List>
                {chatList.map(item => {
                    return (
                        <ListItem key={item.id}>{item.name}</ListItem>
                    )}
                )}
            </List>
        </div>
    )
}

export default ChatList;
