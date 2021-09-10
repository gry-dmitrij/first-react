import './App.css';
import '@fontsource/roboto';
import {Routes} from "./components/Routes";
import {Provider} from "react-redux";
import {store} from "./store";

function App() {
    return (
        <Provider store={store}>
            <Routes/>
        </Provider>
    );
}

export default App;
