import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class HelloBaseball extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display: null
    }
  }

  handleChange(event) {
    axios.get(`http://localhost:4842/depth/${event.target.value}`)
      .then(function(data) {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(data.data, 'text/xml')
        console.log(xmlDoc)
      })
  }



  render() {
    return (
      <div>
        <div>Hello Baseball</div>
        <DepthDropDown handleChange={this.handleChange.bind(this)}/>
      </div>
    )
  }
}

function DepthDropDown({handleChange}) {
  return (
    <div>
      <label htmlFor="depth">Choose a Team</label>
      <select onChange={handleChange} name="depth">
        <option value="CLE">Cleveland Indians</option>
        <option value="NYY">New York Yankees</option>
        <option value="TB">Tampa Bay Rays</option>
        <option value="TOR">Toronto Blue Jays</option>
      </select>
    </div>
  )
}


ReactDOM.render(<HelloBaseball/>, document.querySelector('#root'));