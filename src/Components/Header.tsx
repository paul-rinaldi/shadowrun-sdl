import React from 'react';
import { connect } from 'react-redux';
import '../CSS_Files/Header.css';
import { ICharacter } from '../models/playerModels';
import { IShadowRunState } from '../redux/store';


type IHeaderProps = ReturnType<typeof mapStateToProps>;
const mapStateToProps = (state: IShadowRunState) => ({
    character: state.player
});

class Header extends React.Component<IHeaderProps> {
    /**
     * Will not render the header if there is not a character to prevent 
     * the usage of a state in app.js
     */
    render() {
        const { character } = this.props;

        if (character === null || character === undefined) {
            return (
                <div>
                    {this.unfilledHeader()}
                </div>
            )
        } else {
            if (character.gear === undefined) {
                return (
                    <div>
                        {this.unfilledHeader()}
                    </div>
                )
            } else {
                return(
                    <div>
                        {this.header(character)}
                    </div>
                );
            }
        }
    }

    /**
     * Creates a blank header to show when there is not a character uploaded
     */
    unfilledHeader(){
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
    header(character: ICharacter){
      console.log('header::char', character);
      
      let armor: number = this.calcTotalArmorVal(character);


      //use these console logs to test that everything is loaded

      // console.log(character.name + " the " + character.metatype);
      // console.log("Init:  " + character.attributes.REA + character.attributes.INT + "+" + character.initiative.initDice + "d6");
      // console.log("Karma:  ", character.karma);
      // console.log("BOD: " + character.attributes.BOD);
      // console.log("AGI: " + character.attributes.AGI);
      // console.log("REA: " + character.attributes.REA);
      // console.log("STR: " + character.attributes.STR);
      // console.log("WIL: " + character.attributes.WIL);
      // console.log("LOG: " + character.attributes.LOG);
      // console.log("INT: " + character.attributes.INT);
      // console.log("CHA: " + character.attributes.CHA);
      // console.log("MAG: " + character.attributes.MAG);
      // console.log("RES: " + character.attributes.RES);
      // console.log("EDG: " + character.currentEdge + " / " + character.attributes.EDG + " = " + (character.currentEdge/character.attributes.EDG));
      // console.log("ESS: " + character.attributes.ESS);
      // console.log("Physical: 0/12( " + character.conditionMonitor.physical + ")");
      // console.log("Stun: 0/8( " + character.conditionMonitor.stun + ")");
      // console.log("Armor: " + armor);
      // console.log("¥:  " + character.money);

      let index = 0;
      return (
          <div className="headerdiv">
              <table className="headertable">
                  <tbody>
                  <tr className="headertr" key={index++}>
                      <th className="headertdatt" colSpan = {12}>
                          {character.name} the {character.metatype}
                      </th>
                      <th className="headertd" colSpan={2}>
                          Condition:
                      </th>
                      <th className="headertd">
                          Init: {character.attributes.REA + character.attributes.INT}+{character.initiative.initDice}d6
                      </th>
                      <th className="headertd">
                          Karma: {character.karma}
                      </th>
                  </tr>
                  <tr className="headertr" key={index++}>
                      <td className="headertdatt">
                          BOD:{character.attributes.BOD}
                      </td>
                      <td className="headertdatt">
                          AGI:{character.attributes.AGI}
                      </td>
                      <td className="headertdatt">
                          REA:{character.attributes.REA}
                      </td>
                      <td className="headertdatt">
                          STR:{character.attributes.STR}
                      </td>
                      <td className="headertdatt">
                          WIL:{character.attributes.WIL}
                      </td>
                      <td className="headertdatt">
                          LOG:{character.attributes.LOG}
                      </td>
                      <td className="headertdatt">
                          INT:{character.attributes.INT}
                      </td>
                      <td className="headertdatt">
                          CHA:{character.attributes.CHA}
                      </td>
                      <td className="headertdatt">
                          MAG:{character.attributes.MAG}
                      </td>
                      <td className="headertdatt">
                          RES:{character.attributes.RES}
                      </td>
                      <td className="headertdatt">
                          EDG:{character.currentEdge}/{character.attributes.EDG}
                      </td>
                      <td className="headertdatt">
                          ESS:{character.attributes.ESS}
                      </td>
                      <td className="headertd">
                          Physical: 0/12({character.conditionMonitor.physical})
                      </td>
                      <td className="headertd">
                          Stun: 0/8({character.conditionMonitor.stun})
                      </td>
                      <td className="headertd">
                          Armor: {armor}
                      </td>
                      <td className="headertd">
                          ¥: {character.money}
                      </td>
                  </tr>
                  </tbody>
              </table>
          </div>
        );
    }

    /**
     * Updates the armor value as it is changed by gear.js as this is the
     * only location where the current armor value is shown
     */
    calcTotalArmorVal(character: ICharacter){
        let armor = character.armor;
        
        let gearListArmor = character.gear.armor;
        
        for(let i = 0; i < gearListArmor.length; i++){
            if(gearListArmor[i].equiped){
                let rating = gearListArmor[i].rating;
                if(typeof rating == "string"){
                    if(rating.includes('+')){
                        armor = armor + parseInt(rating);
                    } else if(Number.parseInt(rating) > armor){
                        armor = parseInt(rating);
                    }
                } else if(rating > armor){
                    armor = rating;
                }
            }
        }
        return armor;
    }

}

export default connect(
    mapStateToProps
)(Header)