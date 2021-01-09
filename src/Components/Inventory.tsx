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
          <div>
              <table>
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