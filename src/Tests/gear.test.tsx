import React from 'react';
import {configure, shallow} from 'enzyme';        //Enzyme makes testing react components easier
import Adapter from 'enzyme-adapter-react-16';

//Actual component to be tested
import {GearPage} from "../Components/Gear";
import {addArmor, addMelee, addRanged, remArmor, toggleEquip} from "../redux/actions/gearAction";
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


describe('addPresetArmor()', () => {
    //set up mock dispatch
    const armor = {
        name: "Jacket",
        rating: 20,
        capacity: 1,
        availability: 1,
        cost: 100,
        equiped: true
    };

    let wrapper: any // this needs to be any and cannot be "const" because const does not allow any class component to work
    let testLuigi: any // is the character of the test
    let instance: any // for the wrapper.instance()
    let log: any; // will be used for the log object to pass to log reducer
    let date: any; // will be used for the date of the log object
    let store: any;  //will be where the reducers methods are dispatched to
    let increment: number;
    beforeEach(() => {
        increment = 0; // used for the different window prompts questions
        date = new Date();
        testLuigi = JSON.parse(fs.readFileSync('src/Tests/TestLuigi.json')); //converts the test Luigi to a json to be used in the test
        store = createStore(
            combineReducers({logReducer, nuyenReducer, gearReducer}) // the reducers of the current function
        );
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
            time: date
        };

        wrapper = shallow(<GearPage {...props}/>);
        instance = wrapper.instance();
        wrapper.setState(testLuigi); // set the state of the wrapper to testLuigi
    });

    it('add the Preset Armor', () => {

        //Arrange
        jest.spyOn(window, 'confirm').mockReturnValueOnce(true);


        //Act
        store.dispatch(makeLog(1, "idk", "idk", date));
        store.dispatch(adjustNuyen(-3));
        store.dispatch(addArmor(armor));
        instance.addPresetArmor({value: armor, label: "armor"});
        instance.state = store.getState();

        //Assert
        expect(instance.state.gearReducer.armor[2].name).toBe("Jacket"); // see if the new state is correct
        expect(instance.state.gearReducer.armor.length).toBe(3); // same as above
        expect(instance.state.nuyenReducer).toBe(9997); // same as above
        expect(instance.state.logReducer[0]).toEqual(log); // same as above
    })
});

describe('addPresetMelee()', () => {
    //set up mock dispatch
    const melee = {
        name: "Killer Joke",
        acc: 4,
        reach: 2,
        dam: "14/(15)P",
        ap: -3,
        availability: "10R",
        cost: 1000,
        skill: "Murder"
    };

    let wrapper: any // this needs to be any and cannot be "const" because const does not allow any class component to work
    let testLuigi: any // is the character of the test
    let instance: any // for the wrapper.instance()
    let log: any; // will be used for the log object to pass to log reducer
    let date: any; // will be used for the date of the log object
    let store: any;  //will be where the reducers methods are dispatched to
    let increment: number;
    beforeEach(() => {
        increment = 0; // used for the different window prompts questions
        date = new Date();
        testLuigi = JSON.parse(fs.readFileSync('src/Tests/TestLuigi.json')); //converts the test Luigi to a json to be used in the test
        store = createStore(
            combineReducers({logReducer, nuyenReducer, gearReducer}) // the reducers of the current function
        );
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
            time: date
        };

        wrapper = shallow(<GearPage {...props}/>);
        instance = wrapper.instance();
        wrapper.setState(testLuigi); // set the state of the wrapper to testLuigi
    });

    it('will add the melee', () => {

        //Arrange
        jest.spyOn(window, 'confirm').mockReturnValueOnce(true);

        //Act
        store.dispatch(makeLog(1, 'idk', 'idk', date));
        store.dispatch(adjustNuyen(-3));
        store.dispatch(addMelee(melee))
        instance.state = store.getState();
        instance.addPresetMelee({value: melee, label: "stabby stab stab"});

        //Assert
        expect(instance.state.gearReducer.melee[1].name).toBe("Killer Joke"); // see if the new state is correct
        expect(instance.state.gearReducer.melee.length).toBe(2); // same as above
        expect(instance.state.nuyenReducer).toBe(9997); // same as above
        expect(instance.state.logReducer[0]).toEqual(log); // same as above
    });
});

