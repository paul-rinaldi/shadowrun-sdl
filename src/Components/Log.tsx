import React from 'react';
import '../CSS_Files/Karma.css'
import karmaIcon from './ComponentsImg/KarmaIcon.png';
import nuyenIcon from './ComponentsImg/NuyenIcon.png';
import karmaIconGrayScale from './ComponentsImg/KarmaIconGrayScale.png'
import nuyenIconGrayScale from './ComponentsImg/NuyenIconGrayScale.png'
import {IShadowRunState} from "../redux/store";
import {ILog} from "../models/playerModels";
import {adjustNuyen} from "../redux/nuyenActions";

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
    adjustNuyen
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
            nuyenButton: true
        };
    }

    /**
     * Toggles whether karma log entries should be displayed.
     */
    toggleKarma() {
        if (this.state.karmaButton) {
            this.setState({
                karmaButton: false
            });
        } else {
            this.setState({
                karmaButton: true
            });
        }
    }

    /**
     * Toggles whether nuyen log entries should be displayed.
     */
    toggleNuyen() {
        if (this.state.nuyenButton) {
            this.setState({
                nuyenButton: false
            });
        } else {
            this.setState({
                nuyenButton: true
            });
        }
    }


    /**
     * Renders the log page or a message saying to load a character if none is loaded.
     * @returns The log page or a message saying to load a character if none is loaded.
     */
    render() {
        const {character} = this.props;
        //Variable for the main content of the page
        let logPage;
        if(character === null){
            logPage = <p>Load a character file to see their log</p>;
        } else if (character !== undefined && character.log !== undefined) {
            let rows = [];

            //Create rows for every entry in the character log
            for (let i = 0; i < character.log.length; i++) {
                const entry = character.log[i];
                if (entry.reasonType === "Karma") {
                    if (this.state.karmaButton) {
                        rows.push(this.logRow(entry, i));
                    }
                }
                if (entry.reasonType === "Nuyen") {
                    if (this.state.nuyenButton) {
                        rows.push(this.logRow(entry, i));
                    }
                }
            }

            logPage = <div>
                <button onClick={() => this.handleMoneyAdjustmentButton()}>Make Nuyen Adjustment</button>
                <button onClick={() => this.handleKarmaAdjustmentButton()}>Make Karma Adjustment</button>
                <table className={'Karma'}>
                    <tbody>
                    <tr className={'Karma'}>
                        <th className={'Karma'}>Time</th>
                        <th className={'Karma'}>Type</th>
                        <th className={'Karma'}>Adjustment</th>
                        <th className={'Karma'}>Description</th>
                    </tr>
                    {rows}
                    </tbody>
                </table>
            </div>;
        } else {
            logPage = <p>No character loaded or character has no karma log</p>
        }

        let karmaImg;
        let nuyenImg;
        //Check if the karma and nuyen buttons are active.
        if (!this.state.karmaButton) {
            karmaImg = karmaIconGrayScale
        } else {
            karmaImg = karmaIcon
        }
        if (!this.state.nuyenButton) {
            nuyenImg = nuyenIconGrayScale
        } else {
            nuyenImg = nuyenIcon
        }


        return <div className={'Karma'}>
            <h1 className={'Karma'}>Character Log</h1>
            <table>
                <thead>
                <tr>
                    <th>
                        <h2 className={'Karma'}>Toggle Legend: </h2>
                    </th>
                    <th>
                        <button><img className={'Karma'} src={karmaImg} alt={'karma toggle icon'} onClick={this.toggleKarma}/></button>
                    </th>
                    <th>
                        <button><img className={'Karma'} src={nuyenImg} alt={'nuyen toggle icon'} onClick={this.toggleNuyen}/></button>
                    </th>
                </tr>
                </thead>
            </table>
            {
                logPage
            }
        </div>
    }

    /**
     * Creates a table row containing the adjustment and reason for the provided entry.
     * @param entry The log entry to create a row for.
     * @param key The key for the log row.
     * @returns {*}
     */
    logRow(entry: ILog, key: number) {
        //Dates just become strings when saved to JSON, so the Date object must be recreated from the string
        const date = new Date(entry.time);
        let img;
        if (entry.reasonType === "Karma") {
            img = karmaIcon
        } else if (entry.reasonType === "Nuyen") {
            img = nuyenIcon
        }
        return <tr className={'Karma'} key={key}>
            <td className={'Karma'}>{date.toLocaleDateString('en-us',
                {month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'})}</td>
            <td className={'Karma'}><img className={"Karma"} src={img} alt={entry.reasonType + ' icon'}/></td>
            <td className={'Karma'}>{entry.adjustment}</td>
            <td className={'Karma'}>{entry.reason}</td>
        </tr>
    }

    /**
     * Handler for making a nuyen adjustment. Prompts the user for the adjustment amount and reason, then makes that
     * adjustment.
     */
    handleMoneyAdjustmentButton() {
        let adjustment;
        let reason;
        let adjustmentValid = false;
        let reasonValid = false;
        let reasonType = "Nuyen";
        let adjustmentNumber: number;
        const {character} = this.props;

        while (!adjustmentValid) {
            adjustment = prompt('How much would you like to adjust Nuyen by?');

            //Check that the user didn't cancel the prompt
            if (adjustment === null) {
                break;
            }

            //Validate the entry
            adjustment = adjustment.trim();
            if (adjustment !== '') {
                adjustment = Number(adjustment);
                adjustmentNumber = adjustment;
                if (!isNaN(adjustment) && Number.isInteger(adjustment) && -adjustment <= character.money) {
                    adjustmentValid = true;
                }
            }

            if (!adjustmentValid) {
                alert('You must enter an integer value for Nuyen adjustment. If you are removing Nuyen, you cannot ' +
                    'remove more than the character has.');
            } else {
                while (!reasonValid) {
                    reason = prompt('What is the reason for the adjustment?');

                    //Check that the user didn't cancel the prompt
                    if (reason === null) {
                        break;
                    }

                    //Validate the entry
                    reason = reason.trim();
                    if (reason !== '') {
                        this.props.adjustNuyen(adjustmentNumber, reason, reasonType);
                    }

                    if (!reasonValid) {
                        alert('You must enter a reason for the adjustment.');
                    }
                }
            }
        }
    }

    /**
     * Handler for making a karma adjustment. Prompts the user for the adjustment amount and reason, then makes that
     * adjustment.
     */
    handleKarmaAdjustmentButton() {
        let adjustment;
        let reason;
        let adjustmentValid = false;
        let reasonValid = false;
        let reasonType = "Karma";

        while (!adjustmentValid) {
            adjustment = prompt('How much would you like to adjust karma by?');

            //Check that the user didn't cancel the prompt
            if (adjustment === null) {
                break;
            }

            //Validate the entry
            adjustment = adjustment.trim();
            if (adjustment !== '') {
                adjustment = Number(adjustment);
                if (!isNaN(adjustment) && Number.isInteger(adjustment) && -adjustment <= character.karma) {
                    adjustmentValid = true;
                }
            }

            if (!adjustmentValid) {
                alert('You must enter an integer value for karma adjustment. If you are removing karma, you cannot ' +
                    'remove more than the character has.');
            }
        }

        if (adjustmentValid) {
            while (!reasonValid) {
                reason = prompt('What is the reason for the adjustment?');

                //Check that the user didn't cancel the prompt
                if (reason === null) {
                    break;
                }

                //Validate the entry
                reason = reason.trim();
                if (reason !== '') {
                    reasonValid = true;
                }

                if (!reasonValid) {
                    alert('You must enter a reason for the adjustment.');
                }
            }
        }

        if (adjustmentValid && reasonValid) {
            this.props.adjKarm(adjustment, reason, reasonType);
        }
    }
}

export default Log;