import React from "react";
import { Ammo, CharacterAmmo } from "../../models/playerModels";
import Select, { ValueType } from "react-select";

interface IAmmoDropdownOption {
  ammo: CharacterAmmo;
  label: string;
}

interface IDropdownState {}

interface IDropdownProps {
  ammoTypes: string[];
  subAmmoTypes: string[];
  ammo: Ammo;
  setAmmoSelected: Function;
}

class Dropdown extends React.Component<IDropdownProps, IDropdownState> {
  render() {
    let options: IAmmoDropdownOption[];

    options = [];

    this.props.ammoTypes.forEach((ammoType) => {
      let toPush: CharacterAmmo[];
      toPush = [];

      switch (ammoType) {
        case "throwing":
          toPush = this.props.ammo.throwing;
          break;
        case "arrows":
          toPush = this.props.ammo.arrows;
          break;
        case "bolts":
          toPush = this.props.ammo.bolts;
          break;
        case "darts":
          toPush = this.props.ammo.darts;
          break;
        case "ballistic":
          toPush = this.props.ammo.ballistic;
          break;
        case "grenades":
          toPush = this.props.ammo.grenades;
          break;
        case "rockets":
          toPush = this.props.ammo.rockets;
          break;
        default:
          toPush = this.props.ammo.throwing;
          break;
      }

      toPush.forEach((ammo: CharacterAmmo) => {
        //if (this.props.subAmmoTypes.includes(ammo.name)) {
          options.push({
            ammo: ammo,
            label: `${ammo.name} Ammo: ${ammo.amount} ammo left`,
          });
        //}
      });
    });

    return (
      <div className={"Action"} id={"ammoSelector"}>
        <h3
          style={{
            display: "block",
          }}
        >
          Ammo Selection
        </h3>
        <Select
          options={options}
          onChange={(ammoSelectedValue: ValueType<IAmmoDropdownOption>) =>
            this.props.setAmmoSelected(
              (ammoSelectedValue as IAmmoDropdownOption).ammo as CharacterAmmo
            )
          }
        />
      </div>
    );
  }
}

export default Dropdown;
