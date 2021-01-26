import React from 'react';
import { connect } from 'react-redux';
import { ICharacter } from '../models/playerModels';
import { addAmmo } from '../redux/actions/gearAction';
import { IShadowRunState } from '../redux/store';

const mapStateToProps = (state: IShadowRunState) => ({
    character: state.player
});
const mapDispatchToProps = {
    addAmmo
  };
type IInventoryProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

interface IInventoryState {};

class Inventory extends React.Component<IInventoryProps, IInventoryState> {
    constructor(props: IInventoryProps) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <div style={{backgroundColor: '#303336', color: "#FFFFFF", margin: 5, borderRadius: 5}}>
                <h2 style={{content: 'middle'}}>Inventory (Ranged)</h2>
                <hr />
                <table>
                    <thead>
                        <td>Name</td>
                        <td>Ammo</td>
                    </thead>
                    {this.props.character.gear.ranged.map((item, i) => {
                        return (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.ammo}</td>
                                <input type="text" placeholder="Add Ammo" onKeyPress={event => {
                                    if(event.key === "Enter"){
                                        //console.log((event.target as HTMLInputElement).value);
                                        //console.log(typeof((event.target as HTMLInputElement).value));
                                        const ammoAdded = parseInt((event.target as HTMLInputElement).value);
                                        this.props.addAmmo(item, ammoAdded);
                                    }
                                }}/>
                            </tr>
                        );
                    })}
                </table>
            </div>
        );
    }
} 

export default connect(
    mapStateToProps,
    mapDispatchToProps)
(Inventory);