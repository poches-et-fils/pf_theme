if(typeof window.poches === "undefined") window['poches'] = {};
if(typeof window.poches.filters === "undefined") window.poches['filters'] = {};
window.poches.filters['init'] = function () {
  // Init classes as singletons...
  window.poches.filters.helper = new window.poches.filters.helper();
  window.poches.filters.data = new window.poches.filters.data();
  window.poches.filters.productLoader = new window.poches.filters.productLoader();
  window.poches.filters.productLoader.setFilterData(window.poches.filters.data);
  window.poches.filters.filter = new window.poches.filters.filter();
  window.poches.filters.filter.setFilterData(window.poches.filters.data);
  window.poches.filters.render = new window.poches.filters.render();

  //Init product design types
  window.poches.filters.data.addDesignProductType('T-Shirt', 'Men');
  window.poches.filters.data.addDesignProductType('T-Shirt', 'Women');
  window.poches.filters.data.addDesignProductType('T-Shirt', 'Kid');
  window.poches.filters.data.addDesignProductType('T-Shirt', 'Baby');
  window.poches.filters.data.addDesignProductType('Sweatshirt', 'Men');
  window.poches.filters.data.addDesignProductType('Sweatshirt', 'Women');
  window.poches.filters.data.addDesignProductType('Tank-Top', 'Men');
  window.poches.filters.data.addDesignProductType('Tank-Top', 'Women');
  window.poches.filters.data.addDesignProductType('V-Neck', 'Men');
  window.poches.filters.data.addDesignProductType('V-Neck', 'Women');

  //Start loading products...
  window.poches.filters.productLoader.loadProductPage(1, function () {
    window.poches.filters.productLoader.loadStandardProductsPage(jQuery('.product-grid-filters').attr('data-filter-collection'), jQuery('.product-grid-filters').attr('data-filter-tags').split(','), 1, function () {
      jQuery('.product-grid-filters').each(function () {
        if(jQuery(this).attr('data-filter-gender')) {
          console.log('Applying Gender filter...' + jQuery(this).attr('data-filter-gender'));
          window.poches.filters.filter.applyGenderFilter(jQuery(this).attr('data-filter-gender'));
        }
        if(jQuery(this).attr('data-filter-type')) {
          window.poches.filters.filter.applyTypeFilter(jQuery(this).attr('data-filter-type'));
        }
        if(window.poches.filters.helper.gup('design') != '') {
          window.poches.filters.filter.applyDesignFilter(window.poches.filters.helper.gup('design'));
        }
        jQuery(this).html(window.poches.filters.render.renderProductGrid(window.poches.filters.filter.getFilteredDisplayProducts()));
      });
      jQuery(window).scroll(function () {
        if(jQuery(document).height() - 350 < (jQuery(window).scrollTop() + jQuery(window).height())) {
          jQuery('.product-pagination-page:hidden').first().show();
        }
      });
    });
  });
}
