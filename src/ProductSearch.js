import React, { Component } from 'react';
import firebase from './firebase';

class ProductSearch extends Component {
  constructor() {
    super();
    this.state = {
      brandOptions: [],
      typeOptions: [],
      makeupBrand: '',
      makeupType: ''
    }
  }

  componentDidMount() {
    // Create a reference to the saved app info in the database (saved there just so I don't have to have arrays just kind of floating in my JS, and so I can practice Firebase shizzzzz):
    const dbRefInfo = firebase.database().ref('/appInfo');

    // Pull in the appInfo from Firebase and use it to set the two arrays in state which will populate the drop-down inputs on the page:
    dbRefInfo.on('value', (snapshot) => {
      this.setState({
        brandOptions: snapshot.val().brands,
        typeOptions: snapshot.val().types
      });
    })
  }

  // Function for when a user selects a brand and/or product type. This stores the selection in state so it can be passed to the search when they press that:
  selectionMade = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  // Function called when the user hits the search (ie. submit) button:
  searchButtonPressed = (e) => {
    e.preventDefault();

    this.props.productSearch(this.state.makeupBrand, this.state.makeupType);
  }

  render() {
    return (
      <form onSubmit={this.searchButtonPressed} className="productSearch">

        <h2>Search by brand or product type</h2>
        <h3>Or both! Whatever you want!</h3>
        <p>Look, I can't make these decisions for you, live your own life</p>

        <div className="formSection">
          <label htmlFor="makeupBrand">Brand</label>
          <select onChange={this.selectionMade} name="makeupBrand" id="makeupBrand">
            <option value="">(no brand selected)</option>
            {this.state.brandOptions.map((brandName) => {
              return <option key={brandName} value={brandName}>{brandName}</option>
            })}
          </select>
        </div>

        <div className="formSection">
          <label htmlFor="makeupType">Product Type</label>
          <select onChange={this.selectionMade} name="makeupType" id="makeupType">
            <option value="">(no product type selected)</option>
            {this.state.typeOptions.map((typeName) => {
              return <option key={typeName} value={typeName}>{typeName}</option>
            })}
          </select>
        </div>

        <input type="submit" value="search" />
      
      </form>
    );
  }
}

export default ProductSearch;