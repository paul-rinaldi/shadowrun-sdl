import React from "react";
import "../CSS_Files/Karma.css";
import karmaIcon from "./ComponentsImg/KarmaIcon.png";
import nuyenIcon from "./ComponentsImg/NuyenIcon.png";
import karmaIconGrayScale from "./ComponentsImg/KarmaIconGrayScale.png";
import nuyenIconGrayScale from "./ComponentsImg/NuyenIconGrayScale.png";
import { IShadowRunState } from "../redux/store";
import { adjustNuyen } from "../redux/actions/nuyenActions";
import { adjustKarma } from "../redux/actions/karmaActions";
import { connect } from "react-redux";
import { makeLog } from "../redux/actions/logActions";

//Relevant 5e core rulebook pages:
//  371-372 - Run rewards: explains nuyen and karma rewards
//  103-107 - Character Advancement: Shows the many ways karma can be spent to improve character
//  62-106 - Creating a Shadowrunner: long section but explains how karma and nuyen is used in character creation

type ILogProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

interface ILogState {
  karmaButton: boolean;
  nuyenButton: boolean;
}

const mapStateToProps = (state: IShadowRunState) => ({
  character: state.player,
});

const mapDispatchToProps = {
  adjustNuyen,
  adjustKarma,
  makeLog,
};

/**
 * The Log page which displays a log of all the characters karma and nuyen changes. The log entries each contain a
 * timestamp, a type (karma or nuyen), an adjustment amount, and a description/reason. There are buttons to toggle which
 * types of log entries are displayed. Additionally, the page has buttons for making manual adjustments to the
 * character's nuyen and karma.
 */
class Log extends React.Component<ILogProps, ILogState> {
  constructor(props: ILogProps) {
    super(props);
    this.state = {
      karmaButton: true,
      nuyenButton: true,
    };
  }

  /**
   * Toggles whether karma log entries should be displayed.
   */
  toggleKarma = () => {
    if (this.state.karmaButton) {
      this.setState({
        karmaButton: false,
      });
    } else {
      this.setState({
        karmaButton: true,
      });
    }
  };

  /**
   * Toggles whether nuyen log entries should be displayed.
   */
  toggleNuyen = () => {
    if (this.state.nuyenButton) {
      this.setState({
        nuyenButton: false,
      });
    } else {
      this.setState({
        nuyenButton: true,
      });
    }
  };

  /**
   * Renders the log page or a message saying to load a character if none is loaded.
   * @returns The log page or a message saying to load a character if none is loaded.
   */
  render() {
    const { character } = this.props;
    let karmaImg;
    let nuyenImg;
    //Check if the karma and nuyen buttons are active.
    if (!this.state.karmaButton) {
      karmaImg = karmaIconGrayScale;
    } else {
      karmaImg = karmaIcon;
    }
    if (!this.state.nuyenButton) {
      nuyenImg = nuyenIconGrayScale;
    } else {
      nuyenImg = nuyenIcon;
    }

    return (
      <div className={"Karma"}>
        <h1 className={"Karma"}>Character Log</h1>
        <table>
          <thead>
            <tr>
              <th>
                <h2 className={"Karma"}>Toggle Legend: </h2>
              </th>
              <th>
                <button>
                  <img
                    className={"Karma"}
                    src={karmaImg}
                    alt={"karma toggle icon"}
                    onClick={this.toggleKarma}
                  />
                </button>
              </th>
              <th>
                <button>
                  <img
                    className={"Karma"}
                    src={nuyenImg}
                    alt={"nuyen toggle icon"}
                    onClick={this.toggleNuyen}
                  />
                </button>
              </th>
            </tr>
          </thead>
        </table>
        {character === null && <p>Load a character file to see their log</p>}
        {character !== undefined &&
          character.log !== undefined &&
          this.renderLogPage()}
        {character !== undefined && !(character.log !== undefined) && (
          <p>No character loaded or character has no karma log</p>
        )}
      </div>
    );
  }

