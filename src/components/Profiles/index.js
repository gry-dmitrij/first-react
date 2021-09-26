import {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getName} from "../../store/profile/selectors";
import {initProfileInfo, sendName} from "../../store/profile/actions";

export const Profiles = ({onLogout}) => {
    const name = useSelector(getName);
    const dispatch = useDispatch();
    const [localName, setLocalName] = useState('');
    useEffect(() => {
        dispatch(initProfileInfo());
    }, [dispatch]);

    const handleLogout = () => {
        if (!!onLogout) {
            onLogout();
        }
    }

    const handleChangeName = (e) => {
        e.preventDefault();
        setLocalName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (localName.trim().length === 0 )
            return;
        dispatch(sendName(localName.trim()));
        setLocalName('');
    }

    return (
        <Fragment>
            <h1>Profiles</h1>
            <p>Hello, {name}</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="change-name">New name</label>
                <input id="change-name"
                       type="text"
                       value={localName}
                       onChange={handleChangeName}/>
                <input type="submit"
                       value='Change name'/>
            </form>
            <input type="button" value='Logout' onClick={handleLogout}/>
        </Fragment>
    )
}
