import {render} from "@testing-library/react";
import {Home} from "../index";
import {BrowserRouter} from "react-router-dom";

describe('Home component test', () => {
    it('snapshot test signup', () => {
        const signComponent = render(
            <BrowserRouter><Home onSignUp={() => null}/></BrowserRouter>);
        expect(signComponent).toMatchSnapshot();
    });
    it('snapshot test login', () => {
        const loginComponent = render(<BrowserRouter><Home onLogin={() => null}/></BrowserRouter>);
        expect(loginComponent).toMatchSnapshot();
    })
})
