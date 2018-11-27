window.slate = window.slate || {};
window.theme = window.theme || {};

/*================ Slate ================*/
/**
 * A11y Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help make your theme more accessible
 * to users with visual impairments.
 *
 *
 * @namespace a11y
 */

slate.a11y = {

  /**
   * For use when focus shifts to a container rather than a link
   * eg for In-page links, after scroll, focus shifts to content area so that
   * next `tab` is where user expects if focusing a link, just $link.focus();
   *
   * @param {JQuery} $element - The element to be acted upon
   */
  pageLinkFocus: function($element) {
    var focusClass = 'js-focus-hidden';

    $element.first()
      .attr('tabIndex', '-1')
      .focus()
      .addClass(focusClass)
      .one('blur', callback);

    function callback() {
      $element.first()
        .removeClass(focusClass)
        .removeAttr('tabindex');
    }
  },

  /**
   * If there's a hash in the url, focus the appropriate element
   */
  focusHash: function() {
    var hash = window.location.hash;

    // is there a hash in the url? is it an element on the page?
    if (hash && document.getElementById(hash.slice(1))) {
      this.pageLinkFocus($(hash));
    }
  },

  /**
   * When an in-page (url w/hash) link is clicked, focus the appropriate element
   */
  bindInPageLinks: function() {
    $('a[href*=#]').on('click', function(evt) {
      this.pageLinkFocus($(evt.currentTarget.hash));
    }.bind(this));
  },

  /**
   * Traps the focus in a particular container
   *
   * @param {object} options - Options to be used
   * @param {jQuery} options.$container - Container to trap focus within
   * @param {jQuery} options.$elementToFocus - Element to be focused when focus leaves container
   * @param {string} options.namespace - Namespace used for new focus event handler
   */
  trapFocus: function(options) {
    var eventName = options.namespace
      ? 'focusin.' + options.namespace
      : 'focusin';

    if (!options.$elementToFocus) {
      options.$elementToFocus = options.$container;
    }

    options.$container.attr('tabindex', '-1');
    options.$elementToFocus.focus();

    $(document).on(eventName, function(evt) {
      if (options.$container[0] !== evt.target && !options.$container.has(evt.target).length) {
        options.$container.focus();
      }
    });
  },

  /**
   * Removes the trap of focus in a particular container
   *
   * @param {object} options - Options to be used
   * @param {jQuery} options.$container - Container to trap focus within
   * @param {string} options.namespace - Namespace used for new focus event handler
   */
  removeTrapFocus: function(options) {
    var eventName = options.namespace
      ? 'focusin.' + options.namespace
      : 'focusin';

    if (options.$container && options.$container.length) {
      options.$container.removeAttr('tabindex');
    }

    $(document).off(eventName);
  }
};

/**
 * Cart Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Cart template.
 *
 * @namespace cart
 */

slate.cart = {
  
  /**
   * Browser cookies are required to use the cart. This function checks if
   * cookies are enabled in the browser.
   */
  cookiesEnabled: function() {
    var cookieEnabled = navigator.cookieEnabled;

    if (!cookieEnabled){
      document.cookie = 'testcookie';
      cookieEnabled = (document.cookie.indexOf('testcookie') !== -1);
    }
    return cookieEnabled;
  }
};

/**
 * Utility helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions for dealing with arrays and objects
 *
 * @namespace utils
 */

slate.utils = {

  /**
   * Return an object from an array of objects that matches the provided key and value
   *
   * @param {array} array - Array of objects
   * @param {string} key - Key to match the value against
   * @param {string} value - Value to get match of
   */
  findInstance: function(array, key, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        return array[i];
      }
    }
  },

  /**
   * Remove an object from an array of objects by matching the provided key and value
   *
   * @param {array} array - Array of objects
   * @param {string} key - Key to match the value against
   * @param {string} value - Value to get match of
   */
  removeInstance: function(array, key, value) {
    var i = array.length;
    while(i--) {
      if (array[i][key] === value) {
        array.splice(i, 1);
        break;
      }
    }

    return array;
  },

  /**
   * _.compact from lodash
   * Remove empty/false items from array
   * Source: https://github.com/lodash/lodash/blob/master/compact.js
   *
   * @param {array} array
   */
  compact: function(array) {
    var index = -1;
    var length = array == null ? 0 : array.length;
    var resIndex = 0;
    var result = [];

    while (++index < length) {
      var value = array[index];
      if (value) {
        result[resIndex++] = value;
      }
    }
    return result;
  },

  /**
   * _.defaultTo from lodash
   * Checks `value` to determine whether a default value should be returned in
   * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
   * or `undefined`.
   * Source: https://github.com/lodash/lodash/blob/master/defaultTo.js
   *
   * @param {*} value - Value to check
   * @param {*} defaultValue - Default value
   * @returns {*} - Returns the resolved value
   */
  defaultTo: function(value, defaultValue) {
    return (value == null || value !== value) ? defaultValue : value
  }
};

/**
 * Rich Text Editor
 * -----------------------------------------------------------------------------
 * Wrap iframes and tables in div tags to force responsive/scrollable layout.
 *
 * @namespace rte
 */

slate.rte = {
  /**
   * Wrap tables in a container div to make them scrollable when needed
   *
   * @param {object} options - Options to be used
   * @param {jquery} options.$tables - jquery object(s) of the table(s) to wrap
   * @param {string} options.tableWrapperClass - table wrapper class name
   */
  wrapTable: function(options) {
    var tableWrapperClass = typeof options.tableWrapperClass === "undefined" ? '' : options.tableWrapperClass;

    options.$tables.wrap('<div class="' + tableWrapperClass + '"></div>');
  },

  /**
   * Wrap iframes in a container div to make them responsive
   *
   * @param {object} options - Options to be used
   * @param {jquery} options.$iframes - jquery object(s) of the iframe(s) to wrap
   * @param {string} options.iframeWrapperClass - class name used on the wrapping div
   */
  wrapIframe: function(options) {
    var iframeWrapperClass = typeof options.iframeWrapperClass === "undefined" ? '' : options.iframeWrapperClass;

    options.$iframes.each(function() {
      // Add wrapper to make video responsive
      $(this).wrap('<div class="' + iframeWrapperClass + '"></div>');
      
      // Re-set the src attribute on each iframe after page load
      // for Chrome's "incorrect iFrame content on 'back'" bug.
      // https://code.google.com/p/chromium/issues/detail?id=395791
      // Need to specifically target video and admin bar
      this.src = this.src;
    });
  }
};

