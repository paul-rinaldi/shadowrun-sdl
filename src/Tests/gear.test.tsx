// gear.test.js
import React from 'react';
import {configure, shallow} from 'enzyme';        //Enzyme makes testing react components easier
import Adapter from 'enzyme-adapter-react-16'

//Actual component to be tested
import GearPage from "../Components/Gear";


//Use the filesystem to load the test file
const fs = require('fs');

//Create the adapter for enzyme to work with React 16
configure({adapter: new Adapter()});


describe('Adding gear from app', () => {
    let wrapper : any // this needs to be any and cannot be "const" because const does not allow any class component to work
    
    it('Add gear', () => {
        //Arrange
        wrapper = shallow(<GearPage/>); //Shallow render of the Gear component

        //Load the test character from the file
        const testLuigi = JSON.parse(fs.readFileSync('src/Tests/TestLuigi.json'));
        wrapper.setState(testLuigi);

        const armor = {
            name: "name",
            rating: 20,
            capacity: 1,
            availability: 1,
            cost: 100,
            equiped: true
        };

        //Act
        wrapper.instance().updateAddGear("armor", armor);

        //Assert
        expect(wrapper.instance().state.gear.armor[2].name).toBe("name")
    });

    it('Remove gear', () => {
        //Arrange
        wrapper = shallow(<GearPage/>); //Shallow render of the App component

        //Load the test character from the file
        const testLuigi = JSON.parse(fs.readFileSync('src/Tests/TestLuigi.json'));
        wrapper.setState(testLuigi);

        //Act
        wrapper.instance().updateRemGear(1, "armor");

        //Assert
        expect(wrapper.instance().state.gear.armor.length).toBe(1)
    });
});

describe('Equip and unequip gear', () => {
    let wrapper: any

    it('Add armor and check armor stat', () => {
        //Arrange
        wrapper = shallow(<GearPage/>); //Shallow render of the App component

        //Load the test character from the file
        const testLuigi = JSON.parse(fs.readFileSync('src/Tests/TestLuigi.json'));
        wrapper.setState(testLuigi);


        //Act
        wrapper.instance().updateUnequipArmor("Actioneer Business Clothes", true, 8, 8, 8, -1500, 0);

        //Assert
        expect(wrapper.instance().state.gear.armor[0].equiped).toBe(false)
    });
});