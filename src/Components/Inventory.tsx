import React from "react";
import { connect } from "react-redux";
import {
  ICharacter,
  Ammo,
  RangedAmmo,
  CharacterAmmo,
} from "../models/playerModels";
import { addAmmo } from "../redux/actions/ammoAction";
import { IShadowRunState } from "../redux/store";
import AmmoJSON from "../Ammo.json";

const mapStateToProps = (state: IShadowRunState) => ({
  character: state.player,
});
const mapDispatchToProps = {
  addAmmo,
};
type IInventoryProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

class Inventory extends React.Component<IInventoryProps> {
  constructor(props: IInventoryProps) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: "#303336",
          color: "#FFFFFF",
          marginLeft: 15,
          marginTop: 15,
          marginBottom: 15,
          borderRadius: 5,
          borderColor: "#303336",
        }}
      >
        <h2 style={{ marginLeft: 15, content: "middle" }}>Inventory (Ammo)</h2>
        <hr />
        <table style={{ marginLeft: 15 }}>
          <tr>
            <td>Name</td>
            <td>Ammo</td>
          </tr>
          {Object.values(this.props.character.ammo).map(
            (category: CharacterAmmo[]) => {
              return category.map((item: CharacterAmmo) => {
                return (
                  <tr>
                    <td>{item.name}</td>
                    <td style={{ textAlign: "center" }}>{item.amount}</td>
                    <td>
                      <input
                        type="text"
                        placeholder="Add Ammo"
                        onKeyPress={(event) => {
                          if (event.key === "Enter") {
                            //console.log((event.target as HTMLInputElement).value);
                            //console.log(typeof((event.target as HTMLInputElement).value));
                            const ammoAdded = parseInt(
                              (event.target as HTMLInputElement).value
                            );
                            this.props.addAmmo(item, item.ammoType, ammoAdded);
                          }
                        }}
                      />
                    </td>
                  </tr>
                );
              });
            }
          )}
        </table>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