slate.Sections = function Sections() {
  this.constructors = {};
  this.instances = [];

  $(document)
    .on('shopify:section:load', this._onSectionLoad.bind(this))
    .on('shopify:section:unload', this._onSectionUnload.bind(this))
    .on('shopify:section:select', this._onSelect.bind(this))
    .on('shopify:section:deselect', this._onDeselect.bind(this))
    .on('shopify:section:reorder', this._onReorder.bind(this))
    .on('shopify:block:select', this._onBlockSelect.bind(this))
    .on('shopify:block:deselect', this._onBlockDeselect.bind(this));
};

slate.Sections.prototype = $.extend({}, slate.Sections.prototype, {
  _createInstance: function(container, constructor) {
    var $container = $(container);
    var id = $container.attr('data-section-id');
    var type = $container.attr('data-section-type');

    constructor = constructor || this.constructors[type];

    if (typeof constructor === 'undefined') {
      return;
    }

    var instance = $.extend(new constructor(container), {
      id: id,
      type: type,
      container: container
    });

    this.instances.push(instance);
  },

  _onSectionLoad: function(evt) {
    var container = $('[data-section-id]', evt.target)[0];
    if (container) {
      this._createInstance(container);
    }
  },

  _onSectionUnload: function(evt) {
    var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

    if (!instance) {
      return;
    }

    if (typeof instance.onUnload === 'function') {
      instance.onUnload(evt);
    }

    this.instances = slate.utils.removeInstance(this.instances, 'id', evt.detail.sectionId);
  },

  _onSelect: function(evt) {
    var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

    if (instance && typeof instance.onSelect === 'function') {
      instance.onSelect(evt);
    }
  },

  _onDeselect: function(evt) {
    var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

    if (instance && typeof instance.onDeselect === 'function') {
      instance.onDeselect(evt);
    }
  },

  _onReorder: function(evt) {
    var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

    if (instance && typeof instance.onReorder === 'function') {
      instance.onReorder(evt);
    }
  },

  _onBlockSelect: function(evt) {
    var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

    if (instance && typeof instance.onBlockSelect === 'function') {
      instance.onBlockSelect(evt);
    }
  },

  _onBlockDeselect: function(evt) {
    var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

    if (instance && typeof instance.onBlockDeselect === 'function') {
      instance.onBlockDeselect(evt);
    }
  },

  register: function(type, constructor) {
    this.constructors[type] = constructor;

    $('[data-section-type=' + type + ']').each(function(index, container) {
      this._createInstance(container, constructor);
    }.bind(this));
  }
});

/**
 * Currency Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help with currency formatting
 *
 * Current contents
 * - formatMoney - Takes an amount in cents and returns it as a formatted dollar value.
 *
 */

slate.Currency = (function() {
  var moneyFormat = '${{amount}}';

  /**
   * Format money values based on your shop currency settings
   * @param  {Number|string} cents - value in cents or dollar amount e.g. 300 cents
   * or 3.00 dollars
   * @param  {String} format - shop money_format setting
   * @return {String} value - formatted value
   */
  function formatMoney(cents, format) {
    if (typeof cents === 'string') {
      cents = cents.replace('.', '');
    }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = (format || moneyFormat);

    function formatWithDelimiters(number, precision, thousands, decimal) {
      precision = slate.utils.defaultTo(precision, 2);
      thousands = slate.utils.defaultTo(thousands, ',');
      decimal = slate.utils.defaultTo(decimal, '.');

      if (isNaN(number) || number == null) {
        return 0;
      }

      number = (number / 100.0).toFixed(precision);

      var parts = number.split('.');
      var dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
      var centsAmount = parts[1] ? (decimal + parts[1]) : '';

      return dollarsAmount + centsAmount;
    }

    switch (formatString.match(placeholderRegex)[1]) {
      case 'amount':
        value = formatWithDelimiters(cents, 2);
        break;
      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0);
        break;
      case 'amount_with_space_separator':
        value = formatWithDelimiters(cents, 2, ' ', '.');
        break;
      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, ',', '.');
        break;
      case 'amount_no_decimals_with_space_separator':
        value = formatWithDelimiters(cents, 0, ' ');
        break;
    }

    return formatString.replace(placeholderRegex, value);
  }

  return {
    formatMoney: formatMoney
  };
})();

/**
 * Image Helper Functions
 * -----------------------------------------------------------------------------
 * A collection of functions that help with basic image operations.
 *
 */

slate.Image = (function() {

  /**
   * Preloads an image in memory and uses the browsers cache to store it until needed.
   *
   * @param {Array} images - A list of image urls
   * @param {String} size - A shopify image size attribute
   */

  function preload(images, size) {
    if (typeof images === 'string') {
      images = [images];
    }

    for (var i = 0; i < images.length; i++) {
      var image = images[i];
      this.loadImage(this.getSizedImageUrl(image, size));
    }
  }

  /**
   * Loads and caches an image in the browsers cache.
   * @param {string} path - An image url
   */
  function loadImage(path) {
    new Image().src = path;
  }

  /**
   * Find the Shopify image attribute size
   *
   * @param {string} src
   * @returns {null}
   */
  function imageSize(src) {
    var match = src.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/);

    if (match) {
      return match[1];
    } else {
      return null;
    }
  }

  /**
   * Adds a Shopify size attribute to a URL
   *
   * @param src
   * @param size
   * @returns {*}
   */
  function getSizedImageUrl(src, size) {
    if (size === null) {
      return src;
    }

    if (size === 'master') {
      return this.removeProtocol(src);
    }

    var match = src.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);

    if (match) {
      var prefix = src.split(match[0]);
      var suffix = match[0];

      return this.removeProtocol(prefix[0] + '_' + size + suffix);
    } else {
      return null;
    }
  }

  function removeProtocol(path) {
    return path.replace(/http(s)?:/, '');
  }

  return {
    preload: preload,
    loadImage: loadImage,
    imageSize: imageSize,
    getSizedImageUrl: getSizedImageUrl,
    removeProtocol: removeProtocol
  };
})();

