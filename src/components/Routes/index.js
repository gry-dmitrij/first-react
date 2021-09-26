import {BrowserRouter, Link, Redirect, Route, Switch} from 'react-router-dom';
import {Home} from '../Home';
import {Profiles} from '../Profiles';
import {Chats} from '../Chats';
import {News} from '../News'
import {PublicRoute} from "../PublicRoute";
import {useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth, login, signOut, signUp} from "../../services/firebase";
import {PrivateRoute} from "../PrivateRoute";

export const Routes = () => {
    const [authed, setAuthed] = useState(false);

    useEffect(() => {
        return  onAuthStateChanged(auth, (user) => {
            console.log(user);
            if (user) {
                setAuthed(true);
            } else {
                setAuthed(false);
            }
        });
    }, []);

    const handleLogin = async (email, pass) => {
        try {
            await login(email, pass);
        } catch (e) {
            console.log(e);
        }
    }

    const handleSignUp = async (email, pass) => {
        try {
            await signUp(email, pass);
        } catch (e) {
            console.log(e)
        }
    }

    const handleLogout = async () => {
        try {
            await signOut();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <BrowserRouter>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li>
                    <Link to="/chats">Chats</Link>
                </li>
                <li>
                    <Link to="/news">News</Link>
                </li>
            </ul>
            <Switch>
                <PublicRoute path="/login" exact authed={authed}>
                    <Home onLogin={handleLogin} />
                </PublicRoute>
                <PublicRoute path="/signup" exact authed={authed}>
                    <Home onSignUp={handleSignUp} />
                </PublicRoute>
                <PrivateRoute path="/profile" exact authed={authed}>
                    <Profiles onLogout={handleLogout}/>
                </PrivateRoute>
                <PrivateRoute path="/chats/:chatId?" authed={authed}>
                    <Chats/>
                </PrivateRoute>
                <Route path="/news">
                    <News />
                </Route>
                <Route path="/" exact>
                    <Redirect to="/login"/>
                </Route>
                <Route>
                    <h2>Page not found</h2>
                </Route>
            </Switch>
        </BrowserRouter>)
}
