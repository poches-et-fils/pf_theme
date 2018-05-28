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
  window.poches.filters.data.addDesignProductType('T-Shirt', 'Men', 'Black', 9.99);
  window.poches.filters.data.addDesignProductType('T-Shirt', 'Men', 'White', 9.99);
  window.poches.filters.data.addDesignProductType('T-Shirt', 'Men', 'Grey', 9.99);
  window.poches.filters.data.addDesignProductType('T-Shirt', 'Men', 'Dark-Grey', 9.99);
  
  window.poches.filters.data.addDesignProductType('T-Shirt', 'Women', 'Black', 9.99);
  window.poches.filters.data.addDesignProductType('T-Shirt', 'Women', 'White', 9.99);
  window.poches.filters.data.addDesignProductType('T-Shirt', 'Women', 'Grey', 9.99);
  window.poches.filters.data.addDesignProductType('T-Shirt', 'Women', 'Dark-Grey', 9.99);

  window.poches.filters.data.addDesignProductType('T-Shirt', 'Kid', 'Black', 9.99);
  window.poches.filters.data.addDesignProductType('T-Shirt', 'Kid', 'White', 9.99);
  window.poches.filters.data.addDesignProductType('T-Shirt', 'Kid', 'Dark-Grey', 9.99);

  window.poches.filters.data.addDesignProductType('T-Shirt', 'Baby', 'Black', 9.99);
  window.poches.filters.data.addDesignProductType('T-Shirt', 'Baby', 'White', 9.99);
  window.poches.filters.data.addDesignProductType('T-Shirt', 'Baby', 'Dark-Grey', 9.99);

  window.poches.filters.data.addDesignProductType('Sweatshirt', 'Men', 'Black', 12.99);
  window.poches.filters.data.addDesignProductType('Sweatshirt', 'Men', 'White', 12.99);
  window.poches.filters.data.addDesignProductType('Sweatshirt', 'Men', 'Burgundy', 12.99);
  window.poches.filters.data.addDesignProductType('Sweatshirt', 'Men', 'Navy', 12.99);

  window.poches.filters.data.addDesignProductType('Sweatshirt', 'Women', 'Black', 12.99);
  window.poches.filters.data.addDesignProductType('Sweatshirt', 'Women', 'White', 12.99);
  window.poches.filters.data.addDesignProductType('Sweatshirt', 'Women', 'Burgundy', 12.99);
  window.poches.filters.data.addDesignProductType('Sweatshirt', 'Women', 'Navy', 12.99);

  window.poches.filters.data.addDesignProductType('Tank-Top', 'Men', 'Black', 8.99);
  window.poches.filters.data.addDesignProductType('Tank-Top', 'Men', 'White', 8.99);
  window.poches.filters.data.addDesignProductType('Tank-Top', 'Men', 'Dark-Grey', 8.99);

  window.poches.filters.data.addDesignProductType('Tank-Top', 'Women', 'Black', 8.99);
  window.poches.filters.data.addDesignProductType('Tank-Top', 'Women', 'White', 8.99);
  window.poches.filters.data.addDesignProductType('Tank-Top', 'Women', 'Dark-Grey', 8.99);

  window.poches.filters.data.addDesignProductType('V-Neck', 'Women', 'Black', 10.99);
  window.poches.filters.data.addDesignProductType('V-Neck', 'Women', 'White', 10.99);
  window.poches.filters.data.addDesignProductType('V-Neck', 'Women', 'Grey', 10.99);
  window.poches.filters.data.addDesignProductType('V-Neck', 'Women', 'Dark-Grey', 10.99);

  //Start loading products...
  window.poches.filters.productLoader.loadProductPage(1, function () {
    window.poches.filters.productLoader.loadStandardProductsPage(jQuery('.product-grid-filters').attr('data-filter-collection'), jQuery('.product-grid-filters').attr('data-filter-tags').split(','), 1, function () {
      jQuery('.product-grid-filters').each(function () {
        if(jQuery(this).attr('data-filter-gender')) {
          window.poches.filters.filter.applyGenderFilter(jQuery(this).attr('data-filter-gender'));
        }
        if(jQuery(this).attr('data-filter-type')) {
          window.poches.filters.filter.applyTypeFilter(jQuery(this).attr('data-filter-type'));
        }
        if(window.poches.filters.helper.gup('design') != '') {
          window.poches.filters.filter.applyDesignFilter(window.poches.filters.helper.gup('design'));
        }
        if(window.poches.filters.helper.gup('color') != '') {
          window.poches.filters.filter.applyColorFilter(window.poches.filters.helper.gup('color'));
          $('ul.colors-container li[title='+window.poches.filters.helper.gup('color')+']').addClass('selected-color');
        }
        jQuery(this).html(window.poches.filters.render.renderProductGrid(window.poches.filters.helper.shuffle(window.poches.filters.filter.getFilteredDisplayProducts())));
        fillBg();

      });
      jQuery(window).scroll(function () {
        if(jQuery(document).height() - 350 < (jQuery(window).scrollTop() + jQuery(window).height())) {
          jQuery('.product-pagination-page:hidden').first().show();
        }
      });
    });
  });
  $('ul.colors-container li').click(function () {
    window.poches.filters.helper.uup('color', $(this).attr('title'));
  });
  $('.pocket-swatch-filter').click(function () {
    window.poches.filters.helper.uup('design', $(this).attr('title').replace(/\s/g, '+'));
  });
}