/**
 * Variant Selection scripts
 * ------------------------------------------------------------------------------
 *
 * Handles change events from the variant inputs in any `cart/add` forms that may
 * exist. Also updates the master select and triggers updates when the variants
 * price or image changes.
 *
 * @namespace variants
 */

slate.Variants = (function() {

  /**
   * Variant constructor
   *
   * @param {object} options - Settings from `product.js`
   */
  function Variants(options) {
    this.$container = options.$container;
    this.product = options.product;
    this.singleOptionSelector = options.singleOptionSelector;
    this.originalSelectorId = options.originalSelectorId;
    this.enableHistoryState = options.enableHistoryState;
    this.currentVariant = this._getVariantFromOptions();

    $(this.singleOptionSelector, this.$container).on('change', this._onSelectChange.bind(this));
  }

  Variants.prototype = $.extend({}, Variants.prototype, {

    /**
     * Get the currently selected options from add-to-cart form. Works with all
     * form input elements.
     *
     * @return {array} options - Values of currently selected variants
     */
    _getCurrentOptions: function() {
      var currentOptions = $.map($(this.singleOptionSelector, this.$container), function(element) {
        var $element = $(element);
        var type = $element.attr('type');
        var currentOption = {};

        if (type === 'radio' || type === 'checkbox') {
          if ($element[0].checked) {
            currentOption.value = $element.val();
            currentOption.index = $element.data('index');

            return currentOption;
          } else {
            return false;
          }
        } else {
          currentOption.value = $element.val();
          currentOption.index = $element.data('index');

          return currentOption;
        }
      });

      // remove any unchecked input values if using radio buttons or checkboxes
      currentOptions = slate.utils.compact(currentOptions);

      return currentOptions;
    },

    /**
     * Find variant based on selected values.
     *
     * @param  {array} selectedValues - Values of variant inputs
     * @return {object || undefined} found - Variant object from product.variants
     */
    _getVariantFromOptions: function() {
      var selectedValues = this._getCurrentOptions();
      var variants = this.product.variants;
      var found = false;

      variants.forEach(function(variant) {
        var satisfied = true;

        selectedValues.forEach(function(option) {
          if (satisfied) {
            satisfied = (option.value === variant[option.index]);
          }
        });

        if (satisfied) {
          found = variant;
        }
      });

      return found || null;
    },

    /**
     * Event handler for when a variant input changes.
     */
    _onSelectChange: function() {
      var variant = this._getVariantFromOptions();

      this.$container.trigger({
        type: 'variantChange',
        variant: variant
      });

      if (!variant) {
        return;
      }

      this._updateMasterSelect(variant);
      this._updateImages(variant);
      this._updatePrice(variant);
      this.currentVariant = variant;

      if (this.enableHistoryState) {
        this._updateHistoryState(variant);
      }
    },

    /**
     * Trigger event when variant image changes
     *
     * @param  {object} variant - Currently selected variant
     * @return {event}  variantImageChange
     */
    _updateImages: function(variant) {
      var variantImage = variant.featured_image || {};
      var currentVariantImage = this.currentVariant.featured_image || {};

      if (!variant.featured_image || variantImage.src === currentVariantImage.src) {
        return;
      }

      this.$container.trigger({
        type: 'variantImageChange',
        variant: variant
      });
    },

    /**
     * Trigger event when variant price changes.
     *
     * @param  {object} variant - Currently selected variant
     * @return {event} variantPriceChange
     */
    _updatePrice: function(variant) {
      if (variant.price === this.currentVariant.price && variant.compare_at_price === this.currentVariant.compare_at_price) {
        return;
      }

      this.$container.trigger({
        type: 'variantPriceChange',
        variant: variant
      });
    },

    /**
     * Update history state for product deeplinking
     *
     * @param {object} variant - Currently selected variant
     */
    _updateHistoryState: function(variant) {
      if (!history.replaceState || !variant) {
        return;
      }

      var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?variant=' + variant.id;
      window.history.replaceState({path: newurl}, '', newurl);
    },

    /**
     * Update hidden master select of variant change
     *
     * @param {object} variant - Currently selected variant
     */
    _updateMasterSelect: function(variant) {
      $(this.originalSelectorId, this.$container)[0].value = variant.id;
    }
  });

  return Variants;
})();


