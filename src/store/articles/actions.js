import {PUBLIC_URL} from "../../utils/constants";

export const GET_ARTICLES_PENDING = "ARTICLES::GET_PENDING";
export const GET_ARTICLES_SUCCESS = "ARTICLES::GET_SUCCESS";
export const ADD_ARTICLES_SUCCESS = "ARTICLES::ADD_SUCCESS";
export const GET_ARTICLES_FAILURE = "ARTICLES::GET_FAILURE";

const getArticlesPending = () => ({
    type: GET_ARTICLES_PENDING,
});

const getArticlesSuccess = (articles) => ({
    type: GET_ARTICLES_SUCCESS,
    payload: articles,
});

const addArticlesSuccess = (articles) => ({
    type: ADD_ARTICLES_SUCCESS,
    payload: articles,
})

const getArticlesFailure = (error) => ({
    type: GET_ARTICLES_FAILURE,
    payload: error,
});

const getRequest = async (path) => {

    const response = await fetch(path);

    if (!response.ok) {
        throw new Error(`error ${response.status}`);
    }
    return  await response.json();
}

export const getArticles = () => async (dispatch) => {
    dispatch(getArticlesSuccess([]));
    dispatch(getArticlesPending());
    try {
        const result = await getRequest(PUBLIC_URL)
        dispatch(getArticlesSuccess(result));
    } catch (e) {
        dispatch(getArticlesFailure(e.message));
    }


}

export const addArticles = () => async (dispatch, getState) => {
    dispatch(getArticlesPending());
    const state = getState();
    try {
        const result = await getRequest(`${PUBLIC_URL}/?_start=${state.news.list.length}`);
        dispatch(addArticlesSuccess(result));
    } catch (e) {
        dispatch(getArticlesFailure(e.message));
    }
}

export const getErrorRequest = () => async (dispatch) => {
    dispatch(getArticlesSuccess([]));
    dispatch(getArticlesPending());
    try {
        const result = await getRequest(`${PUBLIC_URL}/error`);
        dispatch(getArticlesSuccess(result));
    } catch (e) {
        dispatch(getArticlesFailure(e.message));
    }
}



