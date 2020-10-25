import React from 'react';
import './CSS_Files/App.css';
//import components
import Overview from './Components/Overview.tsx'
import Sidebar from './Components/Sidebar'
import Header from './Components/Header'
import Skills from './Components/Skills'
import KnowledgeSkills from "./Components/KnowledgeSkills";
import logo from './Components/ComponentsImg/wizwormlogoblack.png'
import Attributes from './Components/Attributes'
import Qualities from './Components/Qualities'
import Gear from './Components/Gear'
import Log from './Components/Log'
import Action from './Components/Action'

//styling from bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//importing node modules
import {BrowserRouter as Router} from "react-router-dom";
const Route = require("react-router-dom").Route;


/**
 * The class that represents the entire site. The character's information is stored in the state of the App object. Any
 * needed character information is passed down to the child page objects as props (often the entire character is
 * passed). There are also several methods that are bound to the App object and passed to the pages as props. This
 * allows the pages to call those methods and indirectly modify the App state.
 */
export default class App extends React.Component {
    constructor(props) {
        super(props);

        //Passed as props to the Skills object to allow it to modify the App state
        // this.updateKnowledgeSkill = this.updateKnowledgeSkill.bind(this);
        // this.addKnowledgeSkill = this.addKnowledgeSkill.bind(this);

        //binding the upload and download so they can be components
        //located in components -> Save&Upload
        this.upload = this.upload.bind(this);

        // this.adjustKarma = this.adjustKarma.bind(this);
        // this.adjustNuyen = this.adjustNuyen.bind(this);

        //This adds and removes qualitys
        // this.adjustQualities = this.adjustQualities.bind(this);
        // this.removeQualities = this.removeQualities.bind(this);

        //A ref to allow referencing the invisible input element
        this.inputRef = React.createRef();
        this.handleLoadButton = this.handleLoadButton.bind(this);

        //Passed as prop to attributes to modify state
        this.updateAtt = this.updateAtt.bind(this);

        this.updateMoney = this.updateMoney.bind(this);
    }


    /**
     * this is the button to handle the upload button is hidden but simulate a button being clicked
     */
    handleLoadButton(){
        this.inputRef.current.click();
    }

    /**
     * this is the part of upload so it can set it to the state
     * @param e
     */
    handleFileChosen = (e) => {
        try {
            const reader = new FileReader();
            reader.onload = this.onReaderLoad;
            reader.readAsText(e.target.files[0]);
        }catch (e) {
            alert("There was an error loading " + this.state.name + ".JSON");
        }
    };
    /**
     * this reads in the file and sets it to the state
     * @param e
     */
    onReaderLoad = (e) => {
        try {
            let characterData = JSON.parse(e.target.result);
            this.setState(characterData);
        }catch (e) {
            alert("There was an error loading " + this.state.name + ".JSON");
        }
    };

    // /**
    //  * Passed as a prop to the KnowledgeSkills object. Adjusts the rating of the knowledge skill of the given type,
    //  * at the given index, by the given adjustment.
    //  * @param type The type of the knowledge skill to update
    //  * @param index The index of the knowledge skill in the type array
    //  * @param adjustment The amount to adjust the knowledge skill by
    //  */
    // updateKnowledgeSkill(type, index, adjustment){
    //     //Create a deep copy of the knowledgeSkills object
    //     const updatedKnowledgeSkills = JSON.parse(JSON.stringify(this.state.knowledgeSkills)); //Converting to JSON, then parsing is an easy way to deep copy

    //     //Adjust the desired skill of the copy
    //     updatedKnowledgeSkills[type][index].rating = updatedKnowledgeSkills[type][index].rating + adjustment;

    //     //Replace the current knowledgeSkills object with the updated copy
    //     this.setState({
    //         knowledgeSkills: updatedKnowledgeSkills
    //     });
    // }

    // /**
    //  * Adds a knowledge skill with the specified information
    //  * @param type The type of the knowledge skill
    //  * @param att The attribute associated with the knowledge
    //  * @param name The name of the knowledge skill
    //  * @param specialization The specialization of the knowledge skill
    //  */
    // addKnowledgeSkill(type, att, name, specialization){
    //     //Create a deep copy of the knowledgeSkills object
    //     const updatedKnowledgeSkills = JSON.parse(JSON.stringify(this.state.knowledgeSkills));

    //     //Add the skill
    //     updatedKnowledgeSkills[type.toLowerCase()].push({
    //         name: name,
    //         rating: 1,
    //         attribute: att,
    //         specialization: specialization
    //     });

    //     //Replace the current knowledgeSkills object with the updated copy
    //     this.setState({
    //         knowledgeSkills: updatedKnowledgeSkills
    //     });
    // }

    updateAtt(att, increment, min, max){
        let updatedAtt = JSON.parse(JSON.stringify(this.state.attributes));
        updatedAtt[att] = updatedAtt[att] + increment;
        if(att === 'ESS'){
            let newEss = updatedAtt[att];
            newEss = newEss * 10;
            newEss = Math.round(newEss);
            newEss = newEss / 10;
            updatedAtt[att] = newEss;
        }
        if(updatedAtt[att] >= min && updatedAtt[att] <= max){
            this.setState({
                attributes: updatedAtt
            });
        }
    }

    /**
     * this method handles uplaoding the character to the state
     */
    upload() {
        this.handleLoadButton();
    }

