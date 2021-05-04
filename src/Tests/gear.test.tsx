import React from 'react';
import {configure, shallow} from 'enzyme';        //Enzyme makes testing react components easier
import Adapter from 'enzyme-adapter-react-16';

//Actual component to be tested
import {GearPage} from "../Components/Gear";
import {
    addArmor,
    addAttachments,
    addMelee,
    addRanged,
    remArmor,
    remAttachments,
    toggleEquip
} from "../redux/actions/gearAction";
import {combineReducers, createStore} from "redux";
import {makeLog} from "../redux/actions/logActions";
import {adjustNuyen} from "../redux/actions/nuyenActions";
import {logReducer} from "../redux/reducers/logReducer";
import {nuyenReducer} from "../redux/reducers/nuyenReducer";
import {gearReducer} from "../redux/reducers/gearReducer";
import {Ranged} from "../models/playerModels";


//Use the filesystem to load the test file
const fs = require('fs');

//Create the adapter for enzyme to work with React 16
configure({adapter: new Adapter()});

let props: any;
let wrapper: any // this needs to be any and cannot be "const" because const does not allow any class component to work
let testLuigi: any // is the character of the test
let instance: any // for the wrapper.instance()
let log: any; // will be used for the log object to pass to log reducer
let date: any; // will be used for the date of the log object
let store: any;  //will be where the reducers methods are dispatched to
let increment: number;
let weapon: Ranged;

// before each test all of this is used and needs to be re-initialized
beforeEach(()=> {
    testLuigi = JSON.parse(fs.readFileSync('src/Tests/TestLuigi.json')); //converts the test Luigi to a json to be used in the test
    weapon = {
        name: "Deadshot",
        acc: "30",
        dam: "100",
        ap: "5",
        mode: "Deadshot special",
        RC: 2,
        ammo: 5000000000000,
        availability: "all the time",
        cost: 100000000000000000000000000,
        skill: "Deadshot accuracy",
        ammoTypes: ["ballistic"],
        subAmmoTypes: ["Regular"],
        currentLoadedAmmoType: "",
        range: {
            default: {
                short: [0, 5],
                medium: [6, 15],
                long: [16, 30],
                extreme: [31, 50]
            }
        },
        category: "machine pistol",
        mounting: "top, barrel, under",
        equippedMount: {
            topAttachment: null,
            underAttachment: null,
            barrelAttachment: null
        }
    };
     props = { // props for the GearPage
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
        setGear: jest.fn(),
        addAttachments: jest.fn(),
        remAttachments: jest.fn()
    };
    increment = 0; // used for the different window prompts questions
    date = new Date();
    store = createStore(
        combineReducers({gearReducer, logReducer, nuyenReducer}) // the reducers of the current function
    );

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
    });
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

/**
 * Will test mountOptions
 */
describe('mountOptions()', ()=> {

    it("will check to see if the is an under attachment ", ()=> {
        let mount = instance.mountOptions("under", weapon);
        mount.map((one: any)=> {
            expect(one.type).toBe("under")
        });
    });

    it("will check if the revolver and shotguns have unwanted mount types", ()=> {
        weapon.category = "shotgun";
        let mount = instance.mountOptions("top", weapon);
        let check = false;
        mount.map((one: any)=> {
            if(one.type.includes("-")) {
                check = true;
            }
        });

        expect(check).toBe(false);
    });

});

describe('addGearRanged()', () => {

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
    });
});


/**
 * Will test equipping gear
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

describe('addMount', ()=> {
    //Arrange
    let attachment = {
        name: "joker",
        effect: 25,
        type: "under",
        cost: 100
    };

    it('will add the attachment', () => {
        store.dispatch(addAttachments(0, attachment));

        //Act
        instance.state = store.getState();
        instance.addMount(attachment, 0);

        //Assert
        expect(instance.state.gearReducer.ranged[0].equippedMount.underAttachment.name).toBe("joker");
    });

});

describe('removeMount', ()=> {

    //Arrange
    let attachment = {
        name: "joker",
        effect: 25,
        type: "top",
        cost: 100
    };

    it('will remove the attachment', () => {
        store.dispatch(remAttachments(0, attachment));

        //Act
        instance.state = store.getState();
        instance.removeMount(attachment, 0);

        //Assert
        expect(instance.state.gearReducer.ranged[0].equippedMount.topAttachment).toBe(null);
    });

});
