import React from 'react';
import '../CSS_Files/Qualities.css'
import qualityJSON from '../Qualities.json'
import Select, { ValueType } from 'react-select';
import { IShadowRunState } from "../redux/store";
import { adjustKarma } from '../redux/actions/karmaActions';
import { adjustQuality, removeQuality } from '../redux/actions/qualityActions';
import { IQuality } from "../models/playerModels";

type IQualityProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

interface QualityOption {
    value: IQuality; 
    label: string
}
interface IQualityState {
    karmaButton: boolean;
    nuyenButton: boolean;
}
const mapStateToProps = (state: IShadowRunState) => ({
    character: state.player,
});

const mapDispatchToProps = {
    adjustKarma
};

/**
 * @class Represents the contents displayed on the Qualities page. Qualities
 * affect many stats and actions of a character. They should eventually
 * interact with a characters stats and actions on the action page.
 * Information about qualities can be found on page 71 of the core rulebook
 */
class Qualities extends React.Component<IQualityProps, IQualityState>{
    render(){
        const {character} = this.props;
        let page;

        //Handle if a character has not been loaded yet (or does not have skills)
        if(character === null || character === undefined){
            page = <p>Load a character file to see their qualities</p>;

        }else if(character.qualities === undefined){
            page = <p>No qualities found, load a character or add qualities to the character's file</p>;

        } else {
            //If character has qualities, generate the page contents
            page = this.qualitiesPage();
        }

        return(<div>
            <h1 className={'Qualities'}>Qualities</h1>
            {page}
        </div>)
    }

    /**
     * Creates a table for both types of qualities, positive and negative
     * @returns the full page with both types of qualities
     */
    qualitiesPage() {
        let layout;

        layout = <div>
            {this.qualitiesTable('Positive')}
            {this.qualitiesTable('Negative')}
        </div>;

        return layout;

    }

    /**
     * Generates the table which will contain all qualities of the spesificed type
     * @param {*} type is what table is currently being created
     */
    qualitiesTable(type: string){
        let qualitiesList = this.getQualities(type);
        let qualitiesRows = [];

        for(let i = 0; i < qualitiesList.length; i++){
            qualitiesRows.push(this.qualitiesRow(type.toLowerCase(), i));
        }
        
        let plusButton = <button className={'Qualities'} onClick={() => this.addQuality(type.toLowerCase())}>Add Custom Quality</button>;

        let presetButton = this.allQualitiesDropdown(type.toLowerCase());

        return(
            <div>
            <h2 className={'Qualities'}>{type}</h2>
            <table className={'Qualities'}>
                    <tbody>
                    <tr className={'Qualities'}>
                        <th className={'Qualities'}/>
                        <th className={'Qualities'}>Name</th>
                        <th className={'Qualities'}>Rtg.</th>
                        <th className={'Qualities'}>Karma</th>
                        <th className={'Qualities'}>Notes</th>
                        <th className={'Qualities'}>Remove</th>
                    </tr>
                    {qualitiesRows}
                    </tbody>
                </table>
                {plusButton}{presetButton}
            </div>
        );
    }

    private getQualities = (type: string) => {
      const { qualities } = this.props.character;

      switch (type.toLowerCase()) {
          case 'positive': return qualities.positive;
          case 'negative': return qualities.negative;
          default: return [];
      }
    }

    /**
     * Generates the preset qualities from the qualities.json file
     * into a 
     * @param {*} type is positive/negative depending on the quality
     */
    allQualitiesDropdown(type: string){
        const options: QualityOption[] = [];

        // qualityJSON[type].forEach(quality=> {
        //     options.push({
        //         value: quality,
        //         label: `${quality.qName}` //TODO add full dice value here?
        //     });
        // });

        let qualities: object = qualityJSON[type.toLowerCase() === "positive" ? "positive" : "negative"];
            Object.entries(qualities).forEach((qualityType) =>{
                qualityType.forEach((quality) => {
                    options.push({
                        value: quality,
                        label: `${quality.qName}`
                });
            });
        });



        // val.value.qName, val.value.karma, val.value.rating, val.value.max, type
        return (
            <div className={'QualitiesDrop'}>
                <Select
                    options={options}
                    onChange={val => this.addPresetQuality(val, type)}
                />
            </div>
        );
    }

