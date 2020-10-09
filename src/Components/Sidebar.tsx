import React from 'react'
import '../CSS_Files/Sidebar.css'
import logo from './ComponentsImg/wizwormlogowhite.png'
import {Link} from "react-router-dom";
import Save from "./Save&Upload/Save";
import Upload from './Upload';

/**
 * Class for the Sidebar of the site. It contains buttons with links to every page. An associated Route must be added to
 * the Router in App for the link buttons to actually change the page contents.
 */
class Sidebar extends React.Component {
    render(){
        return <div className={'sidebar'}>
            <Link to="/">
                <div className={'sidebarLink'}>
                    <img src={logo} alt="Wizworm Logo"/>
                </div>
            </Link>
            {makeButton('Overview')}
            {makeButton('Attributes')}
            {makeButton('Skills')}
            {makeButton('Knowledge Skills')}
            {makeButton('Qualities')}
            {makeButton('Gear')}
            {makeButton('Log')}
            {makeButton('Action')}
            <Save />
            <Upload />
        </div>
    }
}

/**
 * Creates a button with a link to the specified text.
 * @param labelText The text displayed on the button and the route navigated to when the button is clicked.
 * @returns A button which links to the route specified in the label.
 */
function makeButton(labelText: string) {
    return <Link to={'/' + labelText}>
        <h1 className={'sidebarLink'}>
            {labelText}
        </h1>
    </Link>;
}

export default Sidebar