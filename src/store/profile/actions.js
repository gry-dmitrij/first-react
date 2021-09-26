import {auth, db} from "../../services/firebase";
import {onValue, ref, set} from "firebase/database";

export const SET_PROFILE = 'PROFILE::SET_PROFILE';

const createAction = (type) => (payload) => ({
    type,
    payload,
})

export const setProfile = createAction(SET_PROFILE);

export const initProfileInfo = () => (dispatch) => {
    const profileDbRef = ref(db, `users/${auth.currentUser.uid}`);
    onValue(profileDbRef, (snapshot) => {
        const data = snapshot.val();
        dispatch(setProfile(data || {}));
        if (!data || data.name?.trim().length === 0) {
            debugger;
            dispatch(sendName(auth.currentUser.email));
        }
    })
}

export const sendName = (name) => () => {
    const profileDbRef = ref(db, `users/${auth.currentUser.uid}/name`);
    set(profileDbRef, name);
}


