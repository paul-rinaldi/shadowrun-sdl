import React from 'react';  
import '../CSS_Files/Popup.css';  

/**
 * @class represents the basic popup template using react
 * The partial implementation can be found in gear.js
 * The hope is to futher create and customize different popups for various components
 * on the website by creating a form
 */
class Popup extends React.Component {  
  render() {  
  return (  
      <div className='popup'>  
        <div className='popupinner'>  
          <h1>{this.props.text}</h1>  
          <button onClick={this.props.closePopup}>close me</button><br></br>
          <label for="lname">Armor Name:</label>  
          <input type="text" id="lname" name="lname"></input><br></br>

          <button onClick={this.props.send}>send</button><br></br>
        </div>  
      </div>  
    );  
  }  
}  

export default Popup;