describe('addGearMelee()', () => {
    //set up mock dispatch
    const melee = {
        name: "Killer Joke",
        acc: 4,
        reach: 2,
        dam: "14/(15)P",
        ap: -3,
        availability: "10R",
        cost: 1000,
        skill: "Murder"
    };

    let wrapper: any // this needs to be any and cannot be "const" because const does not allow any class component to work
    let testLuigi: any // is the character of the test
    let instance: any // for the wrapper.instance()
    let log: any; // will be used for the log object to pass to log reducer
    let date: any; // will be used for the date of the log object
    let store: any;  //will be where the reducers methods are dispatched to
    let increment: number;
    beforeEach(() => {
        increment = 0; // used for the different window prompts questions
        date = new Date();
        testLuigi = JSON.parse(fs.readFileSync('src/Tests/TestLuigi.json')); //converts the test Luigi to a json to be used in the test
        store = createStore(
            combineReducers({logReducer, nuyenReducer, gearReducer}) // the reducers of the current function
        );
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
            time: date
        };

        wrapper = shallow(<GearPage {...props}/>);
        instance = wrapper.instance();
        wrapper.setState(testLuigi); // set the state of the wrapper to testLuigi
    });

    it("will add a melee gear", () => {

        //Arrange
        window.prompt = jest.fn(() => increment++ < 3 ? "Jacket" : "100");

        //Act
        store.dispatch(makeLog(1, 'idk', 'idk', date));
        store.dispatch(adjustNuyen(-3));
        store.dispatch(addMelee(melee));
        instance.state = store.getState();
        instance.addGearMelee({value: melee, label: "stabby stab stab"});

        //Assert
        expect(instance.state.gearReducer.melee[1].name).toBe("Killer Joke"); // see if the new state is correct
        expect(instance.state.gearReducer.melee.length).toBe(2); // same as above
        expect(instance.state.nuyenReducer).toBe(9997); // same as above
        expect(instance.state.logReducer[0]).toEqual(log); // same as above

    })
});

