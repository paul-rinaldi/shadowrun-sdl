import React from "react";
import Save from "./Save&Upload/Save";

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.uploadChar = this.props.upload;
        this.store = this.props.store;
    }

// <button onClick={this.handleLoadButton}>Load Character</button>
// <Save save={this.download}/>
// {/*This input is not displayed, it is triggered by the button above*/}
// <input type={'file'} ref={this.inputRef} onChange={(e) => this.handleFileChosen(e)} style={{display: 'none'}}/>

    pressUpload = <div>
        <button onClick={this.handleLoadButton}>Load Character</button>
        {/*This input is not displayed, it is triggered by the button above*/}
        <input type={'file'} ref={this.inputRef} onChange={(e) => this.handleFileChosen(e)} style={{display: 'none'}}/>
    </div>;

    return() {
        return (<div>
            {this.pressUpload}
        </div>)
    }
}
export default Upload;