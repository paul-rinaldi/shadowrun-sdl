import React from 'react';
import {configure,shallow} from 'enzyme';        //Enzyme makes testing react components easier
import Adapter from 'enzyme-adapter-react-16';

//Actual component to be tested
import {GearPage} from "../Components/Gear";
import {addArmor, addRanged, remArmor} from "../redux/actions/gearAction";
import {combineReducers, createStore} from "redux";
import {makeLog} from "../redux/actions/logActions";
import {adjustNuyen} from "../redux/actions/nuyenActions";
import {logReducer} from "../redux/reducers/logReducer";
import {nuyenReducer} from "../redux/reducers/nuyenReducer";
import {gearReducer} from "../redux/reducers/gearReducer";


//Use the filesystem to load the test file
const fs = require('fs');

//Create the adapter for enzyme to work with React 16
configure({adapter: new Adapter()});

//set up mock dispatch
const armor = {
    name: "Jacket",
    rating: 20,
    capacity: 1,
    availability: 1,
    cost: 100,
    equiped: true
};


describe('Adding gear from app', () => {

    let wrapper: any // this needs to be any and cannot be "const" because const does not allow any class component to work
    let testLuigi: any // is the character of the test
    let instance: any // for the wrapper.instance()
    let log: any; // will be used for the log object to pass to log reducer
    let date: any; // will be used for the date of the log object

    let store = createStore(
        combineReducers({logReducer, nuyenReducer, gearReducer}) // the reducers of the current function
    );

    testLuigi = JSON.parse(fs.readFileSync('src/Tests/TestLuigi.json')); //converts the test Luigi to a json to be used in the test

    beforeEach(()=> {
        date = new Date();

        let props = { // props for the GearPage
            character: testLuigi,
            makeLog: jest.fn(),
            addArmor: jest.fn(),
            adjustNuyen: jest.fn(),
            addRanged: jest.fn(),
            addMelee: jest.fn(),
            remArmor: jest.fn(),
            remMelee: jest.fn(),
            remRanged: jest.fn(),
            toggleEquip: jest.fn(),
            setGear: jest.fn()
        };

        log = {
            adjustment: 1,
            reason: "idk",
            reasonType: "idk",
            time: new Date()
        };

        wrapper = shallow(<GearPage {...props}/>);
        instance = wrapper.instance();
        wrapper.setState(testLuigi); // set the state of the wrapper to testLuigi
    });


    it('Adds gear armor', () => {
        //Arrange
        let increment = 0; // used for the different window prompts of addGearArmor() method
        store.dispatch(makeLog(1, "idk", "idk", date)); //send the object to the reducer to calculate the new state
        store.dispatch(adjustNuyen(-3)) // same as above
        store.dispatch(addArmor(armor)); //same as above
        instance.state = store.getState(); // get the new state from the store after all actions are computed

        window.prompt = jest.fn(()=> increment++ === 1? "Jacket": "3") // will gives the following values to the prompt. The prompts asks for numbers after the initial one so change from word to number to parseInt

        //Act
        instance.addGearArmor(); //call the method to be done

        //Assert
        expect(instance.state.gearReducer.armor[2].name).toBe("Jacket"); // see if the new state is correct
        expect(instance.state.gearReducer.armor.length).toBe(3); // same as above
        expect(instance.state.nuyenReducer).toBe(9997); // same as above
        expect(instance.state.logReducer[0]).toEqual(log); // same as above
    });
//
// it('Remove gear', () => {
//     //Arrange
//     const testLuigi = JSON.parse(fs.readFileSync('src/Tests/TestLuigi.json'));
//
//     // wrapper = shallow(<GearPage character={testLuigi} adjustNuyen={mockAdjustNuyen} makeLog={mockMakeLog} remArmor={remArmor}/>); //Shallow render of the App component
//     window.prompt = jest.fn(() => {
//         return '2'
//     });
//     //Load the test character from the file
//
//     //wrapper.setState(testLuigi);
//
//     //Act
//     wrapper.instance().removeGear("armor", 1);
//
//     //Assert
//     expect(wrapper.instance().state.gear.armor.length).toBe(1)
// });
});


// describe('Equip and unequip gear', () => {
//     let wrapper: any
//
//     it('Add armor and check armor stat', () => {
//         //Arrange
//         wrapper = shallow(<GearPage/>); //Shallow render of the App component
//
//         //Load the test character from the file
//         const testLuigi = JSON.parse(fs.readFileSync('src/Tests/TestLuigi.json'));
//         wrapper.setState(testLuigi);
//
//
//         //Act
//         wrapper.instance().updateUnequipArmor("Actioneer Business Clothes", true, 8, 8, 8, -1500, 0);
//
//         //Assert
//         expect(wrapper.instance().state.gear.armor[0].equiped).toBe(false)
//     });
// });