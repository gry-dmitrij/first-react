import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import {Home} from '../Home';
import {Profiles} from '../Profiles';
import {Chats} from '../Chats';
import {News} from '../News'

export const Routes = () => {
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
                <Route path="/profile">
                    <Profiles/>
                </Route>
                <Route path="/chats/:chatId?">
                    <Chats/>
                </Route>
                <Route path="/news">
                    <News />
                </Route>
                <Route path="/" exact>
                    <Home/>
                </Route>
                <Route>
                    <h2>Page not found</h2>
                </Route>
            </Switch>
        </BrowserRouter>)
}