    // /**
    //  * Adjusts the players karma if they have enough for the adjustment. An entry will be added to the log with
    //  * the given reason.
    //  * @param adjustment The amount to adjust karma by.
    //  * @param reason The reason for the karma adjustment
    //  * @param reasonType The type of the adjustment for the log entry (karma).
    //  * @returns {boolean} True if successful, false if unsuccessful (not enough karma for adjustment).
    //  */
    // adjustKarma(adjustment, reason, reasonType){
    //     if(this.state.karma + adjustment >= 0){
    //         this.setState(currentState => {
    //             const now = new Date(); //New Date() with no params gets current time
    //             const logCopy = JSON.parse(JSON.stringify(currentState.log));
    //             logCopy.unshift({
    //                 adjustment: adjustment,
    //                 reason: reason,
    //                 reasonType: reasonType,
    //                 time: now
    //             });

    //             return {
    //                 karma: currentState.karma + adjustment,
    //                 log: logCopy
    //             };
    //         });

    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    // /**
    //  * Adjusts the players nuyen if they have enough for the adjustment. An entry will be added to the log with
    //  * the given reason.
    //  * @param adjustment The amount to adjust nuyen by.
    //  * @param reason The reason for the nuyen adjustment
    //  * @param reasonType The type of the adjustment for the log entry (nuyen).
    //  * @returns {boolean} True if successful, false if unsuccessful (not enough nuyen for adjustment).
    //  */
    // adjustNuyen(adjustment, reason,reasonType){
    //     if(this.state.money + adjustment >= 0){
    //         let now = new Date(); //New Date() with no params gets current time
    //         let logCopy = JSON.parse(JSON.stringify(this.state.log));
    //         logCopy.unshift({
    //             adjustment: adjustment,
    //             reason: reason,
    //             reasonType: reasonType,
    //             time: now
    //         });

    //         this.setState({
    //             money: this.state.money + adjustment,
    //             log: logCopy
    //         });

    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    // /**
    //  * This method creates a new quality with the given information
    //  * @param {*} qName name of the new quality
    //  * @param {*} karmaAdjust the ammount of karma that the quality requires
    //  * @param {*} rating the current rating
    //  * @param {*} max the max rating
    //  * @param {*} notes notes about the quality
    //  * @param {*} type either positive/negative
    //  */
    // adjustQualities(qName, karmaAdjust, rating, max, notes, type){
    //     let qualityCopy = JSON.parse(JSON.stringify(this.state.qualities));
    //     qualityCopy[type].push({
    //         qName: qName,
    //         karma: karmaAdjust,
    //         rating: rating,
    //         max: max,
    //         notes: notes
    //     });

    //     this.setState({
    //         qualities: qualityCopy
    //     });
    // }

    // /**
    //  * Removes the quality completely from the list without leaving a null in its place
    //  * @param {*} type is positive/negative
    //  * @param {*} index is where in the qualities list that quality is
    //  */
    // removeQualities(type, index){
    //     let qualityCopy = JSON.parse(JSON.stringify(this.state.qualities));
    //     qualityCopy[type].splice(index, 1);
    //     this.setState({
    //         qualities: qualityCopy
    //     });
    // }

    /**
     * just a simple adjust money in case it needs to be moved any
     * @param amount
     */
    updateMoney(amount){
        this.setState({
            money: this.state.money + amount
    }
        );
    }

    /**
     * Creates the credits section of the landing page.
     */
    credits() {
        return <div>
            <h3>Credits</h3>
            <p>Wizworm was created as a project for the Software Development Lab class at the <a href={'https://www.msoe.edu/'}>Milwaukee School of Engineering</a> taught by Dr. Robert Hasker.
                <br/>The site was developed by Jason Urban, Jennifer Stillman, Josh Vogt, and Molly Uchtman, Jesse Sierra,
                Paul Rinaldi, Seth Fenske, Nick Marinello, and Kam Mitchell, with Scott Sauer and Duane Raiche of <a href={'https://www.centare.com/'}>Centare</a> acting as Product Owners.</p>
        </div>
    }

    /**
     * Renders the sidebar and header along with the contents of the current page. The Router object is used to change
     * the central contents based on the current route (url). Every page has its own Route object which renders the
     * object representing the page.
     */
    render() {
        return (
            <Router>
                <div className="App">
                    {/*This input is not displayed, it is triggered by the button above*/}
                    <input type={'file'} ref={this.inputRef} onChange={(e) => this.handleFileChosen(e)} style={{display: 'none'}}/>

                    <Header character={this.state}/>
                    <Sidebar />
                    <div className='App-container'>
                        <Route exact path="/" render={() => (
                            <div>
                                <img src={logo} alt="Wizworm Logo" width="100" height="100"/>
                                <h1>Wizworm</h1>
                                <p>Wizworm is a character manager for Shadowrun 5th edition</p>
                                <br/>
                                <p>Wizworm is completely unofficial and is in no way endorsed by The Topps Company, Inc. or Catalyst Game Labs. <br/>
                                    The Topps Company, Inc. has sole ownership of the names, logo, artwork, marks, photographs, sounds, audio, video and/or any proprietary
                                    material used in connection with the game Shadowrun.</p>
                                <br/>
                                {this.credits()}
                            </div>
                        )}/>
                        <Route path="/Overview" render={() => (
                            <div>
                                <Overview />
                            </div>
                        )
                        }/>
                        <Route path = '/Attributes' render={() => (
                            <Attributes updateAtt={this.updateAtt}/>
                        )}/>
                        <Route path = '/Skills'>
                            <Skills />
                        </Route>
                        <Route path = '/Knowledge Skills' render={() => (
                            <KnowledgeSkills/>
                        )}/>
                        <Route path = '/Qualities' render={() => (
                            <Qualities/>
                        )}/>
                        <Route path = '/Gear' render={() => (
                            <div>
                                <Gear />
                            </div>
                        )}/>
                        <Route path='/Log' render={() => (<Log />)}/>
                        <Route path='/Action' render={()=>(<Action />)}/>
                    </div>
                </div>
            </Router>
        );
    }
}