describe('AddGearArmor()', () => {

    //set up mock dispatch
    const armor = {
        name: "Jacket",
        rating: 20,
        capacity: 1,
        availability: 1,
        cost: 100,
        equiped: true
    };

    let wrapper: any // this needs to be any and cannot be "const" because const does not allow any class component to work
    let testLuigi: any // is the character of the test
    let instance: any // for the wrapper.instance()
    let log: any; // will be used for the log object to pass to log reducer
    let date: any; // will be used for the date of the log object
    let store: any;  //will be where the reducers methods are dispatched to
    let increment: number;
    beforeEach(() => {
        increment = 0; // used for the different window prompts questions
        date = new Date();
        testLuigi = JSON.parse(fs.readFileSync('src/Tests/TestLuigi.json')); //converts the test Luigi to a json to be used in the test
        store = createStore(
            combineReducers({logReducer, nuyenReducer, gearReducer}) // the reducers of the current function
        );
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
            time: date
        };

        wrapper = shallow(<GearPage {...props}/>);
        instance = wrapper.instance();
        wrapper.setState(testLuigi); // set the state of the wrapper to testLuigi
    });


    it('Adds gear armor', () => {
        //Arrange
        store.dispatch(makeLog(1, "idk", "idk", date)); //send the object to the redux action to calculate the new state
        store.dispatch(adjustNuyen(-3)) // same as above
        store.dispatch(addArmor(armor)); //same as above
        instance.state = store.getState(); // get the new state from the store after all actions are computed

        window.prompt = jest.fn(() => increment++ === 1 ? "Jacket" : "3") // will gives the following values to the prompt. The prompts asks for numbers after the initial one so change from word to number to parseInt

        //Act
        instance.addGearArmor(); //call the method to be done

        //Assert
        expect(instance.state.gearReducer.armor[2].name).toBe("Jacket"); // see if the new state is correct
        expect(instance.state.gearReducer.armor.length).toBe(3); // same as above
        expect(instance.state.nuyenReducer).toBe(9997); // same as above
        expect(instance.state.logReducer[0]).toEqual(log); // same as above
    });

    it('Adds empty gear armor name', () => {
        //Arrange
        window.alert = jest.fn();
        store.dispatch(makeLog(1, "idk", "idk", date)); //send the object to the reducer to calculate the new state
        store.dispatch(adjustNuyen(-3)) // same as above
        store.dispatch(addArmor(armor)); //same as above
        instance.state = store.getState(); // get the new state from the store after all actions are computed

        window.prompt = jest.fn(() => {
            return ""
        }) // will gives the following values to the prompt. The prompts asks for numbers after the initial one so change from word to number to parseInt

        //Act
        instance.addGearArmor(); //call the method to be done

        //Assert
        expect(window.alert).toHaveBeenCalledWith("Canceled input"); // see if the new state is correct
    });

    it('Remove gear armor', () => {
        //Arrange
        window.prompt = jest.fn(() => {
            return '300'
        });
        store.dispatch(remArmor(1));
        store.dispatch(makeLog(1, "idk", "idk", date));
        store.dispatch(adjustNuyen(-3)) // same as above
        instance.state = store.getState();

        //Act
        instance.removeGear("armor", 1);

        //Assert
        expect(instance.state.gearReducer.armor.length).toEqual(1);
        expect(instance.state.nuyenReducer).toBe(9997);
        expect(instance.state.logReducer[0]).toEqual(log);
    });

    it('Remove melee armor', () => {
        //Arrange
        window.prompt = jest.fn(() => {
            return '300'
        });
        store.dispatch(remArmor(1));
        store.dispatch(makeLog(1, "idk", "idk", date));
        store.dispatch(adjustNuyen(-3)) // same as above
        instance.state = store.getState();

        //Act
        instance.removeGear("melee", 1);

        //Assert
        expect(instance.state.gearReducer.melee.length).toEqual(1);
        expect(instance.state.nuyenReducer).toBe(9997);
        expect(instance.state.logReducer[0]).toEqual(log);
    });

    it('Remove ranged armor', () => {
        //Arrange
        window.prompt = jest.fn(() => {
            return '300'
        });
        store.dispatch(remArmor(1));
        store.dispatch(makeLog(1, "idk", "idk", date));
        store.dispatch(adjustNuyen(-3)) // same as above
        instance.state = store.getState();

        //Act
        instance.removeGear("ranged", 1);

        //Assert
        expect(instance.state.gearReducer.ranged.length).toEqual(1);
        expect(instance.state.nuyenReducer).toBe(9997);
        expect(instance.state.logReducer[0]).toEqual(log);
    });

});

describe('addPresetRanged()', () => {
    //set up mock dispatch
    const weapon = {
        name: "Deadshot",
        acc: "30",
        dam: "100",
        ap: "5",
        mode: "Deadshot special",
        RC: 2,
        eqppiedRc: 0,
        ammo: 5000000000000,
        availability: "all the time",
        cost: 100000000000000000000000000,
        skill: "Deadshot accuracy"
    };

    let wrapper: any // this needs to be any and cannot be "const" because const does not allow any class component to work
    let testLuigi: any // is the character of the test
    let instance: any // for the wrapper.instance()
    let log: any; // will be used for the log object to pass to log reducer
    let date: any; // will be used for the date of the log object
    let store: any;  //will be where the reducers methods are dispatched to
    let increment: number;

    beforeEach(() => {
        increment = 0; // used for the different window prompts questions
        date = new Date();
        testLuigi = JSON.parse(fs.readFileSync('src/Tests/TestLuigi.json')); //converts the test Luigi to a json to be used in the test
        store = createStore(
            combineReducers({logReducer, nuyenReducer, gearReducer}) // the reducers of the current function
        );
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
            time: date
        };

        wrapper = shallow(<GearPage {...props}/>);
        instance = wrapper.instance();
        wrapper.setState(testLuigi); // set the state of the wrapper to testLuigi
    });

    it('will add the weapon', () => {

        //Arrange
        jest.spyOn(window, 'confirm').mockReturnValueOnce(true);

        //Act
        store.dispatch(makeLog(1, 'idk', 'idk', date));
        store.dispatch(adjustNuyen(-3));
        store.dispatch(addRanged(weapon))
        instance.state = store.getState();
        instance.addPresetRanged({value: weapon, label: "shot shot shh shh shot... everybody!!!"});

        //Assert
        expect(instance.state.gearReducer.ranged[1].name).toBe("Deadshot"); // see if the new state is correct
        expect(instance.state.gearReducer.ranged.length).toBe(2); // same as above
        expect(instance.state.nuyenReducer).toBe(9997); // same as above
        expect(instance.state.logReducer[0]).toEqual(log); // same as above
    });
});


