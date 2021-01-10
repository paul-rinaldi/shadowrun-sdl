import React from 'react';
import { ICharacter } from '../models/playerModels';

interface IInventoryProps {
    character: ICharacter
};
interface IInventoryState {};

class Inventory extends React.Component<IInventoryProps, IInventoryState> {
    constructor(props: IInventoryProps) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <div style={{backgroundColor: '#303336', color: "#FFFFFF", margin: 5, borderRadius: 5}}>
                <h2 style={{content: 'middle'}}>Inventory</h2>
                <hr />
                <table>
                    <thead>
                        <td>Name</td>
                        <td>Ammo</td>
                    </thead>
                    {this.props.character.gear.ranged.map((item) => {
                        return (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.ammo}</td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        );
    }
} 

export default Inventory;