import './style.scss'

function Message({ text }) {
    return (
        <div>
            <h1 className={'main-title'}>{text}</h1>
            <p>Проверка работы <span>scss</span></p>
        </div>
    );
}

export default Message;