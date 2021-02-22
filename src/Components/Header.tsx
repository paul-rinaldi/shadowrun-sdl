import React from "react";
import { connect } from "react-redux";
import "../CSS_Files/Header.css";
import { ICharacter } from "../models/playerModels";
import { IShadowRunState } from "../redux/store";
import { Button } from "react-bootstrap";
import BackPack from "../assets/icons8-school-backpack-48.png";
import Inventory from "./Inventory";
import Modal from "react-bootstrap/Modal";

type IHeaderProps = ReturnType<typeof mapStateToProps>;
const mapStateToProps = (state: IShadowRunState) => ({
  character: state.player,
});

interface IHeaderState {
  inventoryOpened: boolean;
}

class Header extends React.Component<IHeaderProps, IHeaderState> {
  constructor(props: IHeaderProps) {
    super(props);
    this.state = {
      inventoryOpened: false,
    };
  }

  openInventory() {
    this.setState({ inventoryOpened: true });
  }

  closeInventory() {
    this.setState({ inventoryOpened: false });
  }

  /**
   * Will not render the header if there is not a character to prevent
   * the usage of a state in app.js
   */
  render() {
    const { character } = this.props;

    if (character === null || character === undefined) {
      return <div>{this.unfilledHeader()}</div>;
    } else {
      if (character.gear === undefined) {
        return <div>{this.unfilledHeader()}</div>;
      } else {
        return <div>{this.header(character)}</div>;
      }
    }
  }

  /**
   * Creates a blank header to show when there is not a character uploaded
   */
  unfilledHeader() {
    return (
      <div className="headerdiv">
        <table className="headertable">
          <tbody>
            <tr className="headertr">
              <td>Header not fully loaded, please load character</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  /**
   * Generates the header and all of the needed information
   */
  header(character: ICharacter) {
    //console.log('header::char', character);

    let armor: number = this.calcTotalArmorVal(character);

    let index = 0;
    return (
      <div className="headerdiv">
        <table className="headertable">
          <tbody>
            <tr className="headertr" key={index++}>
              <th className="headertdatt" colSpan={12}>
                {character.name} the {character.metatype}
              </th>
              <th className="headertd" colSpan={2}>
                Condition:
              </th>
              <th className="headertd">
                Init: {character.attributes.REA + character.attributes.INT}+
                {character.initiative.initDice}d6
              </th>
              <th className="headertd">Karma: {character.karma}</th>
            </tr>
            <tr className="headertr" key={index++}>
              <td className="headertdatt">BOD:{character.attributes.BOD}</td>
              <td className="headertdatt">AGI:{character.attributes.AGI}</td>
              <td className="headertdatt">REA:{character.attributes.REA}</td>
              <td className="headertdatt">STR:{character.attributes.STR}</td>
              <td className="headertdatt">WIL:{character.attributes.WIL}</td>
              <td className="headertdatt">LOG:{character.attributes.LOG}</td>
              <td className="headertdatt">INT:{character.attributes.INT}</td>
              <td className="headertdatt">CHA:{character.attributes.CHA}</td>
              <td className="headertdatt">MAG:{character.attributes.MAG}</td>
              <td className="headertdatt">RES:{character.attributes.RES}</td>
              <td className="headertdatt">
                EDG:{character.currentEdge}/{character.attributes.EDG}
              </td>
              <td className="headertdatt">ESS:{character.attributes.ESS}</td>
              <td className="headertd">
                Physical: 0/12({character.conditionMonitor.physical})
              </td>
              <td className="headertd">
                Stun: 0/8({character.conditionMonitor.stun})
              </td>
              <td className="headertd">Armor: {armor}</td>
              <td className="headertd">¥: {character.money}</td>
            </tr>
          </tbody>
        </table>

        <table>
          <tr className="headerdiv" key={index++}>
            <Button
              className="btn bg-transparent"
              style={{
                outline: "none !important",
                outlineOffset: "none !important",
              }}
            >
              <img
                src={BackPack}
                alt="open backpack"
                onClick={(e) =>
                  this.state.inventoryOpened
                    ? this.closeInventory()
                    : this.openInventory()
                }
              />
            </Button>
          </tr>
        </table>
        <Modal
          show={this.state.inventoryOpened}
          onHide={() => this.closeInventory()}
          aria-labelledby="inventory modal"
        >
          <div style={{ backgroundColor: "#303336" }} key={"inventory"}>
            <Inventory />
          </div>
        </Modal>
      </div>
    );
  }

  /**
   * Updates the armor value as it is changed by gear.js as this is the
   * only location where the current armor value is shown
   */
  calcTotalArmorVal(character: ICharacter) {
    let armor = character.armor;

    let gearListArmor = character.gear.armor;

    for (let i = 0; i < gearListArmor.length; i++) {
      if (gearListArmor[i].equiped) {
        let rating = gearListArmor[i].rating;
        if (typeof rating === "string") {
          if (rating.includes("+")) {
            armor = armor + parseInt(rating);
          } else if (Number.parseInt(rating) > armor) {
            armor = parseInt(rating);
          }
        } else if (rating > armor) {
          armor = rating;
        }
      }
    }
    return armor;
  }
}

export default connect(mapStateToProps)(Header);
