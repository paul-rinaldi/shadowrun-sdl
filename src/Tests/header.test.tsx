// header.test.js
import React from 'react';
import {configure, shallow} from 'enzyme';        //Enzyme makes testing react components easier
import Adapter from 'enzyme-adapter-react-16'

//Actual component to be tested
import App from "../App";
import Header from "../Components/Header";

//Use the filesystem to load the test file
const fs = require('fs');

//Create the adapter for enzyme to work with React 16
configure({adapter: new Adapter()});

describe('Header test', () => {
    let wrapper;

    beforeEach(() => {
        //Arrange
        wrapper = shallow(<App/>); //Shallow render of the App component

        //Load the test character from the file
        const testLuigi = JSON.parse(fs.readFileSync('src/Tests/TestLuigi.json'));
        wrapper.setState(testLuigi);
    });

    it('Check loading the file correctly', () => {
        expect(wrapper.instance().state.attributes.BOD).toBe(2);
    });

});