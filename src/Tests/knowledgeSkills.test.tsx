//Karma tests
import React from 'react';
import {configure, shallow} from 'enzyme';        //Enzyme makes testing react components easier
import Adapter from 'enzyme-adapter-react-16'

//Actual component to be tested
import App from "../App";
import KnowledgeSkills from "../Components/KnowledgeSkills";

//Use the filesystem to load the test file
const fs = require('fs');

//Create the adapter for enzyme to work with React 16
configure({adapter: new Adapter()});


describe('App knowledge skill adjustment tests', () => {
    let wrapper;

    beforeEach(() => {
        //Arrange
        wrapper = shallow(<App/>); //Shallow render of the App component

        //Load the test character from the file
        const testLuigi = JSON.parse(fs.readFileSync('src/Tests/TestLuigi.json'));
        wrapper.setState(testLuigi);
    });

    it('Increases knowledge skill rating', () => {
        //Act
        wrapper.instance().updateKnowledgeSkill('street', 0, 1); //3 -> 4

        //Assert
        expect(wrapper.instance().state.knowledgeSkills.street[0].rating).toBe(4);
    });

    it('Decreases knowledge skill rating', () => {
        //Act
        wrapper.instance().updateKnowledgeSkill('street', 0, -1); //3 -> 2

        //Assert
        expect(wrapper.instance().state.knowledgeSkills.street[0].rating).toBe(2);
    });
});

describe('KnowledgeSkills skill adjustment tests', () => {
    let wrapper;
    let mockUpdate;
    let mockAdd;
    let mockAdjKarma;

    //Mock the user input functions
    window.confirm = jest.fn(() => true); //Assume user always says OK

    beforeEach(() => {
        //Arrange
        //Create mock functions of what's normally provided by the parent (App)
        mockUpdate = jest.fn();
        mockAdd = jest.fn();
        mockAdjKarma = jest.fn();

        //Load the test character from the file
        const testLuigi = JSON.parse(fs.readFileSync('src/Tests/TestLuigi.json'));
        wrapper = shallow(<KnowledgeSkills character={testLuigi} updateKnowledgeSkill={mockUpdate} adjKarm={mockAdjKarma} addSkill={mockAdd}/>);
    });

    it('Increases skill rating', () => {
        //Act
        wrapper.instance().incrementSkill('street', 0); //3 -> 4

        //Assert
        expect(mockUpdate.mock.calls.length).toBe(1);          //Called once
        expect(mockUpdate.mock.calls[0][0]).toBe('street');    //Verify type arg
        expect(mockUpdate.mock.calls[0][1]).toBe(0);           //Verify index arg
        expect(mockUpdate.mock.calls[0][2]).toBe(1);           //Verify adjustment arg

        expect(mockAdjKarma.mock.calls.length).toBe(1);     //Called once
        expect(mockAdjKarma.mock.calls[0][0]).toBe(-4);     //Verify karma cost
    });

    it('Decreases skill rating', () => {
        //Act
        wrapper.instance().decrementSkill('street', 0); //3 -> 2

        //Assert
        expect(mockUpdate.mock.calls.length).toBe(1);          //Called once
        expect(mockUpdate.mock.calls[0][0]).toBe('street');    //Verify type arg
        expect(mockUpdate.mock.calls[0][1]).toBe(0);           //Verify index arg
        expect(mockUpdate.mock.calls[0][2]).toBe(-1);           //Verify adjustment arg

        expect(mockAdjKarma.mock.calls.length).toBe(1);     //Called once
        expect(mockAdjKarma.mock.calls[0][0]).toBe(3);     //Verify karma cost
    });

    it('Adds skill with specialization', () => {
        //Arrange (mock user inputs)
        const promptMock = jest.fn();
        promptMock.mockReturnValueOnce('Test skill');
        promptMock.mockReturnValueOnce('Test specialization');
        window.prompt = promptMock;

        //Act
        wrapper.instance().addSkill('street', 'Int');

        //Assert
        expect(mockAdd.mock.calls.length).toBe(1);
        expect(mockAdd.mock.calls[0][0]).toBe('street');
        expect(mockAdd.mock.calls[0][1]).toBe('Int');
        expect(mockAdd.mock.calls[0][2]).toBe('Test skill');
        expect(mockAdd.mock.calls[0][3]).toBe('Test specialization');

        expect(mockAdjKarma.mock.calls.length).toBe(2);    //Called twice
        expect(mockAdjKarma.mock.calls[0][0]).toBe(-1);    //Verify karma cost of adding skill
        expect(mockAdjKarma.mock.calls[1][0]).toBe(-7);    //Verify karma cost of adding skill
    });

    it('Adds skill without specialization', () => {
        //Arrange (mock user inputs)
        const promptMock = jest.fn();
        promptMock.mockReturnValueOnce('Test skill');
        promptMock.mockReturnValueOnce(''); //No specialization
        window.prompt = promptMock;

        //Act
        wrapper.instance().addSkill('street', 'Int');

        //Assert
        expect(mockAdd.mock.calls.length).toBe(1);
        expect(mockAdd.mock.calls[0][0]).toBe('street');
        expect(mockAdd.mock.calls[0][1]).toBe('Int');
        expect(mockAdd.mock.calls[0][2]).toBe('Test skill');
        expect(mockAdd.mock.calls[0][3]).toBe('');

        expect(mockAdjKarma.mock.calls.length).toBe(1);    //Called once
        expect(mockAdjKarma.mock.calls[0][0]).toBe(-1);    //Verify karma cost of adding skill
    });
});
