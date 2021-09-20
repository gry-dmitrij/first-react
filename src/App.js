import './App.css';
import '@fontsource/roboto';
import {Routes} from "./components/Routes";
import {Provider} from "react-redux";
import {persistor, store} from "./store";
import {PersistGate} from "redux-persist/integration/react";

function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Routes/>
            </PersistGate>
        </Provider>
    );
}

export default App;
