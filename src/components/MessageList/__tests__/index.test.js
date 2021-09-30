import {fireEvent, render} from "@testing-library/react";
import {MessageList} from "../index";
import {Provider} from "react-redux";
import configureStore from 'redux-mock-store';

describe('MessageList test', () => {
    it('button test', () => {
        const f = jest.fn();
        const mockStore = configureStore();
        const store = mockStore({profile: {name: 'User'}});
        const component = render(
            <Provider store={store}><MessageList messages={[]} addMessage={f} /></Provider>);
        const button = component.getByText('Отправить');
        fireEvent.click(button);
        expect(f).toBeCalledTimes(1);
    })
})
