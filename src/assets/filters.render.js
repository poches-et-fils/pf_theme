if(typeof window.poches === "undefined") window['poches'] = {};
if(typeof window.poches.filters === "undefined") window.poches['filters'] = {};
window.poches.filters['render'] = function () {
  this.renderProductGridItem = function (displayProduct) {
    var productLink = productLink = '/products/' + displayProduct['handle'];
    var productDisplayName = displayProduct['name'];
    var backgroundImage = 'none';
    var productImage = '<img src="' + displayProduct['image'] + '" style="max-width:100%;max-height:100%;" />';
    var dataAttributes = [];
    if(displayProduct['type'] !== 'custom') {
      productLink = productLink + '/?gender=' + displayProduct['gender'] + '&type=' + displayProduct['type'] + '&color=' + displayProduct['color'];
      backgroundImage = 'url(' + getRandImg(['gender=' + displayProduct['gender'], 'color=' + displayProduct['color'], 'type=' + displayProduct['type']], false) + ')';
      productImage = '<img src="' + displayProduct['image'] + '" style="width:25px;height:25px;position:relative;top:-30px; left: -85px;" />';
      dataAttributes.push('data-quickadd-info');
      dataAttributes.push('data-product-handle="' + displayProduct['handle'] + '"');
      dataAttributes.push('data-option-color="' + displayProduct['color'] + '"');
      dataAttributes.push('data-option-type="' + displayProduct['type'] + '"');
      dataAttributes.push('data-option-gender="' + displayProduct['gender'] + '"');
    }

    return '<a href="' + productLink + '" class="product--grid--item--four three--row w-inline-block" title="' + displayProduct['name'] + '" '+ dataAttributes.join(' ') +'><div class="product--grid--item--image random-colored-bg" style="background-color: rgba(255, 247, 220, 0.76);"><div class="product--grid--item--variant--overlay" style="background-image:' + backgroundImage + ';">' + productImage + '</div><div class="product--quickadd"><strong class="product--quickadd--CTA">+ QUICK ADD</strong><div class="product--quickadd--sizes product--design--selector--grid flex-row"><div class="product--size--selector">XS</div><div class="product--size--selector">S</div><div class="product--size--selector">M</div><div class="product--size--selector">L</div><div class="product--size--selector">XL</div><div class="product--size--selector">XXL</div></div></div></div><h5 class="product--grid--item--title">' + productDisplayName + '</h5><div>$' + displayProduct['price'] + '</div><div class="light-gray"><u><small>See more styles</small></u></div></a>';
  };

  this.renderProductGrid = function (displayProducts) {
    var html = '<div class="product-pagination-page">';
    for(var i = 0;i<displayProducts.length;i++) {
      if(i%9 == 0 && i != 0) {
        html = html + '</div><div class="product-pagination-page" style="display: none;">';
      }
      html = html + window.poches.filters.render.renderProductGridItem(displayProducts[i]);
    }
    html = html + '</div>';
    return html;
  };
}