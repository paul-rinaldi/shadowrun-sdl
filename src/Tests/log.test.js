//Karma tests
import React from 'react';
import {configure, shallow} from 'enzyme';        //Enzyme makes testing react components easier
import Adapter from 'enzyme-adapter-react-16'

//Actual component to be tested
import App from "../App";

//Create the adapter for enzyme to work with React 16
configure({adapter: new Adapter()});


describe('Karma adjustment tests', () => {
    let wrapper;

    beforeEach(() => {
        //Arrange
        wrapper = shallow(<App/>); //Shallow render of the App component
        wrapper.setState({ //Set the App to a known state
            karma: 10,
            log: []
        });
    });

    it('Increases karma', () => {
        //Act
        const result = wrapper.instance().adjustKarma(10, 'Karma increase');

        //Assert
        expect(result).toBe(true);
        expect(wrapper.instance().state.karma).toBe(20);

        const logEntry = wrapper.instance().state.log[0];
        expect(logEntry.adjustment).toBe(10);
        expect(logEntry.reason).toBe('Karma increase');
    });

    it('Decreases karma', () => {
        //Act
        const result = wrapper.instance().adjustKarma(-10, 'Karma decrease');

        //Assert
        expect(result).toBe(true);
        expect(wrapper.instance().state.karma).toBe(0);

        const logEntry = wrapper.instance().state.log[0];
        expect(logEntry.adjustment).toBe(-10);
        expect(logEntry.reason).toBe('Karma decrease');
    });

    it("Doesn't allow overspending karma", () => {
        //Act
        const result = wrapper.instance().adjustKarma(-11, 'Karma overspend');

        //Assert
        expect(result).toBe(false);
        expect(wrapper.instance().state.karma).toBe(10); //Karma should stay the same
        expect(wrapper.instance().state.log.length).toBe(0); //No entry should have been logged
    });

    it('Tracks multiple adjustments in order of most recent', () => {
        //Act
        wrapper.instance().adjustKarma(1, 'Adjustment 1');
        wrapper.instance().adjustKarma(2, 'Adjustment 2');
        wrapper.instance().adjustKarma(3, 'Adjustment 3');

        //Assert
        const numEntries = wrapper.instance().state.log.length;
        expect(numEntries).toBe(3);

        //Check the list is in reverse order of when adjustments occurred
        //i.e. most recent entries are at the front of the list
        for(let i = 0; i < 3; i++){
            const entry = wrapper.instance().state.log[i];
            expect(entry.adjustment).toBe(numEntries - i);
            expect(entry.reason).toBe(`Adjustment ${numEntries - i}`);
        }
    });

});

describe('Nuyen adjustment tests', () => {
    let wrapper;

    beforeEach(() => {
        //Arrange
        wrapper = shallow(<App/>); //Shallow render of the App component
        wrapper.setState({ //Set the App to a known state
            money: 100,
            log: []
        });
    });

    it('Increases Nuyen', () => {
        //Act
        const result = wrapper.instance().adjustNuyen(10, 'Nuyen increase');

        //Assert
        expect(result).toBe(true);
        expect(wrapper.instance().state.money).toBe(110);

        const logEntry = wrapper.instance().state.log[0];
        expect(logEntry.adjustment).toBe(10);
        expect(logEntry.reason).toBe('Nuyen increase');
    });

    it('Decreases Nuyen', () => {
        //Act
        const result = wrapper.instance().adjustNuyen(-10, 'Nuyen decrease');

        //Assert
        expect(result).toBe(true);
        expect(wrapper.instance().state.money).toBe(90);

        const logEntry = wrapper.instance().state.log[0];
        expect(logEntry.adjustment).toBe(-10);
        expect(logEntry.reason).toBe('Nuyen decrease');
    });

    it("Doesn't allow overspending nuyen", () => {
        //Act
        const result = wrapper.instance().adjustNuyen(-101, 'Nuyen overspend');

        //Assert
        expect(result).toBe(false);
        expect(wrapper.instance().state.money).toBe(100);    //Nuyen should stay the same
        expect(wrapper.instance().state.log.length).toBe(0); //No entry should have been logged
    });

    it('Tracks multiple adjustments in order of most recent', () => {
        //Act
        wrapper.instance().adjustNuyen(1, 'Adjustment 1');
        wrapper.instance().adjustNuyen(2, 'Adjustment 2');
        wrapper.instance().adjustNuyen(3, 'Adjustment 3');

        //Assert
        const numEntries = wrapper.instance().state.log.length;
        expect(numEntries).toBe(3);

        //Check the list is in reverse order of when adjustments occurred
        //i.e. most recent entries are at the front of the list
        for(let i = 0; i < 3; i++){
            const entry = wrapper.instance().state.log[i];
            expect(entry.adjustment).toBe(numEntries - i);
            expect(entry.reason).toBe(`Adjustment ${numEntries - i}`);
        }
    });

});