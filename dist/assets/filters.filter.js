if(typeof window.poches === "undefined") window['poches'] = {};
if(typeof window.poches.filters === "undefined") window.poches['filters'] = {};
window.poches.filters['filter'] = function () {
  var filterData = false;
  var filters = [];

  /**
   * Set the Filter Data object for use when loading data.
   * @param {poches.filters.data} newFilterData Filter Data Object.
   */
  this.setFilterData = function (newFilterData) {
    filterData = newFilterData;
  }

  this.applyDesignFilter = function (designName) {
    filters['name'] = designName;
  }

  this.applyGenderFilter = function (gender) {
    filters['gender'] = gender;
  }

  this.applyTypeFilter = function (type) {
    filters['type'] = type;
  }

  this.getFilteredDisplayProducts = function () {
    if(filterData === false) {
      throw new Error('Filter Data Must Be Set Before Loading Data.');
    }
    var displayProducts = filterData.getDisplayProducts();
    var filteredDisplayProducts = [];
    for(var i = 0;i < displayProducts.length; i++) {
      var productMatch = true;
      if(displayProducts[i]['type'] === 'custom') {
        if(filters['name'] && displayProducts[i]['name'] != filters['name']) {
          productMatch = false;
        }
      } else {
        for(var filterKey in filters) {
          if(filters[filterKey].indexOf(',') !== -1) {
            var filterValues = filters[filterKey].split(',');
            var multiFilterMatch = false;
            for(var j = 0;j < filterValues.length;j++) {
              if(displayProducts[i][filterKey] == filterValues[j]) {
                multiFilterMatch = true;
              }
            }
            if(!multiFilterMatch) {
              productMatch = false;
            }
          } else {
            if(displayProducts[i][filterKey] != filters[filterKey]) {
              productMatch = false;
            }
          }
        }
      }
      if(productMatch) filteredDisplayProducts.push(displayProducts[i]);
    }
    return filteredDisplayProducts;
  }
}