  /**
   * Will render the entire Log page
   */
  private renderLogPage = () => {
    const {
      character: { log },
    } = this.props;
    const { karmaButton, nuyenButton } = this.state;

    const filteredList = log.filter((log) => {
      return (
        (karmaButton && log.reasonType === "Karma") ||
        (nuyenButton && log.reasonType === "Nuyen")
      );
    });
    let index = 0;
    return (
      <div>
        <button onClick={() => this.handleKarmaAdjustmentButton()}>
          Make Karma Adjustment
        </button>
        <button onClick={() => this.handleMoneyAdjustmentButton()}>
          Make Nuyen Adjustment
        </button>
        <table className={"Karma"}>
          <tbody>
            <tr className={"Karma"}>
              <th className={"Karma"}>Time</th>
              <th className={"Karma"}>Type</th>
              <th className={"Karma"}>Adjustment</th>
              <th className={"Karma"}>Description</th>
            </tr>
            {filteredList.map((log) => {
              const date = new Date();
              const img = log.reasonType === "Karma" ? karmaIcon : nuyenIcon;
              return (
                <tr className={"Karma"} key={index++}>
                  <td className={"Karma"}>
                    {date.toLocaleDateString("en-us", {
                      month: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </td>
                  <td className={"Karma"}>
                    <img
                      className={"Karma"}
                      src={img}
                      alt={log.reasonType + " icon"}
                    />
                  </td>
                  <td className={"Karma"}>{log.adjustment}</td>
                  <td className={"Karma"}>{log.reason}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  /**
   * Will adjust the karma and nuyen
   * @param promptedType: the type you are attempting to adjust, will either be karma or nuyen
   * @param oldValue: the current value of the karma or nuyen
   */
  private getNumberValue = (promptedType: string, oldValue: number) => {
    let validResponse: boolean = false;
    let value: number = 0;

    while (!validResponse) {
      const adjustmentResponse = prompt(
        `How much would you like to adjust ${promptedType} by?`
      );

      // A null indicates the user cancelled
      if (adjustmentResponse === null) {
        return null;
      }
      value = Number.parseInt(adjustmentResponse);

      if (!isNaN(value) && Number.isInteger(value)) {
        if (-value <= oldValue) {
          validResponse = true;
        } else {
          alert(
            `If you are removing ${promptedType}, you cannot remove more than the character has.`
          );
        }
      } else {
        alert("You must enter an integer value for karma adjustment.");
      }
    }

    return value;
  };

  /**
   * Will return the reason for why the adjustment was requested
   */
  private getReason = () => {
    let reasonValid = false;
    let reason: string | null = null;
    while (!reasonValid) {
      reason = prompt("What is the reason for the adjustment?");
      if (reason === null) {
        return null;
      }
      if (reason.trim() === "") {
        alert("You must enter a reason for the adjustment.");
      } else {
        reasonValid = true;
      }
    }
    return reason;
  };

  /**
   * Handler for making a nuyen adjustment. Prompts the user for the adjustment amount and reason, then makes that
   * adjustment.
   */
  handleMoneyAdjustmentButton = () => {
    const { character, adjustNuyen, makeLog } = this.props;

    const adjustment = this.getNumberValue("Nuyen", character.money);
    const reason = adjustment != null ? this.getReason() : null;
    const reasonType = "Nuyen";

    if (adjustment !== null && reason !== null) {
      const now = new Date();
      makeLog(adjustment, reason, reasonType, now);
      adjustNuyen(adjustment);
    }
  };

  /**
   * Handler for making a karma adjustment. Prompts the user for the adjustment amount and reason, then makes that
   * adjustment.
   */
  handleKarmaAdjustmentButton = () => {
    const { character, adjustKarma, makeLog } = this.props;

    const adjustment = this.getNumberValue("Karma", character.money);
    const reason = adjustment !== null ? this.getReason() : null;
    const reasonType = "Karma";

    if (adjustment !== null && reason !== null) {
      const now = new Date();
      makeLog(adjustment, reason, reasonType, now);
      adjustKarma(adjustment);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Log);
