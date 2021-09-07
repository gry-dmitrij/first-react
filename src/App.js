import './App.css';
import '@fontsource/roboto';
import MessageList from "./components/MessageList";
import ChatList from "./components/ChatList";

function App() {
    return (
        <div className="App">
            <ChatList/>
            <MessageList text="Первое приложение"/>
        </div>
    );
}

export default App;