/*================ Modules ================*/
!(function() {

	const loading = isLoading => {
		const $container = $('.product-designs-container');
		const loaded = 'product-designs--loaded';
		return isLoading ? $container.removeClass(loaded) : $container.addClass(loaded);
	}

	const getProductGender = product => product.tags.find(tag => {
		return tag.indexOf('gender:') > -1
	}).replace('gender:', '') || '';

	const getDesignProducts = product => {
		const client = algoliasearch('7M9U4OP0D8', 'dc5c134cd92b8d6fdaff3232cb7c9e83');
		const index = client.initIndex('poches_dev_products');
		const gender = getProductGender(product);

		return index.search({
			query: '',
			hitsPerPage: 1000,
			attributesToRetrieve: ['vendor', 'handle'],
			filters: `product_type:"${product.type}" AND named_tags.gender:"${gender}" AND position = 1`,
		});
	}

	const renderDesigns = async (designs, product) => {
		const {hits: designProducts} = await getDesignProducts(product);

		if (!designProducts) {
			return;
		}

		const designsHtml = designProducts.map(designProduct => {
			const vendor = designProduct.vendor.toLowerCase();
			const design = designs.find(design => design.name.toLowerCase() === vendor);
			const thisDesign = designProduct.vendor === product.vendor;

			return design ? `
				<div class="product-designs__design ${thisDesign ? 'product-designs__design--active' : ''}">
					<a href="/products/${designProduct.handle}">
						<img src="${design.swatch}" width="48" height="48"/>
					</a>
				</div>
			` : '';
		}).join('');

		$('.product-designs').html(designsHtml);
		loading(false);
	};

	const renderDesign = (designs, product) => {
		const design = designs.find(design => design.name === product.vendor.toLowerCase());

		if (!design) {
			return $('.product-design').addClass('product-design--not-found');
		}

		$('.product-design').html(`
			<div class="product-design__image">
				<img src="${design.image}" alt="${design.title}"/>
			</div>
			<div class="product-design__content">
				<h4 data-product-price>${$('[data-product-price]:first').text()}</h4>
				<h5>${design.tagline}</h5>
				<h6>${design.title}</h6>
			</div>
		`); 

		loading(false);
	};

	$(() => {
		if ($('[data-design-json]').length === 0 || $('[data-product-json]').length === 0) {
			return;
		}

		const designs = JSON.parse($('[data-design-json]').html());
		const product = JSON.parse($('[data-product-json]').html());
		renderDesign(designs, product);
		renderDesigns(designs, product);

		$('.product-designs').on('click', '.product-designs__design', () => loading(true));
	});

})();
!(function() {

	let $relatedProducts;

	const getProducts = () => {
		const vendor = $relatedProducts.data('vendor');
		const handle = $relatedProducts.data('handle');
		const client = algoliasearch('7M9U4OP0D8', 'dc5c134cd92b8d6fdaff3232cb7c9e83');
		const index = client.initIndex('poches_dev_products');

		return index.search({
			query: '',
			hitsPerPage: 1000,
			filters: `NOT handle:"${handle}" AND vendor:"${vendor}"`,
		});
	}

	const productsWithVariants = products => {
		let storedProducts = [];
		let processedHandles = {};

		products.forEach(product => {
			if (processedHandles[product.handle]) {
				return;
			}

			processedHandles[product.handle] = true;
			product.variants = [];

			products.forEach(variant => {
				if (variant.handle !== product.handle) {
					return;
				}

				product.variants.push({
					option1: variant.option1,
					option2: variant.option2,
					id: variant.objectID,
					available: Boolean(variant.inventory_quantity),
					featured_image: {src: variant.image}
				});
			});

			storedProducts.push(product);
		});

		return storedProducts;
	}

	const quickAddOptions = product => product.variants.reduce((options, variant) => {
		if (options.indexOf(variant.option1) > -1) {
			return options;
		}
		return options.concat(variant.option1);
	}, []).map(option => `
		<li>
			<a href="#" class="quick-add__size" data-size="${option}">
				${option}
			</a>
		</li>
	`).join('');

	const colorOptions = product => product.variants.reduce((options, variant) => {
		if (options.indexOf(variant.option2) > -1) {
			return options;
		}
		return options.concat(variant.option2);
	}, []).map(option => `
		<a
			href="#"
			class="color--${option.toLowerCase()} color-swatch"
			style="background-color: ${option.toLowerCase()}"
			data-color="${option}"
		></a>
	`).join('');

	const renderProducts = async () => {
		const {hits: products} = await getProducts();

		if (products.length === 0) {
			$('.related-products-container').hide();
		}

		const productHtml = productsWithVariants(products).map(product => `
			<div class="product-listing__item" data-variants='${JSON.stringify(product.variants)}'>
				<div class="product-listing__image">
					<a href="/products/${product.handle}">
						<img
							src="${slate.Image.getSizedImageUrl(product.product_image, '500x')}"
							width="500px"
							height="500px"
							alt="${product.title}"
						/>
					</a>

					<a href="#" class="quick-add">
						${window.theme.strings.quickAdd.buttonText}
					</a>

					<ul class="quick-add__sizes">
						${quickAddOptions(product)}
					</ul>

					<div class="quick-add__error">
						<span class="quick-add__error--sold-out">${window.theme.strings.quickAdd.soldOut}</span>
						<span class="quick-add__error--unavailable">${window.theme.strings.quickAdd.unavailable}</span>
						<span class="quick-add__error--error">${window.theme.strings.quickAdd.generalError}</span>
					</div>
				</div>
				<div class="product-listing__content">
					<div class="color-option-list product-listing__colors">
						${colorOptions(product)}
					</div>
					<h5>${product.title}</h5>
					<h6>${window.currencySymbol}${product.price}</h6>
					<a href="/products/${product.handle}">
						<div class="product-listing__see-more">See more details</div>
					</a>
				</div>
			</div>
		`).join('');

		$relatedProducts.html(productHtml);
	}

	$(() => {
		$relatedProducts = $('.related-products');

		if ($relatedProducts.length === 0) {
			return;
		}

		renderProducts();
	});

})();
(function () {
	const maintainOpen = element => {
		element.mouseleave(_ => element.hide())
	}

	const showDrop = event => {
		const selectedDrop = $(event.target)
		const selectedMenu = selectedDrop.text()
		const dropdowns	 = $('.dropdown-content') || false
		const dropElement	 = $(`.dropdown-content.main.${selectedMenu}`) || false

		$('.w-nav-link').not(selectedDrop).css('opacity', 0.4)

		if (dropElement) {
	dropElement.css('display', 'flex')
			dropdowns.not(dropElement).hide()
			maintainOpen(dropElement)
		}
	}

	const highlightLabels = event => {
		const selectedDrop = $(event.target)
		const menus		 = $('.w-nav-link')

		menus.css('opacity', 1)
	}

	$(document).ready(_ => {
		$('a.w-nav-link').hover(showDrop, highlightLabels)
	})
})()
var locales = {
	'en': {
		'CA': 'poches-development-mica.myshopify.com'
	},
	'fr': {
		'EU': 'pochesetfilsfrance.myshopify.com'
	}
};

$(function () {
	for (language in locales) {
		for(country in locales[language]) {
			var selected = '';
			if(locales[language][country] == window.location.host) {
				selected = ' selected="selected"';
			}
			$('.country-switcher-dropdown').append('<option value="' + language + '-' + country + '"' + selected + '>' + language.toUpperCase() + '-' + country + '</option>');
		}
	}

	$('.country-switcher-dropdown').change(function () {
		var countrySwitch = $(this).val().split('-');
		window.location.host = locales[countrySwitch[0]][countrySwitch[1]];
	});

	var euCountryCodes = ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "GB", "UK", "GR", "GF", "GP", "MQ", "ME", "YT", "RE", "MF", "GI", "AX", "PM", "GL", "BL", "SX", "AW", "CW", "WF", "PF", "NC", "TF", "AI", "BM", "IO", "VG", "KY", "FK", "MS", "PN", "SH", "GS", "TC", "AD", "LI", "MC", "SM", "VA", "JE", "GG", "GI"];
	var language = (window.navigator.userLanguage || window.navigator.language).split('-')[0];
	
	if(locales[language]) {
		$.getJSON('http://ip-api.com/json?callback=?', function (ipData) {
			var countryCode = ipData['countryCode'];
			if($.inArray(countryCode, euCountryCodes)) {
				countryCode = 'EU';
			}
			if(window.location.host != locales[language][countryCode]) {
				window.location.host = locales[language][countryCode];
			}
		});
	}
});
!(function() {
  const toggleProductInfo = event => {
    const $container = $(event.target).parents('.toggle--item');
    $container.toggleClass('toggle--item--open');
    $container.find('.toggle--contents').toggle('fast');
  };
  
  $(document).on('click', '.toggle--activation', toggleProductInfo);
})();

