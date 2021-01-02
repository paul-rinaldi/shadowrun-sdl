// app.test.js
import React from 'react';
import { shallow } from 'enzyme';
import App from "../App";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('Making sure the page renders', () => {
    it('renders without crashing', () => {
        shallow(<App/>);

    });
});
