/* 
  Inventory.tsx
  
  This component displays and allows a user to modify/use/equip items.
*/
import React from "react";
import { connect } from "react-redux";
import { CharacterAmmo } from "../models/playerModels";
import { addAmmo } from "../redux/actions/ammoAction";
import { IShadowRunState } from "../redux/store";
import AmmoJSON from "../Ammo.json";
import { adjustNuyen } from "../redux/actions/nuyenActions";

const mapStateToProps = (state: IShadowRunState) => ({
  character: state.player,
});
const mapDispatchToProps = {
  addAmmo,
  adjustNuyen,
};
type IInventoryProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

class Inventory extends React.Component<IInventoryProps> {
  constructor(props: IInventoryProps) {
    super(props);

    this.state = {};
  }

  /**
   * Gets the cost of a type of ammo via looking it up in the ammo registry (json)
   * @param ammoType the highest classification on an ammo
   * @param ammoName the name of the type of ammo
   * @returns a decimal value of the price of the ammo in nuyen
   */
  getAmmoCostFromName(ammoType: string, ammoName: string) {
    const iammo = AmmoJSON.ammo;
    let iAmmoType;
    let ammoCost = 0;

    // based on the ammo type, search the ammo json's correspoding array (throwing, arrows, etc.)
    switch (ammoType) {
      case "throwing":
        iAmmoType = iammo.throwing;
        // iterate through the corresponding array and match the ammo given with the corresponding ammo in the json registry
        for (var i = 0; i < iAmmoType.length; i++) {
          if (ammoName === iAmmoType[i].name) {
            ammoCost = iAmmoType[i].cost;
          }
        }
        break;
      case "arrows":
        iAmmoType = iammo.arrows;
        for (var j = 0; j < iAmmoType.length; j++) {
          if (ammoName === iAmmoType[j].name) {
            ammoCost = iAmmoType[j].cost;
          }
        }
        break;
      case "bolts":
        iAmmoType = iammo.bolts;
        for (var k = 0; k < iAmmoType.length; k++) {
          if (ammoName === iAmmoType[k].name) {
            ammoCost = iAmmoType[k].cost;
          }
        }
        break;
      case "darts":
        iAmmoType = iammo.darts;
        for (var l = 0; l < iAmmoType.length; l++) {
          if (ammoName === iAmmoType[l].name) {
            ammoCost = iAmmoType[l].cost;
          }
        }
        break;
      case "ballistic":
        iAmmoType = iammo.ballistic;
        for (var m = 0; m < iAmmoType.length; m++) {
          if (ammoName === iAmmoType[m].name) {
            ammoCost = iAmmoType[m].cost;
          }
        }
        break;
      case "grenades":
        iAmmoType = iammo.grenades;
        for (var n = 0; n < iAmmoType.length; n++) {
          if (ammoName === iAmmoType[n].name) {
            ammoCost = iAmmoType[n].cost;
          }
        }
        break;
      case "rockets":
        iAmmoType = iammo.rockets;
        for (var p = 0; p < iAmmoType.length; p++) {
          if (ammoName === iAmmoType[p].name) {
            ammoCost = iAmmoType[p].cost;
          }
        }
        break;
      default:
        iAmmoType = iammo.throwing;
        for (var q = 0; q < iAmmoType.length; q++) {
          if (ammoName === iAmmoType[q].name) {
            ammoCost = iAmmoType[q].cost;
          }
        }
        break;
    }
    return ammoCost;
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
                    <td>{item.name + " (" + item.ammoType + ")"}</td>
                    <td style={{ textAlign: "center" }}>{item.amount}</td>
                    <td>
                      <input
                        type="text"
                        placeholder="Add Ammo"
                        onKeyPress={(event) => {
                          if (event.key === "Enter") {
                            const ammoAdded = parseInt(
                              (event.target as HTMLInputElement).value
                            );
                            if (
                              item.ammoType === "ballistic" &&
                              ammoAdded % 10 !== 0
                            ) {
                              alert(
                                "Ammo can only be bought in multiples of 10"
                              );
                            } else {
                              let ammoInfo = this.getAmmoCostFromName(
                                item.ammoType,
                                item.name
                              );
                              // console.log(ammoInfo);
                              if (
                                this.props.character.money +
                                  ammoInfo * ammoAdded >=
                                0
                              ) {
                                this.props.addAmmo(
                                  item,
                                  item.ammoType,
                                  ammoAdded
                                );
                                // console.log(ammoAdded * ammoInfo);
                                this.props.adjustNuyen(ammoAdded * ammoInfo);
                              } else {
                                alert(
                                  "You do not have enough money to buy the specified ammount of ammo."
                                );
                              }
                            }
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