// =require modules/parse-urlparams.js
const shuffleDOMSiblings = containerName => {
  const parent = $(containerName)
  const divs = parent.children()
  while (divs.length) {
    parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0])
  }
}
!(function() {

	const errorMessage = ($container, type) => {
		$errorContainer = $container.find('.quick-add__error');
		$error = $errorContainer.find(`.quick-add__error--${type}`);

		$error.show();
		$errorContainer.show();

		setTimeout(() => {
			$errorContainer.hide();
			$error.hide();
		}, 1800);
	};

	const getSelectedVariant = (variants, size, color) => {
		return variants.find(variant => {
			return variant.option1 === size && variant.option2 === color;
		});
	};

	const getSelectedColor = $container => {
		if ($container.find('.color-swatch--selected').length > 0) {
			return $container.find('.color-swatch--selected').data('color');
		}

		return $container.find('.color-swatch').first().data('color');
	};

	const buy = e => {
		e.preventDefault();
		const $sizeButton = $(e.currentTarget);
		const $container = $sizeButton.parents('.product-listing__item');
		const variants = $container.data('variants');
		const size = $sizeButton.data('size');
		const color = getSelectedColor($container);
		const variant = getSelectedVariant(variants, size, color);

		if (!variant) {
			return errorMessage($container, 'unavailable');
		}

		if (!variant.available) {
			return errorMessage($container, 'sold-out');
		}

		$.post('/cart/add.js', {id: variant.id, quantity: 1})
		.fail(() => errorMessage($container, 'error'))
		.done(() => toggleCart());
	}

	const closeSizes = () => {
		$('.quick-add__sizes').removeClass('quick-add__sizes--active');
	};

	const openSizes = e => {
		e.preventDefault();
		closeSizes();
		const $button = $(e.currentTarget);
		const $sizes = $button.siblings('.quick-add__sizes');
		$sizes.addClass('quick-add__sizes--active');
	};

	const bindEvents = () => {
		if ($(window).width() < 960) {
			return;
		}

		$('.product-listing')
			.off('click', '.quick-add')
			.off('click', '.quick-add__size')
			.off('mouseleave', '.product-listing__image')
			.on('click', '.quick-add', openSizes)
			.on('click', '.quick-add__size', buy)
			.on('mouseleave', '.product-listing__image', closeSizes);
	}

	bindEvents();
	$('.featured-collection').on('glide.mounted', () => bindEvents());

})();

const cartHTML = `
<div class="ajax--cart--popout--section closed--cart">
	<div class="ajax--cart--popout" style="width: 100%">
		<a href="#" data-keep-shopping
			style="background-color: #161616; padding: 20px 23px; display: flex; font-weight: 500;"
				class="button wide-text full-caps black w-button text-center">
			← Continue shopping
		</a>
		<div class="ajax--cart--lower">
			<div class="ajax--cart--items"></div>
			<div class="ajax--cart--bottom">
				<h5 class="ajax--cart--free-shipping">Free Shipping</h3>
				<p class="ajax--cart--message">
			Add another
			$<span class="ajax--cart--shippingLeft">100</span>
			to cart to get free shipping.
		</p>
				<a href="#" data-keep-shopping>Continue Shopping</a>
				<div class="ajax--cart--subtotal">
					<h4 class="ajax--cart--title--text">Subtotal</h4>
					<h4 class="ajax--cart--title--text right">
			<strong class="ajax--cart--subtotal--amount"></strong>
			</h4>
				</div>
				<a href="/checkout"
				class="button wide-text full-caps black full-width w-button text-center">
			Checkout
		</a>
			</div>
		</div>
	</div>
</div>

<style>
.ajax--cart--popout--section {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	height: 100vh;
	z-index: 1001;
	justify-content: flex-end;
	align-items: stretch;
	background-image: -webkit-linear-gradient(270deg, rgba(0, 0, 0, .57), rgba(0, 0, 0, .57));
	background-image: linear-gradient(180deg, rgba(0, 0, 0, .57), rgba(0, 0, 0, .57));
	box-shadow: 8px 0px 20px 1px black;
}

.ajax--cart--popout {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	width: 30%;
	height: 100%;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-webkit-flex-direction: column;
	-ms-flex-direction: column;
	flex-direction: column;
	background-color: #fff;
}

.ajax--cart--link--shop {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	width: 100%;
	height: 8%;
	padding: 15px;
	align-items: center;
	background-color: #161616;
}

.ajax--cart--link--title {
	margin-top: 0px;
	margin-bottom: 0px;
	color: #fff;
	font-size: 13px;
	font-weight: 400;
	letter-spacing: 1px;
}

.ajax--cart--lower {
	width: 100%;
	height: 86%;
}

.ajax--cart--items {
	height: inherit;
	padding: 8px 0 110px;
	overflow-y: scroll;
}

.ajax--cart--item {
	display: flex;
	height: 125px;
	margin-bottom: 40px;
}

.ajax--cart--item--image {
	width: 40%;
	text-align: center;
}
.ajax--cart--item--image img {
	max-width: 100%;
	max-height: 100%;
}

.ajax--cart--item--details {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	width: 80%;
	padding-left: 5%;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-webkit-flex-direction: column;
	-ms-flex-direction: column;
	flex-direction: column;
	-webkit-box-pack: justify;
	-webkit-justify-content: space-between;
	-ms-flex-pack: justify;
	justify-content: space-between;
}

.ajax--cart--item--text.bold--text {
	font-weight: 700;
}

.ajax--cart--item--block {
	margin-bottom: 5px;
}

.ajax--cart--item--block.padding {
	margin-bottom: 30px;
}

.ajax--cart--item--block.flexed {
	display: flex;
	align-items: flex-end;
}

.ajax--cart--qty { width: 50%; }

.ajax--cart--price--block {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	width: 50%;
	height: 20px;
	-webkit-box-pack: end;
	-webkit-justify-content: flex-end;
	-ms-flex-pack: end;
	justify-content: flex-end;
}

.ajax--cart--bottom {
	position: absolute;
	bottom: 0;
	width: 100%;
	padding: 20px;
	background-color: #ddd;
}

.ajax--cart--free-shipping {
	margin: 10px 0; 
	font-size: 18px;
	line-height: 1em;
	font-weight: 500;
}

.ajax--cart--message {
	margin-bottom: 0em;
	font-size: 14px;
}

.ajax--cart--subtotal {
	display: flex;
	padding: 0 0 5px 0;
}

.ajax--cart--title--text {
	width: 50%;
	margin-top: 20px;
	margin-bottom: 0px;
	font-weight: 400;
}

.ajax--cart--title--text.right {
	text-align: right;
}

@media screen and (max-width: 900px) {
	.ajax--cart--popout--section { width: 100%; }

	.ajax--cart--item--image { width: 20%; }
}

@media screen and (min-width: 901px) {
	.ajax--cart--popout--section { width: 33%; }
}

.ajax--cart--popout--section {
	position: fixed;
	top: 0;
	left: 100%;
	height: 100%;
}

.ajax--cart--popout--section.open--cart {
	transform: translateX(-100%); 
	transition: 0.6s;
}
.ajax--cart--popout--section.closed--cart {
	transform: translateX(0); 
	transition: 0.6s;
}

.ajax--cart--item--quantity {
	display: inline-flex;
	justify-content: center;
	align-items: center;
	border: 2px solid lightgray;
	border-radius: 50%;
	background: transparent;
	cursor: pointer;
	color: gray;
	height: 18px;
	width: 18px;
	text-align: center;
	line-height: 1px;
	user-select: none;
}

.ajax--cart--item--curQuantity { display: inline-block; }
.ajax--cart--item--quantity.remove {
	float: right;
	font-weight: 200;
	line-height: 1;
}

.ajax--cart--item--image {
	background-size: contain;
	position: relative;
	background-repeat: no-repeat;
	background-position: center;
	background-color: #f9f9f9;
}

*[disabled] { cursor: not-allowed; }
</style>`