    /**
     * This method creates the table whcih contains the qualities.
     * If the quality has a 0 it cannot have its rating increased, otherwise
     * the rating can be increased from 1 to its max value
     * @param {*} type is positive/negative depending on the type of quality
     * @param {*} index is the spot in the character file array which is currently being loaded
     */
    qualitiesRow(type: string, index: number){
        const {character} = this.props;
        let quality = this.getQualities(type)[index];
        let minusButton = <button className={'RemoveQ'} onClick={() => this.removeQuality(type, index)}><span role={'img'} aria-label={'wastebasket'}>🗑️</span></button>;
        let ratingButtonPlus = <button onClick={() => this.addRating(type, index)}>+</button>;
        let ratingButtonMinus = <button onClick={() => this.removeRating(type, index)}>-</button>;
        if(quality === null || quality.qName === "" || quality === undefined){
            return null;
        } else {
            if(quality.rating === 0){
                return <tr className={'Qualities'} key={index}>
                <td className={'Qualities'}></td>
                <td className={'Qualities'}>{quality.qName}</td>
                <td className={'Qualities'}>{}</td>
                <td className={'Qualities'}>{quality.karma}</td>
                <td className={'Qualities'}>{quality.notes}</td>
                <td className={'Qualities'}>{minusButton}</td>
            </tr>
            } else {
            return <tr className={'Qualities'} key={index}>
                <td className={'Qualities'}>{ratingButtonMinus}{ratingButtonPlus}</td>
                <td className={'Qualities'}>{quality.qName}</td>
                <td className={'Qualities'}>{quality.rating}</td>
                <td className={'Qualities'}>{quality.karma}</td>
                <td className={'Qualities'}>{quality.notes}</td>
                <td className={'Qualities'}>{minusButton}</td>
            </tr>
            }
        }
    }

    /**
     * Updates the current rating by checking if there is enough karma 
     * and it does not go over its max.
     * @param {*} type is positive/negative depending on the type of quality
     * @param {*} index is the spot in the character file array which is currently being loaded
     */
    addRating(type: string, index: number){
        const quality = this.getQualities(type)[index];
        let karmaAdjust = quality.karma;
        if(quality.rating < quality.max){
            const response = window.confirm("Increasing " + quality.qName + " from " + quality.rating + " to " + (quality.rating + 1) + " will cost " + karmaAdjust + " karma.\n\nIs it OK to upgrade " + quality.qName + "?");
            if(response){
                // const check = this.props.adjKarm(karmaAdjust, `Increased rating of ${quality.qName} quality from ` +
                //     `${quality.rating} to ${quality.rating + 1}`,"Karma");
                adjustKarma(karmaAdjust);
                //if(check === true){
                quality.rating = quality.rating + 1;
                //} else {
                    //alert("Not enough karma");
                //}
            }
        } else{
            alert("The quality is already at its max rating");
        }
    }

    /**
     * Updates the current rating by checking if there is enough karma 
     * and it does not go under 1
     * @param {*} type is positive/negative depending on the type of quality
     * @param {*} index is the spot in the character file array which is currently being loaded
     */
    removeRating(type: string, index: number){
        const quality = this.getQualities(type)[index];

        const response = window.confirm(`Decreasing ${quality.qName} from ${quality.rating} to ${(quality.rating - 1)} will ` +
        `refund ${Math.abs(quality.karma)} karma.` +
        `\n\nReverting qualities is not allowed by game rules, it is only meant ` +
        `to be done if you accidentally increased a quality. Is it OK to revert ${quality.qName}?`);
        if(response){
            if(quality.rating > 1){
                adjustKarma(Math.abs(quality.karma));
                quality.rating = quality.rating - 1;
                //const check = this.props.adjKarm(Math.abs(quality.karma), `Decreased rating of ${quality.qName} ` +
                    //`quality from ${quality.rating} to ${quality.rating - 1}`,"Karma");
                //if(check === true){
                    //quality.rating = quality.rating - 1;
                //} else {
                    //alert("Not enough karma");
                //}
            }
        }
    }

    /**
     * Adds in a preset quality to the character
     * @param {*} qName name of the quality
     * @param {*} karmaAdjust how much karma it will cost
     * @param {*} rating is the current rating level
     * @param {*} max is the max rating of the quality
     * @param {*} type is if it is positive or negative
     */
    addPresetQuality(val: ValueType<QualityOption>, qualityType: string){
        if(val === null || val === undefined){
            return;
        }
        const quality = (val as QualityOption).value;
        const response = window.confirm("This quality will cost " + quality.karma + " karma.");
        if(response){
            const notes = prompt("Enter any notes about the quality", "");
            if(notes !== null) {
                adjustKarma(quality.karma);
                adjustQuality(quality.qName, quality.karma, quality.rating, quality.max, notes, qualityType);
                //const check = this.props.adjKarm(karmaAdjust, 'Added Quality: ' + qName,"Karma");
                //if(check === true){
                    //this.props.adjQuality(qName, karmaAdjust, rating, max, notes, type);
                //} else {
                    //alert("Not enough karma");
                //}
            }
        } 
    }

