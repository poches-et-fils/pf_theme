if(typeof window.poches === "undefined") window['poches'] = {};
if(typeof window.poches.filters === "undefined") window.poches['filters'] = {};
window.poches.filters['data'] = function () {
  var products = [];
  var genericProducts = [];
  var productTypes = [];

  /**
   * Add a generic product.
   */
  this.addGenericProduct = function (productName, productImage, productHandle, productPrice) {
    genericProducts.push({name: productName, image: productImage, handle: productHandle, type: 'custom', price: productPrice});
  }

  /**
   * Add a design product type
   * @param {String} productType 
   */
  this.addDesignProductType = function (type, gender) {
    productTypes.push({type: type, gender: gender});
  }

  /**
   * Add a design.
   * @param {String} productName Product Name
   * @param {String} productImage Product Image URL
   * @param {String} productHandle Shopify Product Handle
   */
  this.addDesignProduct = function (productName, productImage, productHandle, productAttributes) {
    var newProduct = {name: productName, image: productImage, handle: productHandle}
    products.push(newProduct);
  }

  this.getDisplayProducts = function () {
    var displayProducts = [];
    for(var i = 0;i < productTypes.length; i++) {
      for(var j = 0;j < products.length; j++) {
        // JSONifying to retrieve byVal instead of byRef.
        var newDisplayProduct = JSON.parse(JSON.stringify(products[j]));
        newDisplayProduct['type'] = productTypes[i]['type'];
        newDisplayProduct['gender'] = productTypes[i]['gender'];
        displayProducts.push(newDisplayProduct);
      }
    }
    for(var i = 0;i < genericProducts.length; i++) {
      displayProducts.push(JSON.parse(JSON.stringify(genericProducts[i])));
    }
    return displayProducts;
  }

  this.getProducts = function () {
    return products;
  }
  this.getProductTypes = function () {
    return productTypes;
  }

}