const toggleCart = _ => {
	const cartSelector   = $('.ajax--cart--popout--section')
	const cartIsAppended = cartSelector.length > 0
	
	if (!cartIsAppended) {
		$('#CartHolder').append(cartHTML)
	}
	
	setTimeout(_ => {
		refreshCart()
		toggleWidth()
	}, 200)
}

const toggleWidth = _ => {
	const darkOverlay		  = $('.dark-overlay')
	const cartSelector	  = $('.ajax--cart--popout--section')
	const currentCartStatus = {
		'display': cartSelector.hasClass('closed--cart'),
		'opacity': cartSelector.css('opacity')
	}
	
	if (!currentCartStatus.display) {
		cartSelector.removeClass('open--cart').addClass('closed--cart')
	} else {
		cartSelector.removeClass('closed--cart').addClass('open--cart')
	}
	
	darkOverlay.css({
		'display': currentCartStatus.display ? 'block':'none',
		'opacity': currentCartStatus.opacity > 0 ? 1:0
	})
}

const hideCart = _ => {
	const darkOverlay = $('.dark-overlay')
	const cartSelector = $('.ajax--cart--popout--section')
	const currentCartStatus = {
		'display': cartSelector.hasClass('closed--cart'),
		'opacity': cartSelector.css('opacity')
	}

	cartSelector.removeClass('open--cart').addClass('closed--cart')

	darkOverlay.css({
		'display': currentCartStatus.display ? 'block':'none',
		'opacity': currentCartStatus.opacity > 0 ? 1:0
	})
};

const refreshCounter = QTY => {
	const itemNumberLabel = $('.cart--items--block')
	
	if (QTY) {
		return itemNumberLabel.text(QTY)
	} else {
		return itemNumberLabel.text()
	}
}

const refreshPrice = amount => {
	const priceLabel = $('.ajax--cart--subtotal--amount')
	
	if(amount) {
		return priceLabel.empty().text(window.currencySymbol + (amount/99).toFixed(2))
	} else {
		return priceLabel.text()
	}
}


const refreshCart = _ => {
	const cartSelector = $('.ajax--cart--popout--section')
	const itemsInCart  = cartSelector.find('.ajax--cart--items').empty() 
	
	$.getJSON('/cart.js', data => {
		
		data.items.map(item => {
			var title = item.product_title
			var subtitle = '&nbsp;'
			var size = item.variant_title
			if(item.product_type == 'Pocket') {
				subtitle = item.variant_title
				size = item.properties.size
			}

			itemsInCart
			.append(`
		<div class="ajax--cart--item item-start" 
				data-variant-id="${item.variant_id}"
				data-product-type=${item.product_type}>
		<div class="ajax--cart--item--image">
			<img src='${item.image}' alt="${item.title}" title="${item.title}" />
		</a>
				</div>
				<div class="ajax--cart--item--details">
				<div class="ajax--cart--item--block padding">
				<div class="ajax--cart--item--text bold--text">
				${title}
			<span class="ajax--cart--item--quantity remove" title="Remove">x</span>
		</div>
		<div class="ajax--cart--item--text">${subtitle}</div>
				</div>
				<div class="ajax--cart--item--block padding">
				<div class="ajax--cart--item--text">Size: ${size}</div>
				</div>
				<div class="ajax--cart--item--block flexed">
				<div class="ajax--cart--qty">
					<button class="ajax--cart--item--quantity less" title="Substract 1">-</button>
					<div class="ajax--cart--item--curQuantity">${item.quantity}</div>
					<button class="ajax--cart--item--quantity more" title="Add 1">+</button>
		</div>
				<div class="ajax--cart--price--block">${window.currencySymbol + (item.line_price/100).toFixed(2)}</div>
				</div>
				</div>
				</div>`)
		})

		freeShipping(data.total_price)
		refreshCounter(data.item_count)
		refreshPrice(data.total_price)
	})
}

