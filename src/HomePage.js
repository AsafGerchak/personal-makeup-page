import React, { Component } from 'react';
import axios from 'axios';
import Qs from 'qs';
import firebase from './firebase';
import { Link } from 'react-router-dom';

// COMPONENTS
import ProductSearch from './ProductSearch';
import SearchResults from './SearchResults';

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      productList: [],
      userKey: '',
      hasProducts: false
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userID = user.uid
        this.dbRefUserLists = firebase.database().ref(`/userLists/${userID}`);
        this.setState({
          userKey: userID
        });
      }
      this.buttonCheck();
    });
  }

  buttonCheck = () => {
    this.dbRefUserLists.on('value', (snapshot) => {
      if (snapshot.val()) {
        this.setState({
          hasProducts: true
        });
      } else {
        this.setState({
          hasProducts: false
        });
      };
    })
  }


  // Function to search for products, using parameters from the select inputs (picked up and submitted in ProductSearch.js) to make an AJAX call:
  productSearch = (brandName, productType) => {
    axios({
      method: 'GET',
      url: 'https://proxy.hackeryou.com',
      dataResponse: 'json',
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: 'brackets' })
      },
      params: {
        reqUrl: 'http://makeup-api.herokuapp.com/api/v1/products.json',
        params: {
          brand: brandName,
          product_type: productType
        },
        xmlToJSON: false
      }
    })
      .then(({ data }) => {
        this.setState({
          productList: data
        });
      });
  }

  // Function to take the user's selected products from their search (grabbed from SearchResults.js) and save them to Firebase under the UserID associated with their logged-in user profile:
  saveProductList = (selectedProductsObject) => {
    this.dbRefUserLists.update(selectedProductsObject);
  }

  render() {
    return (
        <div>
          <ProductSearch productSearch={this.productSearch} />

          {this.state.hasProducts
            &&  <div>
                  <p>Hey whoa you've already saved a bunch of products</p>
                  <Link to={`/userPage/${this.state.userKey}`}>Check 'em out here</Link>
                </div>
          }

          <SearchResults listOfProducts={this.state.productList} saveProductList={this.saveProductList} />
        </div>
    );
  }
}

export default HomePage;