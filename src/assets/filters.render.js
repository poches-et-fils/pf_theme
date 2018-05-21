if(typeof window.poches === "undefined") window['poches'] = {};
if(typeof window.poches.filters === "undefined") window.poches['filters'] = {};
window.poches.filters['render'] = function () {
  this.renderProductGridItem = function (displayProduct) {
    var productLink = productLink = '/products/' + displayProduct['handle'];
    var productDisplayName = displayProduct['name'];
    if(displayProduct['type'] !== 'custom') {
      productLink = productLink + '/?gender=' + displayProduct['gender'] + '&type=' + displayProduct['type'];
      productDisplayName = productDisplayName + ' (' + displayProduct['gender'] + ' / ' + displayProduct['type'] + ')';
    }
    return '<a href="' + productLink + '" class="product--grid--item--four three--row w-inline-block" title="' + displayProduct['name'] + '"><div class="product--grid--item--image random-colored-bg" style="background-color: rgba(255, 247, 220, 0.76);"><div class="product--grid--item--variant--overlay"><img src="' + displayProduct['image'] + '" width="100%" height="100%"></div><div class="product--quickadd"><strong class="product--quickadd--CTA">+ QUICK ADD</strong><div class="product--quickadd--sizes product--design--selector--grid flex-row"><div class="product--size--selector">XS</div><div class="product--size--selector">S</div><div class="product--size--selector">M</div><div class="product--size--selector">L</div><div class="product--size--selector">XL</div><div class="product--size--selector">XXL</div></div></div></div><h5 class="product--grid--item--title">' + productDisplayName + '</h5><div>$' + displayProduct['price'] + '</div><div class="light-gray"><u><small>See more styles</small></u></div></a>';
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