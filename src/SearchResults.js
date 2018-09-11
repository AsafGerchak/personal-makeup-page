import React, { Component } from 'react';

class SearchResults extends Component {
  constructor() {
    super();
    this.state = {
      selectedProducts: {}
    }
  }

  // Function for when a product on the age is checked/unchecked:
  productSelected = (productID, productName, productBrand, productImage) => {
    // Clone the current state into a new object:
    let newProductList = this.state.selectedProducts;
    
    // Use the unique productID key to check if the product is already in the object. If it is, delete it, and if it isn't, then add the product details as a new entry. Either way, use the new object to update the state:
    if (newProductList[productID]) {
      delete newProductList[productID];
      this.setState({
        selectedProducts: newProductList
      })
    } else {
      newProductList[productID] = {
        id: productID,
        name: productName,
        brand: productBrand,
        image: productImage
      };
      this.setState({
        selectedProducts: newProductList
      })
    }
  }

  // Function for when the user clicks to save their selected products:
  saveSelectedProducts = (e) => {
    e.preventDefault();

    // Pass the list of saved products (in state, saved using the productSelected() function) up through props to the function in App.js that will add the products to Firebase:
    this.props.saveProductList(this.state.selectedProducts);
  }

  render() {
    return(
      <form className="searchResults" onSubmit={this.saveSelectedProducts}>
        {
          this.props.listOfProducts.length > 0
          &&  <header className="resultsHeader">
                <h2>Here are those files you asked for sir</h2>
                <input type="submit" value="Save my selections" />
              </header>
        }

        {this.props.listOfProducts.map((product) => {
          return (
            <div key={product.id} className="productListing">
              <input onChange={() => this.productSelected(product.id, product.name, product.brand, product.image_link)} type="checkbox" name="makeupProduct" id={product.id} value={product.name} />
              <label className="productInfo" htmlFor={product.id}>
                <img src={product.image_link} alt="" />
                <div className="productName">
                  <span><strong>{product.name}</strong></span>
                  <span>by {product.brand}</span>
                </div>
              </label>
            </div>
          )
        })}
      </form>
    )
  }
}

export default SearchResults;