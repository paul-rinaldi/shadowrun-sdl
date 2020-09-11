import React from 'react'
import '../Save&Upload/upload&save.css'


class Upload extends React.Component {
    /**
     * passes in the props of the character to be used in the button
     * @param props
     */
    constructor(props) {
        super(props);
        this.uploadChar = this.props.upload;
        this.store = this.props.store;
    }
    /**
     * this is the button that will be used on the side bar
     */
    pressUpload = <button onClick={() => this.uploadChar()}>Load Character</button>;


    /**
     * returns the button that will then be used on the side bar
     * @returns {*}
     */
    render() {
        return (
            <div className={'uploadSave'}>
                {this.pressUpload}
            </div>
        )
    }

}
export default Upload;