describe('addGearRanged()', () => {
    //set up mock dispatch
    const weapon = {
        name: "Deadshot",
        acc: "30",
        dam: "100",
        ap: "5",
        mode: "Deadshot special",
        RC: 2,
        eqppiedRc: 0,
        ammo: 5000000000000,
        availability: "all the time",
        cost: 100000000000000000000000000,
        skill: "Deadshot accuracy"
    };

    let wrapper: any // this needs to be any and cannot be "const" because const does not allow any class component to work
    let testLuigi: any // is the character of the test
    let instance: any // for the wrapper.instance()
    let log: any; // will be used for the log object to pass to log reducer
    let date: any; // will be used for the date of the log object
    let store: any;  //will be where the reducers methods are dispatched to
    let increment: number;
    beforeEach(() => {
        increment = 0; // used for the different window prompts questions
        date = new Date();
        testLuigi = JSON.parse(fs.readFileSync('src/Tests/TestLuigi.json')); //converts the test Luigi to a json to be used in the test
        store = createStore(
            combineReducers({logReducer, nuyenReducer, gearReducer}) // the reducers of the current function
        );
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
            time: date
        };

        wrapper = shallow(<GearPage {...props}/>);
        instance = wrapper.instance();
        wrapper.setState(testLuigi); // set the state of the wrapper to testLuigi
    });

    it("will add a ranged gear", () => {

        //Arrange
        window.prompt = jest.fn(() => increment++ < 3 ? "Deadshot" : "100");

        //Act
        store.dispatch(makeLog(1, 'idk', 'idk', date));
        store.dispatch(adjustNuyen(-3));
        store.dispatch(addRanged(weapon));
        instance.state = store.getState();
        instance.addGearRanged({value: weapon, label: "stabby stab stab"});

        //Assert
        expect(instance.state.gearReducer.ranged[1].name).toBe("Deadshot"); // see if the new state is correct
        expect(instance.state.gearReducer.ranged.length).toBe(2); // same as above
        expect(instance.state.nuyenReducer).toBe(9997); // same as above
        expect(instance.state.logReducer[0]).toEqual(log); // same as above

    })
});


/**
 * Will test equpping gear
 */
describe('equip()', () => {
    //set up mock dispatch
    const armor = {
        name: "Jacket",
        rating: 20,
        capacity: 1,
        availability: 1,
        cost: 100,
        equiped: true
    };

    let wrapper: any // this needs to be any and cannot be "const" because const does not allow any class component to work
    let testLuigi: any // is the character of the test
    let instance: any // for the wrapper.instance()
    let log: any; // will be used for the log object to pass to log reducer
    let date: any; // will be used for the date of the log object
    let store: any;  //will be where the reducers methods are dispatched to
    let increment: number;
    beforeEach(() => {
        increment = 0; // used for the different window prompts questions
        date = new Date();
        testLuigi = JSON.parse(fs.readFileSync('src/Tests/TestLuigi.json')); //converts the test Luigi to a json to be used in the test
        store = createStore(
            combineReducers({gearReducer}) // the reducers of the current function
        );
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
            time: date
        };

        wrapper = shallow(<GearPage {...props}/>);
        instance = wrapper.instance();
        wrapper.setState(testLuigi); // set the state of the wrapper to testLuigi
    });


    it('will equip gear', () => {

        //Arrange
        store.dispatch(toggleEquip(1));
        instance.state = store.getState();
        instance.equip("armor", 2);


        //Act
        instance.state = store.getState();

        //Assert
        expect(instance.state.gearReducer.armor[1].equiped).toBeFalsy();

    })
});