const updateQty = event => {
	const button		= $(event.target)
	const item 		= button.closest('.item-start')
	const itemID 		= item.attr('data-variant-id')
	const itemPrice	= item.find('.ajax--cart--price--block')
	const curQty 		= $(button.siblings('.ajax--cart--item--curQuantity'))
	let newQty 		= curQty.text()
	const operation 	= button.hasClass('more')
	? 'add':button.hasClass('less') 
	? 'substract':'delete'
	
	if (operation === 'add') { 
		newQty++
		button.removeProp('disabled')
		refreshCounter(refreshCounter()+1)
		// add
	} else if (operation === 'substract') { 
		
		if (newQty > 1) { 
			newQty-- 
			refreshCounter(refreshCounter()-1)
		} 
		else { button.prop('disabled', true) }
		
	} else {
		newQty = 0
		setTimeout(refreshCart, 1000)
		// delete
	}
	
	$.post('/cart/update.js', `updates[${itemID}]=${newQty}`)
	.complete(response => {
		if (response.status === 200) { 
			response = JSON.parse(response.responseText)
			const linePrice = response.items.find(it => it.id === parseInt(itemID)).line_price
			
			curQty.text(newQty) 
			itemPrice.text(window.currencySymbol + (linePrice/100).toFixed(2))
			
			refreshPrice(response.total_price)
			freeShipping(response.total_price)
		}
	})
	
}

const freeShipping = currentAmount => {
	const cartMessage   = $('.ajax--cart--message')
	
	if (100 - currentAmount > 0) {
		cartMessage.text(`Add another ${window.currencySymbol}${100 - currentAmount} to cart to get free shipping.`)
	} else {
		cartMessage.text('Congratulations! You may apply for Free Shipping.')
	}  
}

$(document).on('click', 'a[url="#"]', e => e.preventDefault())
$(document).on('click', '.ajax--cart--item--quantity', updateQty)
$(document).on('click', '*[data-keep-shopping]', toggleCart)
$(document).on('click', '.dark-overlay', hideCart)
/**
 * If you're looking for the full menu JS I believe it's controlled
 * by webflow JS.
 */

!(function () {

	const toggleMenuOpen = e => {
		$('body').toggleClass('menu-open');
	};

	$(document).on('click', '.nav--menu--icon', toggleMenuOpen);

})();
!(function () {
	const toggleLoading = () => {
		const $button = $('.newsletter input[type="submit"]');
		const loadingText = $button.attr('data-wait');
		const buttonText = $button.val();

		$button.text(loadingText);
		$button.attr('data-wait', buttonText);
	}; 

	const hideBanner = _ => {
		toggleBanner('close')
		localStorage.setItem('lastTimeSeen', new Date().getTime())
	}

	const hideForAYear = _ => {
		toggleBanner('close')
		localStorage.setItem('lastTimeSeen', new Date(new Date().setFullYear(new Date().getFullYear() + 1)))
	}

	const handleSubmit = e => {
		e.preventDefault();
		const $parent = $(e.currentTarget).parents('.newsletter');
		const $message = $parent.find('.message');
		const email = $parent.find('input[name="EMAIL"]').val();
		const mailchimpUrl = 'https://pochesetfils.us11.list-manage.com/subscribe/post-json?u=079201818dbf290a767b95ffb&id=4abed72bd7';
		const body = `&EMAIL=${email}&b_4753c07213be229168b88045d_0bdd4738d0=`;

		toggleLoading();

		$.ajax(`${mailchimpUrl}${body}`, {
			type: 'GET',
			dataType: 'jsonp',
			jsonp: 'c'
		}).always(res => {
			toggleLoading();
			const message = res.msg.replace('0 -', '');

			if (res.result === 'error') {
				$message.find('.message__error').html(message).show();
				return $message.show();
			}

			$parent.find('.form--block--widen').hide();
			$message.find('.message__error').hide();
			$message.find('.message__success').show();
			$message.show();
			setTimeout(() => hideForAYear(), 4000);
		});
	}

	const checkLastTimeSeen = _ => {
		const sevenDaysAgo = new Date(Date.now()-(1000 * 60 * 60 * 24 * 7)).getTime()
		const lastTimeSeen = localStorage.getItem('lastTimeSeen')
		
		if (sevenDaysAgo > lastTimeSeen || !lastTimeSeen ) {
			toggleBanner('open')
		} else {
			toggleBanner('close')
		}
	}
	
	const toggleBanner = shouldDisplay => {
		const overlay = $('.dark-overlay, .page--popup--section');

		if (shouldDisplay === 'open') {
			toggleBanner('close')
			setTimeout(() => {
				overlay.css({'display': 'flex', 'opacity': 1});
			}, 5000);
		} else {
			overlay.css({'display': 'none', 'opacity': 0})
		}
	}

	$(document).on('click', '.close--popup, input#Subscribe, .dark-overlay', hideBanner)
	$(document).on('submit', '.newsletter form', handleSubmit)
	$(document).ready(checkLastTimeSeen)

	$(document).on('click', '.page--popup--section', function(e) {
		if (e.target !== this) {
			return;
		}

		hideBanner();
	});
})();
!(function () {

	const form = 'form[action="/cart/add"]';

	const addItem = (id, quantity) => {
		return $.ajax({
			url: '/cart/add.js',
			dataType: 'json',
			data: {
				id: id,
				quantity: typeof quantity === 'undefined' ? 1 : quantity
			}
		});
	}

	const handleSubmit = e => {
		e.preventDefault();
		const id = $(form).find('select[name="id"]').val();
		const quantity = $(form).find('input[name="quantity"]').val();
		addItem(id, quantity).done(toggleCart);
	}

	$(document).on('submit', form, handleSubmit);

})();
!(function() {
	const getSelectedVariant = (variants, color) => {
		return variants.find(variant => variant.option2 === color);
	};

	const swapImage = ($imageContainer, newImg) => {
		const imageSize = '500x';
		const sizedImgUrl = slate.Image.getSizedImageUrl(newImg, imageSize);
		const oldImg = $imageContainer.find('img').attr('src');

		$imageContainer.addClass('product-listing__image--swapping');

		img = new Image(); 
		img.src = sizedImgUrl;
		img.onload = () => {
			$(`img[src="${oldImg}"]`).attr('src', sizedImgUrl);
			$imageContainer.removeClass('product-listing__image--swapping');
		};
	}

	const variantUrl = (variant, url) => {
		if (url.indexOf('variant') > -1) {
			url = url.substr(0, url.indexOf('?'));
		}

		return `${url}?variant=${variant.id}`;
	};

	const handleColorChange = e => {
		e.preventDefault();
		const $swatch = $(e.currentTarget);
		const $container = $swatch.parents('.product-listing__item');
		const $links = $container.find('a:not(.color-swatch):not(.quick-add__size)');
		const $imageContainer = $container.find('.product-listing__image');
		const color = $swatch.data('color');
		const currentUrl = $links.first().attr('href');
		const variants = $container.data('variants');
		const variant = getSelectedVariant(variants, color);

		$container.find('.color-swatch').removeClass('color-swatch--selected');
		$swatch.addClass('color-swatch--selected');
		$links.prop('href', variantUrl(variant, currentUrl));
		swapImage($imageContainer, variant.featured_image.src);
	}

	$('.product-listing').on('click', '.product-listing__colors a', handleColorChange);

	$('.featured-collection').on('glide.mounted', () => {
		$('.featured-collection .product-listing__item').off('click', '.product-listing__colors a');
		$('.featured-collection .product-listing__item').on('click', '.product-listing__colors a', handleColorChange);
	});

})();

