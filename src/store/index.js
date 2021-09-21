import {createStore, combineReducers, compose, applyMiddleware} from "redux";
import {profileReducer} from "./profile/reducer";
import {messagesReducer} from "./messages/reducer";
import {chatsReducer} from "./chats/reducer";
import {articlesReducer} from './articles/reducer';
import thunk from "redux-thunk";
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from "redux-persist";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose();

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    profile: profileReducer,
    messages: messagesReducer,
    chats: chatsReducer,
    news: articlesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
