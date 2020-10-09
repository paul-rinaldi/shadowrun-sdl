import React from 'react'
import { connect } from 'react-redux';
import { IShadowRunState } from '../../redux/store';
import '../Save&Upload/upload&save.css'

type ISaveProps = ReturnType<typeof mapStateToProps>;
const mapStateToProps = (state: IShadowRunState) => ({
    character: state.player
});

class Save extends React.Component<ISaveProps> {
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
                <button onClick={this.downloadChar}>Save Character</button>
            </div>
        );
    }

    downloadChar = () => {
        const { character } = this.props;
        console.log(character);
        //doint do anything if its not there
        if(!character || character.name === ""){
            alert("There was an error while uploading your character");
        }else {
            //set name
            let filename = character.name + ".json";
            //type
            let contentType = "application/json;charset=utf-8;";
            //opens a save dialog
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                const blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(character)))], {type: contentType});
                navigator.msSaveOrOpenBlob(blob, filename);
            } else {
                //saves
                const a = document.createElement('a');
                a.download = filename;
                a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(character));
                a.target = '_blank';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        }
    }

}
export default connect(
    mapStateToProps
)(Save)