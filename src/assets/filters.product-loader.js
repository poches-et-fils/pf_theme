window.poches.filters.productsLoaded = false;

if(typeof window.poches === "undefined") window['poches'] = {};
if(typeof window.poches.filters === "undefined") window.poches['filters'] = {};
window.poches.filters['productLoader'] = function () {
  var filterData = false;

  /**
   * Set the Filter Data object for use when loading data.
   * @param {poches.filters.data} newFilterData Filter Data Object.
   */
  this.setFilterData = function (newFilterData) {
    filterData = newFilterData;
  }

  /**
   * Loads a page and triggers loading of the following page until an empty page is returned.
   * @param {*} pageNum Page number to start with (Starts with 1, not 0-indexed)
   */
  this.loadProductPage = function (pageNum = 1, callback = false) {
    if(filterData === false) {
      throw new Error('Filter Data Must Be Set Before Loading Data.');
    }
    var response = {'products': window.collectionData['all-designs']};
    if(response['products'].length > 0) {
      for(var i = 0;i < response['products'].length; i++) {
        var productAttributes = {};
        var productImage = '';
        if(response['products'][i]['images'] && response['products'][i]['images'][0]) {
          productImage = response['products'][i]['images'][0];
        }
        filterData.addDesignProduct(response['products'][i]['title'], productImage, response['products'][i]['handle']);
      }

      window.poches.filters.productsLoaded = true;
      if(callback !== false) callback();
    }
  }

  this.loadStandardProductsPage = function (collection, tags, pageNum = 1, callback = false) {
    if(filterData === false) {
      throw new Error('Filter Data Must Be Set Before Loading Data.');
    }
    var response = {'products': window.collectionData[collection]};
    if(response['products'].length > 0) {
      for(var i = 0;i < response['products'].length; i++) {
        var productMatch = true;
        if(tags.length == 1 && tags[0] == '') {
          tags = [];
        }
        for(var j = 0;j < tags.length;j++) {
          if(response['products'][i]['tags'].indexOf(tags[j]) === -1) {
            productMatch = false;
          }
        }
        if(productMatch) {
          var productImage = '';
          if(response['products'][i]['images'] && response['products'][i]['images'][0]) {
            productImage = response['products'][i]['images'][0];
          }
          filterData.addGenericProduct(response['products'][i]['title'], productImage, response['products'][i]['handle'], response['products'][i]['variants'][0]['price'], response['products'][i]['variants'][0]['id']);
        }
      }
      window.poches.filters.productsLoaded = true;
      if(callback !== false) callback();
    }
  }
}