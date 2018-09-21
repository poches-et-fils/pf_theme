import productDesigns from '../designs/product-designs';
import relatedProducts from './related-products';

/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
   * @namespace product
 */

export default (function() {

  var selectors = {
    addToCart: '[data-add-to-cart]',
    addToCartForm: '[data-add-to-cart-form]',
    addToCartText: '[data-add-to-cart-text]',
    comparePrice: '[data-compare-price]',
    comparePriceText: '[data-compare-text]',
    originalSelectorId: '[data-product-select]',
    priceWrapper: '[data-price-wrapper]',
    productFeaturedImage: '[data-product-featured-image]',
    productJson: '[data-product-json]',
    productPrice: '[data-product-price]',
    productThumbs: '[data-product-single-thumbnail]',
    singleOptionSelector: '[data-single-option-selector]',
    color: '[data-color-name]'
  };

  /**
   * Product section constructor. Runs on page load as well as Theme Editor
   * `section:load` events.
   * @param {string} container - selector for the section container DOM element
   */
  function Product(container) {
    this.$container = $(container);

    // Stop parsing if we don't have the product json script tag when loading
    // section in the Theme Editor
    if (!$(selectors.productJson, this.$container).html()) {
      return;
    }

    var sectionId = this.$container.attr('data-section-id');
    this.productSingleObject = JSON.parse($(selectors.productJson, this.$container).html());

    var options = {
      $container: this.$container,
      enableHistoryState: this.$container.data('enable-history-state') || false,
      singleOptionSelector: selectors.singleOptionSelector,
      originalSelectorId: selectors.originalSelectorId,
      product: this.productSingleObject
    };

    this.settings = {};
    this.namespace = '.product';
    this.variants = new slate.Variants(options);
    this.$featuredImage = $(selectors.productFeaturedImage, this.$container);

    this.$container.on('variantChange' + this.namespace, this.updateAddToCartState.bind(this));
    this.$container.on('variantChange' + this.namespace, this.updateColorOptions.bind(this));
    this.$container.on('variantPriceChange' + this.namespace, this.updateProductPrices.bind(this));

    if (this.$featuredImage.length > 0) {
      this.settings.imageSize = slate.Image.imageSize(this.$featuredImage.attr('src'));
      slate.Image.preload(this.productSingleObject.images, this.settings.imageSize);

      this.$container.on('variantImageChange', this.updateProductImage.bind(this));
    }

    this.initThumbs();
    this.initZoom();
    this.initRelatedProducts();
    this.initProductDesigns();
    this.mobileSlider = this.initMobileSlider();
  }

  Product.prototype = $.extend({}, Product.prototype, {
    initZoom: function() {
      const lightbox = '.product-image-zoom';
      const slider = `${lightbox} .glide`;
      const sliderOptions = {type: 'carousel', perView: 1};
      const glide = new Glide(slider, sliderOptions).mount();
      let glided = false;

      glide.on('move.after', () => {
        this.$featuredImage.attr('src', $(`${lightbox} .glide__slide--active img`).attr('src'));
      });

      this.$featuredImage.click(e => {
        e.preventDefault();
        $(lightbox).addClass('product-image-zoom--zoomed');
        const currentImg = this.$featuredImage.attr('src');
        const startIndex = $(`${lightbox} img[src="${currentImg}"]:first`).data('index');
        glide.update({startAt: startIndex || 0});
      });

      $(`${lightbox}__close`).click(e => {
        e.preventDefault();
        $(lightbox).removeClass('product-image-zoom--zoomed');
      });
    },

    initThumbs: function() {
      if ($(selectors.productThumbs, this.$container).length === 0) {
        return;
      }

      $(selectors.productThumbs, this.$container).on('click', e => {
        e.preventDefault();
        this.$featuredImage.attr('src', $(e.currentTarget).attr('href'));
      });
    },

    initMobileSlider: function() {
      const slider = '.product-image__mobile .glide';
      const sliderOptions = {type: 'carousel', perView: 1};
      return new Glide(slider, sliderOptions).mount();
    },

    initRelatedProducts: function() {
      if ($('.related-products').length === 0) {
        return;
      }

      relatedProducts();
    },

    initProductDesigns: function() {
      if ($('[data-design-json]').length === 0 || $('[data-product-json]').length === 0) {
        return;
      }
  
      const designs = JSON.parse($('[data-design-json]').html());
      productDesigns(designs, this.productSingleObject);
    },

    /**
     * Updates the DOM state of the add to cart button
     *
     * @param {boolean} enabled - Decides whether cart is enabled or disabled
     * @param {string} text - Updates the text notification content of the cart
     */
    updateAddToCartState: function(evt) {
      var variant = evt.variant;

      if (variant && $(selectors.color, this.$container).length > 0) {
        const optionIndex = $(selectors.color, this.$container).data('index');
        $(selectors.color, this.$container).text(variant[optionIndex]);
      }

      if (variant) {
        $(selectors.priceWrapper, this.$container).removeClass('hide');
      } else {
        $(selectors.addToCart, this.$container).prop('disabled', true);
        $(selectors.addToCartText, this.$container).html(theme.strings.unavailable);
        return;
      }

      if (variant.available) {
        $(selectors.addToCart, this.$container).prop('disabled', false);
        $(selectors.addToCartText, this.$container).html(theme.strings.addToCart);
      } else {
        $(selectors.addToCart, this.$container).prop('disabled', true);
        $(selectors.addToCartText, this.$container).html(theme.strings.soldOut);
      }
    },

    /**
     * Updates the DOM with specified prices
     *
     * @param {string} productPrice - The current price of the product
     * @param {string} comparePrice - The original price of the product
     */
    updateProductPrices: function(evt) {
      var variant = evt.variant;
      var $comparePrice = $(selectors.comparePrice, this.$container);
      var $compareEls = $comparePrice.add(selectors.comparePriceText, this.$container);

      $(selectors.productPrice, this.$container)
        .html(slate.Currency.formatMoney(variant.price, theme.moneyFormat));

      if (variant.compare_at_price > variant.price) {
        $comparePrice.html(slate.Currency.formatMoney(variant.compare_at_price, theme.moneyFormat));
        $compareEls.removeClass('hide');
      } else {
        $comparePrice.html('');
        $compareEls.addClass('hide');
      }
    },

    /**
     * Updates the DOM to only show available color variants
     * based on the size selected
     */
    updateColorOptions: function() {
      const size = $('.size-option-list input:checked').val();
      const $colourList = $('.color-option-list');
      const product = this.productSingleObject;
      const colours = [];

      if ($colourList.length === 0) {
        return;
      }

      $colourList.find('input').removeClass('available');

      product.variants
        .filter(variant => variant.option1 === size)
        .forEach(variant => {
          $colourList.find(`input[value=${variant.option2}]`).addClass('available');
        });

      $colourList.find('input:not(.available) + label').hide();
      $colourList.find('input.available + label').show();

      if (!$colourList.find('input:checked').hasClass('available')) {
        $colourList.find('input.available:first').click();
      }
    },

    /**
     * Updates the DOM with the specified image URL
     *
     * @param {string} src - Image src URL
     */
    updateProductImage: function(evt) {
      const variant = evt.variant;
      const sizedImgUrl = slate.Image.getSizedImageUrl(variant.featured_image.src, this.settings.imageSize);
      const slideIndex = $(`.product-image__mobile img[src="${sizedImgUrl}"]:first`).data('index');

      this.$featuredImage.attr('src', sizedImgUrl);
      this.mobileSlider.go(`=${slideIndex}`);
    },

    /**
     * Event callback for Theme Editor `section:unload` event
     */
    onUnload: function() {
      this.$container.off(this.namespace);
    }
  });

  return Product;
})();
