// gear.test.js
import React from 'react';
import {configure, mount, render, shallow} from 'enzyme';        //Enzyme makes testing react components easier
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
//import renderer from 'react-test-renderer';
//Actual component to be tested
import {GearPage} from "../Components/Gear";
import {addArmor, addRanged, remArmor} from "../redux/actions/gearAction";
import {combineReducers, createStore} from "redux";
import {makeLog} from "../redux/actions/logActions";
import {adjustNuyen} from "../redux/actions/nuyenActions";
import {store} from "../redux/store";
import {logReducer} from "../redux/reducers/logReducer";
import {nuyenReducer} from "../redux/reducers/nuyenReducer";

//Use the filesystem to load the test file
const fs = require('fs');

//Create the adapter for enzyme to work with React 16
configure({adapter: new Adapter()});

//setup mock store
const mockStore = configureStore();

//set up mock dispatch
const armor = {
    name: "name",
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
        combineReducers({logReducer, nuyenReducer, addArmor})
    );

    testLuigi = JSON.parse(fs.readFileSync('src/Tests/TestLuigi.json'));
    window.prompt = jest.fn(() => {
        return "Jacket"
    });

    wrapper = mount(<Provider store={store}>
        <GearPage character={testLuigi}/>
    </Provider>);



it('Add gear', () => {
    //Arrange
    wrapper.setState(testLuigi);
    store.dispatch(makeLog(1, "idk", "idk", new Date()));
    store.dispatch(adjustNuyen(3))
    store.dispatch(addArmor(armor));
    //Act
    // store.dispatch(component.instance().removeGear("armor", 0));
    wrapper.instance().addGearArmor();


    //Assert
    expect(wrapper.instance().state.gear.armor[1].name).toBe("Jacket")
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
})
;


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