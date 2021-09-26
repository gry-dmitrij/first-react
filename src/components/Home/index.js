import {Fragment, useState} from "react";
import {Link} from "react-router-dom";

export const Home = ({onLogin, onSignUp}) => {
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');

    const handleLoginChange = (e) => {
        setLogin(e.target.value);
    }

    const handlePassChange = (e) => {
        setPass(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!!onLogin) {
            onLogin(login, pass);
        } else {
            onSignUp(login, pass);
        }
    }

    return (
        <Fragment>
            <h1>Home</h1>
            <h2>{!!onLogin ? 'Login' : 'Sign Up'}</h2>
            <Link to={!!onLogin ? '/signup' : '/login'}>
                {!!onLogin ? 'Sign up' : 'Login'}
            </Link>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userName">User name:</label>
                <input type="text"
                       id="userName"
                       onChange={handleLoginChange}/>
                <br/>
                <label htmlFor="userPass">Password:</label>
                <input type="password"
                       id="userPass"
                       onChange={handlePassChange}/>
                <br/>
                <input type="submit" value={!!onLogin ? 'Login' : 'Sign up'}/>
            </form>
        </Fragment>
    )
}
