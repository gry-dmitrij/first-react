import {REQUEST_STATUS} from "../../utils/constants";

export const selectArticlesLoading = (state) =>
    state.news.request.status === REQUEST_STATUS.PENDING;
export const selectArticles = (state) => state.news.list;
export const selectArticlesError = (state) =>
    state.news.request.error;
