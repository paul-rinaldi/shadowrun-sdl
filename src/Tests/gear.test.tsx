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
    let testLuigi: any
    let store = createStore(
        combineReducers({logReducer, nuyenReducer, gearReducer})
    );

    testLuigi = JSON.parse(fs.readFileSync('src/Tests/TestLuigi.json'));

    let mockLog = jest.fn();
    let mockNuyen = jest.fn();
    let mockAddArmor = jest.fn();

    wrapper = shallow(<GearPage store={store} character={testLuigi} makeLog={mockLog} adjustNuyen={mockNuyen}
                                addArmor={mockAddArmor}/>);
    wrapper.makeLog = jest.fn(()=> {
        console.log("did this work?");
    })
    let instance = wrapper.instance();
    wrapper.setState(testLuigi);
    //let date: any;
    let log: any;
   // wrapper.instance().addGearArmor = jest.fn(() => {
        let date = new Date();
        log = {
            adjustment: 1, reason: "idk", reasonType: "idk", time: new Date()
        };
        store.dispatch(makeLog(1, "idk", "idk", date));
        store.dispatch(adjustNuyen(3))
        store.dispatch(addArmor(armor));
        instance.state = store.getState();
   // });

    it('Adds gear armor', () => {
        //Arrange
        let increment = 0; // used for the different window prompts
        window.prompt = jest.fn(()=> increment++ === 1? "Jacket": "3")

        //Act
        instance.addGearArmor();

        //Assert
        expect(instance.state.gearReducer.armor[2].name).toBe("Jacket");
        expect(instance.state.gearReducer.armor.length).toBe(3);
        expect(instance.state.nuyenReducer).toBe(10003);
        expect(instance.state.logReducer[0]).toEqual(log);
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