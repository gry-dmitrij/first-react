import {Link} from "react-router-dom";
import './style.scss';
import {List} from "@material-ui/core";
import {ListItem} from "@material-ui/core";


export const ChatList = ({chats}) => {
    const chatList = Object.keys(chats);
    return (
        <div className="chat-container">
            <List>
                {chatList.map((item, index) => {
                    return (
                        <ListItem key={index}>
                            <Link to={`/chats/${item}`}>{item}</Link>
                        </ListItem>
                    )}
                )}
            </List>
        </div>
    )
}
