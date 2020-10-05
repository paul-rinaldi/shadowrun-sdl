import React, { FormEvent } from "react";
import FormFileInput from "react-bootstrap/FormFileInput";
import { connect } from "react-redux";
import { InputFiles } from "typescript";
import { IShadowRunState } from "../redux/store";
import { showFileChooser, uploadPlayerJSON } from "../redux/uploadActions";

type IUploadProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const mapStateToProps = (state: IShadowRunState) => ({
    choosingFile: state.uploading.choosingFile,
    fileRef: React.createRef<HTMLInputElement>()
});
const mapDispatchToProps = {
    onShow: showFileChooser
};


class Upload extends React.Component<IUploadProps> {
    render() {
        const { choosingFile, fileRef }  = this.props;
        return(
            <div>
                <button onClick={this.showFileChooser}>Load Character</button>
                <input type="file" ref={fileRef} style={{display: 'none'}} accept='json' onChange={this.uploadFile}/>
            </div>
        );
    }
    
    showFileChooser = (event: FormEvent<HTMLButtonElement>): void => {
        const { onShow, fileRef } = this.props;
        fileRef.current?.click();
        onShow();
    }

    uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                if (!event.target?.result || typeof(event.target.result) !== "string")
                    throw new Error("Result unreadable");
                let characterData = JSON.parse(event.target.result);
                uploadPlayerJSON(characterData);
            } catch (e) {
                alert("There was an error loading the file.");
            }
        }
        try {
            if (!event.target?.files || !event.target.files[0])
                throw new Error("Can't read file.")
            reader.readAsText(event.target.files[0]);
        } catch (e) {
            alert("There was an error reading the file.");
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Upload)