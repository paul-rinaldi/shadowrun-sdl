// qualities.test.js
import React from 'react';
import {configure, shallow} from 'enzyme';        //Enzyme makes testing react components easier
import Adapter from 'enzyme-adapter-react-16'

//Actual component to be tested
import App from "../App";
import Qualities from "../Components/Qualities.js";

//Use the filesystem to load the test file
const fs = require('fs');

//Create the adapter for enzyme to work with React 16
configure({adapter: new Adapter()});

describe('Add quality', () => {
    let wrapper;

    it('Add Quality', () => {
        //Arrange
        wrapper = shallow(<App/>); //Shallow render of the App component

        //Load the test character from the file
        const testLuigi = JSON.parse(fs.readFileSync('src/Tests/TestLuigi.json'));
        wrapper.setState(testLuigi);

        //Act
        wrapper.instance().adjustQualities("qName", -1, 1, 10, "notes", "positive");

        //Assert
        expect(wrapper.instance().state.qualities.positive[2].qName).toBe("qName");
    });

    it('Remove Quality', () => {
        //Arrange
        wrapper = shallow(<App/>); //Shallow render of the App component

        //Load the test character from the file
        const testLuigi = JSON.parse(fs.readFileSync('src/Tests/TestLuigi.json'));
        wrapper.setState(testLuigi);

        //Act
        wrapper.instance().removeQualities("positive", 0);

        //Assert
        expect(wrapper.instance().state.qualities.positive.length).toBe(1);
    });

});

describe('Qualities rating test', () => {
    let wrapper;

    it('Add Rating', () => {
        const testLuigi = JSON.parse(fs.readFileSync('src/Tests/TestLuigi.json'));
        let mockRem = jest.fn();
        let mockAdd = jest.fn();
        let mockAdjKarma = jest.fn(() => true);

        window.confirm = jest.fn(() => true)
        window.prompt = jest.fn(() => true)
        window.alert = jest.fn(() => true)

        wrapper = shallow(<Qualities character={testLuigi} adjKarm={mockAdjKarma} adjQuality={mockAdd} remQuality={mockRem}/>);

        //Act
        wrapper.instance().addRating('positive', 1);

        //Assert
        expect(testLuigi.qualities.positive[1].rating).toBe(2);
    });

    it('Remove Rating', () => {
        const testLuigi = JSON.parse(fs.readFileSync('src/Tests/TestLuigi.json'));
        let mockRem = jest.fn();
        let mockAdd = jest.fn();
        let mockAdjKarma = jest.fn(() => true);

        window.confirm = jest.fn(() => true)
        window.prompt = jest.fn(() => true)
        window.alert = jest.fn(() => true)

        wrapper = shallow(<Qualities character={testLuigi} adjKarm={mockAdjKarma} adjQuality={mockAdd} remQuality={mockRem}/>);

        //Act
        wrapper.instance().addRating('positive', 1);
        wrapper.instance().removeRating('positive', 1);

        //Assert
        expect(testLuigi.qualities.positive[1].rating).toBe(1);
    });

});