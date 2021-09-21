import {useDispatch, useSelector} from "react-redux";
import {
    selectArticles,
    selectArticlesError,
    selectArticlesLoading
} from "../../store/articles/selectors";
import {CircularProgress} from "@material-ui/core";
import {addArticles, getArticles, getErrorRequest} from "../../store/articles/actions";
import {useCallback, useEffect} from "react";

export const News = () => {
    const dispatch = useDispatch();

    const articles = useSelector(selectArticles);
    const error = useSelector(selectArticlesError);
    const loading = useSelector(selectArticlesLoading);

    const reload = useCallback(() => {
        dispatch(getArticles());
    }, [dispatch]);

    const addNewArticles = () => {
        dispatch(addArticles());
    }

    const errorRequest = () => {
        dispatch(getErrorRequest());
    }

    useEffect(() => {
        reload();
    }, [reload]);

    return (
        <>
            <h1>News</h1>
            {error ? (
                <>
                    <h3>Error: error</h3>
                    <button onClick={reload}>Перезагрузить</button>
                </>
            ) : (
                <>
                    <button onClick={errorRequest}>Ошибочный запрос</button>
                    {articles.map(article => (
                        <article key={article.id}>
                            <a href={article.url}><h3>{article.title}</h3></a>
                        </article>
                    ))}
                </>
            )}
            {loading && <CircularProgress/>}
            <button onClick={addNewArticles} disabled={loading}>Загрузить еще новости...</button>
        </>
    )
}
