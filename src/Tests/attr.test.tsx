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
            attributes: {
                BOD: 2,
                AGI: 2,
                REA: 2,
                STR: 2,
                WIL: 2,
                LOG: 2,
                INT: 2,
                CHA: 3,
                EDG: 5,
                ESS: 3.0,
                MAG: 3,
                RES: 3
            }
        });
    });

    it('Increases Attrs', () => {
        //Act
        const result = wrapper.instance().updateAtt("BOD", 1, 1, 6);

        //Assert
        expect(wrapper.instance().state.attributes.BOD).toBe(3);
    });

    it('Decreases att', () => {
        //Act
        const result = wrapper.instance().updateAtt("BOD", -1, 1, 6);

        //Assert
        expect(wrapper.instance().state.attributes.BOD).toBe(1);
    });

    it("Doesn't allow overspending karma", () => {
        //Act
        wrapper.instance().updateAtt("BOD", 1, 1, 6);
        wrapper.instance().updateAtt("BOD", 1, 1, 6);
        wrapper.instance().updateAtt("BOD", 1, 1, 6);
        wrapper.instance().updateAtt("BOD", 1, 1, 6);
        const result = wrapper.instance().updateAtt("BOD", 1, 1, 6);

        //Assert
        expect(wrapper.instance().state.attributes.BOD).toBe(6);
    });
});