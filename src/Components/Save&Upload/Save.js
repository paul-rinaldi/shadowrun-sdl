import React from 'react'
import '../Save&Upload/upload&save.css'

class Save extends React.Component {

    /**
     * passes in the props of the character to be used in the button
     * @param props
     */
    constructor(props) {
        super(props);
        this.downloadChar = this.props.save;
        this.store = this.props.store;
    }

    /**
     * this is the button that will be used on the side bar
     */
    pressSave = <button onClick={() => this.downloadChar()}>Save Character</button>;

    /**
     * returns the button that will then be used on the side bar
     * @returns {*}
     */
    render() {
        return (
            <div className={'uploadSave'}>
                {this.pressSave}
            </div>
        )
    }

}
export default Save;