import React from 'react';
import './CSS_Files/App.css';
//import components
import Overview from './Components/Overview'
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
                    {/* <input type={'file'} ref={this.inputRef} onChange={(e) => this.handleFileChosen(e)} style={{display: 'none'}}/> */}

                    <Header />
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
                            <Attributes />
                        )}/>
                        <Route path = '/Skills'>
                            <Skills />
                        </Route>
                        <Route path = '/Knowledge Skills' render={() => (
                            <KnowledgeSkills/>
                        )}/>
                        <Route path = '/Qualities' render={() => (
                            <Qualities />
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