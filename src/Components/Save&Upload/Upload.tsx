import React from "react";
import { connect } from "react-redux";
import { IShadowRunState } from "../../redux/store";
import { showFileChooser } from "../../redux/actions/uploadActions";
import { ICharacter } from "../../models/playerModels";
import "../Save&Upload/upload&save.css";
import { setArmorAction } from "../../redux/actions/armorActions";
import { setAttributes } from "../../redux/actions/attributeAction";
import { setAugmentationDeck } from "../../redux/actions/augmentationAction";
import { setConditionMonitor } from "../../redux/actions/conditionActions";
import { setCyberDeck } from "../../redux/actions/cyberDeckActions";
import { setEdge } from "../../redux/actions/edgeActions";
import { setGear } from "../../redux/actions/gearAction";
import { setID } from "../../redux/actions/idAction";
import { setImage } from "../../redux/actions/imageActions";
import { setInitiative } from "../../redux/actions/initiativeAction";
import { setKarma } from "../../redux/actions/karmaActions";
import { setKSkill } from "../../redux/actions/knowledgeSkillsActions";
import { setLifestyle } from "../../redux/actions/lifestyleActions";
import { setLog } from "../../redux/actions/logActions";
import { setMetaType } from "../../redux/actions/metatypeActions";
import { setName } from "../../redux/actions/nameActions";
import { setNuyen } from "../../redux/actions/nuyenActions";
import { SetPersonal } from "../../redux/actions/personalActions";
import { setQualities } from "../../redux/actions/qualityActions";
import { setRitPrepPitComplexAction } from "../../redux/actions/ritPrepPitComplexActions";
import { setSkills } from "../../redux/actions/skillActions";

type IUploadProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;
const mapStateToProps = (state: IShadowRunState) => ({
  choosingFile: state.uploading.choosingFile,
  fileRef: React.createRef<HTMLInputElement>(),
});
const mapDispatchToProps = {
  setName,
  setMetaType,
  setNuyen,
  setKarma,
  setEdge,
  setConditionMonitor,
  SetPersonal,
  setAttributes,
  setImage,
  setInitiative,
  setArmorAction,
  setLifestyle,
  setID,
  setSkills,
  setKSkill,
  setQualities,
  setAugmentationDeck,
  setRitPrepPitComplexAction,
  setCyberDeck,
  setGear,
  setLog,
  onShow: showFileChooser,
};

class Upload extends React.Component<IUploadProps> {
  render() {
    const { fileRef } = this.props;
    return (
      <div className={"uploadSave"}>
        <button onClick={() => this.showFileChooser()}>Load Character</button>
        <input
          type="file"
          ref={fileRef}
          style={{ display: "none" }}
          accept="json"
          onChange={this.uploadFile}
        />
      </div>
    );
  }

  showFileChooser = () => {
    const { onShow, fileRef } = this.props;
    fileRef.current?.click();
    onShow();
  };

  uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        if (!event.target?.result || typeof event.target.result !== "string")
          throw new Error("Result unreadable");
        let characterData = JSON.parse(event.target.result);
        console.log("cData", characterData);

        const characterObject = characterData as ICharacter;
        if (this.isValidCharacter(characterObject)) {
          this.uploadCharacter(characterObject);
        } else {
          alert("The JSON file does not contain all valid properties.");
        }
      } catch (e) {
        alert("There was an error loading the file. " + e);
      }
    };
    try {
      if (!event.target?.files || !event.target.files[0])
        throw new Error("Can't read file.");
      reader.readAsText(event.target.files[0]);
    } catch (e) {
      alert("There was an error reading the file.");
    }
  };

  isValidCharacter = (character: ICharacter) => {
    return true; // TODO: Validate
  };

  uploadCharacter = (player: ICharacter) => {
    const {
      setName,
      setMetaType,
      setNuyen,
      setKarma,
      setEdge,
      setConditionMonitor,
      SetPersonal,
      setAttributes,
      setImage,
      setInitiative,
      setArmorAction,
      setLifestyle,
      setID,
      setSkills,
      setKSkill,
      setQualities,
      setAugmentationDeck,
      setRitPrepPitComplexAction,
      setCyberDeck,
      setGear,
      setLog,
    } = this.props;
    console.log("player", player);

    setName(player.name);
    setMetaType(player.metatype);
    setNuyen(player.money);
    setKarma(player.karma);
    setEdge(player.currentEdge);
    setConditionMonitor(player.conditionMonitor);
    SetPersonal(player.personal);
    setAttributes(player.attributes);
    setImage(player.img);
    setInitiative(player.initiative);
    setArmorAction(player.armor);
    setLifestyle(player.lifestyle);
    setID(player.ID);
    setSkills(player.skills);
    setKSkill(player.knowledgeSkills);
    setQualities(player.qualities);
    setAugmentationDeck(player.augmentations);
    setRitPrepPitComplexAction(player.RitPrepRitComplex);
    setCyberDeck(player.cyberdeck);
    setGear(player.gear);
    setLog(player.log);
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