/*================ Sections ================*/
/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
   * @namespace product
 */

theme.Product = (function() {

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

theme.Slider = function(container) {
	const $container = $(container);
	const speed = $container.data('slider-speed');
	const slider = `[data-section-type="${$container.data('section-type')}"].glide`;

	if ($(slider).find('.glide__slide').length === 0) {
		return;
	}

	const sliderOptions = {
		type: 'carousel',
		perView: 1,
		autoplay: $(slider).find('.glide__slide').length > 1 ? speed : false
	};

	new Glide(slider, sliderOptions).mount();
};
theme.FeaturedCollection = function(container) {
	const $container = $(container);
	const slider = `[data-section-type="${$container.data('section-type')}"] .glide`;
	const sliderOptions = {
		type: 'carousel',
		perView: 4,
		breakpoints: {
			801: {perView: 2},
			480: {perView: 1}
		}
	};

	const glide = new Glide(slider, sliderOptions);

	glide.on(['mount.after', 'update'], () => {
		$container.trigger('glide.mounted');
	});

	$container.on('glide.update', () => glide.update());

	glide.mount();
};

/*================ Templates ================*/
/**
 * Customer Addresses Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Customer Addresses
 * template.
 *
 * @namespace customerAddresses
 */

theme.customerAddresses = (function() {
  var $newAddressForm = $('#AddressNewForm');

  if (!$newAddressForm.length) {
    return;
  }

  // Initialize observers on address selectors, defined in shopify_common.js
  if (Shopify) {
    new Shopify.CountryProvinceSelector('AddressCountryNew', 'AddressProvinceNew', {
      hideElement: 'AddressProvinceContainerNew'
    });
  }

  // Initialize each edit form's country/province selector
  $('.address-country-option').each(function() {
    var formId = $(this).data('form-id');
    var countrySelector = 'AddressCountry_' + formId;
    var provinceSelector = 'AddressProvince_' + formId;
    var containerSelector = 'AddressProvinceContainer_' + formId;

    new Shopify.CountryProvinceSelector(countrySelector, provinceSelector, {
      hideElement: containerSelector
    });
  });

  // Toggle new/edit address forms
  $('.address-new-toggle').on('click', function() {
    $newAddressForm.toggleClass('hide');
  });

  $('.address-edit-toggle').on('click', function() {
    var formId = $(this).data('form-id');
    $('#EditAddress_' + formId).toggleClass('hide');
  });

  $('.address-delete').on('click', function() {
    var $el = $(this);
    var formId = $el.data('form-id');
    var confirmMessage = $el.data('confirm-message');
    if (confirm(confirmMessage || 'Are you sure you wish to delete this address?')) {
      Shopify.postLink('/account/addresses/' + formId, {parameters: {_method: 'delete'}});
    }
  });
})();

/**
 * Password Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Password template.
 *
 * @namespace password
 */

theme.customerLogin = (function() {
  var config = {
    recoverPasswordForm: '#RecoverPassword',
    hideRecoverPasswordLink: '#HideRecoverPasswordLink'
  };

  if (!$(config.recoverPasswordForm).length) {
    return;
  }

  checkUrlHash();
  resetPasswordSuccess();

  $(config.recoverPasswordForm).on('click', onShowHidePasswordForm);
  $(config.hideRecoverPasswordLink).on('click', onShowHidePasswordForm);

  function onShowHidePasswordForm(evt) {
    evt.preventDefault();
    toggleRecoverPasswordForm();
  }

  function checkUrlHash() {
    var hash = window.location.hash;

    // Allow deep linking to recover password form
    if (hash === '#recover') {
      toggleRecoverPasswordForm();
    }
  }

  /**
   *  Show/Hide recover password form
   */
  function toggleRecoverPasswordForm() {
    $('#RecoverPasswordForm').toggleClass('hide');
    $('#CustomerLoginForm').toggleClass('hide');
  }

  /**
   *  Show reset password success message
   */
  function resetPasswordSuccess() {
    var $formState = $('.reset-password-success');

    // check if reset password form was successfully submited.
    if (!$formState.length) {
      return;
    }

    // show success message
    $('#ResetSuccess').removeClass('hide');
  }
})();


$(document).ready(function() {
  var sections = new slate.Sections();
  sections.register('product', theme.Product);
  sections.register('collection-custom-section', theme.FeaturedCollection);
  sections.register('slider', theme.Slider);

  // Common a11y fixes
  slate.a11y.pageLinkFocus($(window.location.hash));

  $('.in-page-link').on('click', function(evt) {
    slate.a11y.pageLinkFocus($(evt.currentTarget.hash));
  });

  // Target tables to make them scrollable
  var tableSelectors = '.rte table';

  slate.rte.wrapTable({
    $tables: $(tableSelectors),
    tableWrapperClass: 'rte__table-wrapper',
  });

  // Target iframes to make them responsive
  var iframeSelectors =
    '.rte iframe[src*="youtube.com/embed"],' +
    '.rte iframe[src*="player.vimeo"]';

  slate.rte.wrapIframe({
    $iframes: $(iframeSelectors),
    iframeWrapperClass: 'rte__video-wrapper'
  });

  // Apply a specific class to the html element for browser support of cookies.
  if (slate.cart.cookiesEnabled()) {
    document.documentElement.className = document.documentElement.className.replace('supports-no-cookies', 'supports-cookies');
  }
});
