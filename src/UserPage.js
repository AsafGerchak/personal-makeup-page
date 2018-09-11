import React, { Component } from 'react';
import firebase from 'firebase';

class UserPage extends Component {
  constructor() {
    super();
    this.state = {
      userSelections: [],
      userBackground: {
        background: ''
      }
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.dbRefUserData = firebase.database().ref(`/userLists/${user.uid}`);
        this.populatePage();
      };
    });
  }

  populatePage = () => {
    this.dbRefUserData.on('value', (snapshot) => {
      const productList = snapshot.val();
      let userProducts = [];

      for (let product in productList) {
        userProducts.push(productList[product]);
      };

      this.setState({
        userSelections: userProducts
      });
    });
  }

  componentDidUpdate() {
    if (this.props.loginStatus === false) {
      this.dbRefUserData.off();
    }
  }

  colorPick = (e) => {
    this.setState({
      userBackground: {
        background: e.target.value
      }
    });
  }

  render() {
    return (
      <div style={this.state.userBackground}>
        <h1>Lookit this cute page you've got</h1>
        
        {this.state.userSelections.map((product) => {
          return(
            <div key={product.id} className="productListing">
              <div className="productInfo">
                <img src={product.image} alt="" />
                <div className="productName">
                  <span><strong>{product.name}</strong></span>
                  <span>by {product.brand}</span>
                </div>
              </div>
            </div>
          );
        })}

        <h3>Oh hey what color you want this shit to be?</h3>
        <input type="color" onChange={this.colorPick} />
      </div>
    );
  }
}

export default UserPage;