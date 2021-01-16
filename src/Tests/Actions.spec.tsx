import React from 'react';
import {shallow} from 'enzyme';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ICharacter } from '../models/playerModels';
import Action from '../Components/Action';

describe.only('Actions Component', () => {
    let character = {

    } as ICharacter;

    beforeEach(() => {

    });

    const createComponent = (
            props: any = { character },
            state: any = {
                testVariables: null, testValues: null, firingModes: null,
                mentalLimit: null, physicalLimit: null, socialLimit: null
            }
        ) => {
        const wrapper = shallow(<Action />);
        wrapper.setState(state);
        wrapper.setProps(props);
        return wrapper;
    }

    it('Renders multiple tabs', () => {
        const actionsComponent = createComponent();
    })
});