    /**
     * Creates popups which get the needed information to create a new
     * custom quality. Depending on the type of quality it will check that the ammount of
     * karma that is being taken is correct
     * @param {*} type is positive/negative depending on the quality
     */
    addQuality(type: string){
        let karmaNewValue: number | null = 0;
        let ratingNewValue: number | null = 0;
        let maxRatingNewValue: number | null = 0;
        const qNameNew = prompt("Enter the name of the quality:", "Addiction, (Moderate BTLs)");
        if (qNameNew === "") {
            alert("Name must be entered");
        } else if(qNameNew !== null) {
            const karmaNew = prompt("Enter the cost of the quality:", "0");
            if (karmaNew === "" || karmaNew === null) {
                alert("Must have defined karma amount");
            } else if(karmaNew !== null){
                karmaNewValue = this.getNumber(karmaNew);
                if(karmaNewValue !== null){
                    const ratingNew = prompt("Enter the rating:", "0");
                    if(ratingNew === "" || ratingNew === null){
                        alert("Must have a rating with the quality");
                    } else {
                        ratingNewValue = this.getNumber(ratingNew);
                        if(ratingNewValue !== null){
                            if(ratingNewValue < 0 ){
                                alert("Rating must be greater than 0");
                            } else if(ratingNew !== null) {
                                const maxRatingNew = prompt("Enter the max rating:", "0");
                                if(maxRatingNew === "" || maxRatingNew === null){
                                    alert("There must be a max rating");
                                } else {
                                    maxRatingNewValue = this.getNumber(maxRatingNew);
                                    if(maxRatingNewValue !== null){
                                        if(maxRatingNewValue < 0 ){
                                            alert("Max rating must be greater than 0");
                                        } else if(maxRatingNew !== null) {
                                            //Positive must be negative karma and negative must be positive karma
                                            if((type === "positive" && karmaNewValue > 0) || (type === "negative" && karmaNewValue < 0)){
                                                if(type === "positive"){
                                                    alert("Positive qualities must be negative karma");
                                                } else {
                                                    alert("Negative qualities must be positive karma");
                                                }
                                            } else {
                                                const notes = prompt("Enter any notes about the quality", "");
                                                if(notes !== null) {
                                                    adjustKarma(karmaNewValue);
                                                    adjustQuality(qNameNew, karmaNewValue, ratingNewValue, maxRatingNewValue, notes, type.toLowerCase());
                                                    //const check = this.props.adjKarm(parseInt(karmaNew), 'Added Quality: ' + qNameNew,"Karma");
                                                    //if(check === true){
                                                        //this.props.adjQuality(qNameNew, karmaNew, parseInt(ratingNew), parseInt(maxRatingNew), notes, type.toLowerCase());
                                                    //} else {
                                                        //alert("Not enough karma");
                                                    //}
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    /**
     * Removes the current quality from the users JSON using the remQuality in app.js
     * @param {*} type is positive/negative depending on the quality
     * @param {*} index is where that quality is in the characters list.
     */
    removeQuality(type: string, index: number){
        const {character, adjustKarma} = this.props;
        //let quality = this.getQualities(type)[index];
        const karmaNew = prompt("Enter the amount toof removing the quality:", "-5");
        let karmaNewNumber: number = 0;
        if(karmaNew !== null){
            karmaNewNumber = this.getNumber(karmaNew)!;
        }
        if (karmaNewNumber === null) {
            alert("Must have a karma amount entered");
        } else if (karmaNewNumber !== null){
            // const check = this.props.adjustKarm(parseInt(karmaNew), "Removed quality: " + 
            //     character.qualities[type][index].qName + ". (Original karma: " + 
            //     character.qualities[type][index].karma + ")", "Karma");
            // if(check === true){
            //     this.props.remQuality(type, index);
            // }else {
            //     alert("Not enough karma");
            // }
            adjustKarma(karmaNewNumber)
            removeQuality(type, index);
        }
    }

    private getNumber = (convertNumber: string) => {
        let value: number = 0;
        let validResponse: boolean = false;

        if(convertNumber === null || convertNumber === ""){return null;};
        value = Number.parseInt(convertNumber);
        if (!isNaN(value) && Number.isInteger(value)) {
            validResponse = true;
        } 

        if(validResponse === false){
            alert("You have entered an invalid number.")
        }
        return value;
    }

}


export default Qualities;