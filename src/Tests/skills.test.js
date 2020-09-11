//Karma tests
import React from 'react';
import {configure, shallow} from 'enzyme';        //Enzyme makes testing react components easier
import Adapter from 'enzyme-adapter-react-16'

//Actual component to be tested
import App from "../App";
import Skills from "../Components/Skills";

//Use the filesystem to load the test file
const fs = require('fs');

//Create the adapter for enzyme to work with React 16
configure({adapter: new Adapter()});


describe('App skill adjustment tests', () => {
    let wrapper;

    beforeEach(() => {
        //Arrange
        wrapper = shallow(<App/>); //Shallow render of the App component

        //Load the test character from the file
        const testLuigi = JSON.parse(fs.readFileSync('src/Tests/TestLuigi.json'));
        wrapper.setState(testLuigi);
    });

    it('Increases skill rating', () => {
       //Act
        wrapper.instance().incSkill('combat', 0); //0 -> 1

       //Assert
        expect(wrapper.instance().state.skills.combat[0].rating).toBe(1);
    });

    it('Decreases skill rating', () => {
        //Act
        wrapper.instance().decSkill('combat', 1); //12 -> 11

        //Assert
        expect(wrapper.instance().state.skills.combat[1].rating).toBe(11);
    });

    it("Doesn't allow skills to go above 12", () => {
        //Act
        wrapper.instance().incSkill('combat', 2); //12 -> 12

        //Assert
        expect(wrapper.instance().state.skills.combat[1].rating).toBe(12);
    });

    it("Doesn't allow skills to go below 0", () => {
        //Act
        wrapper.instance().decSkill('combat', 0); //0 -> 0

        //Assert
        expect(wrapper.instance().state.skills.combat[0].rating).toBe(0);
    });
});

describe('Skills skill adjustment tests', () => {
    let wrapper;
    let mockInc;
    let mockDec;
    let mockAdjKarma;

    //Mock the user input functions
    window.confirm = jest.fn(() => true); //Assume user always says OK

    beforeEach(() => {
        //Arrange
        //Create mock functions of what's normally provided by the parent (App)
        mockInc = jest.fn();
        mockDec = jest.fn();
        mockAdjKarma = jest.fn();

        //Load the test character from the file
        const testLuigi = JSON.parse(fs.readFileSync('src/Tests/TestLuigi.json'));
        wrapper = shallow(<Skills character={testLuigi} inc={mockInc} dec={mockDec} adjKarm={mockAdjKarma}/>);
    });

    it('Increases skill rating', () => {
        //Act
        wrapper.instance().incrementSkill('combat', 0); //0 -> 1

        //Assert
        expect(mockInc.mock.calls.length).toBe(1);          //Called once
        expect(mockInc.mock.calls[0][0]).toBe('combat');    //Verify type arg
        expect(mockInc.mock.calls[0][1]).toBe(0);           //Verify index arg

        expect(mockAdjKarma.mock.calls.length).toBe(1);     //Called once
        expect(mockAdjKarma.mock.calls[0][0]).toBe(-2);     //Verify karma cost
    });

    it('Decreases skill rating', () => {
        //Act
        wrapper.instance().decrementSkill('combat', 1); //12 -> 11

        //Assert
        expect(mockDec.mock.calls.length).toBe(1);          //Called once
        expect(mockDec.mock.calls[0][0]).toBe('combat');     //Verify type arg
        expect(mockDec.mock.calls[0][1]).toBe(1);           //Verify index arg

        expect(mockAdjKarma.mock.calls.length).toBe(1);     //Called once
        expect(mockAdjKarma.mock.calls[0][0]).toBe(24);      //Verify karma refund
    });
});
