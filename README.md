# Poches Et Fils Theme

Version: 0.0.11


## Issue Tracking

- Aligning pocket items on desktop
- Adding tag function/removing JS function (adjusting sidebar)
- Non-Pocket Products not adding to cart
- Sending random size on non-pocket products to cart (bypass sizing selector)
- Changing lower homepage promotion section from image to section with text/button
- Design selector on product page doesn't work on older Chrome/Safari (tested by client, not tested in-house)
- Language setup
- Homepage slider z-index is higher than the cart
- Continous load doesn't have a lazy-load effect where as you scroll the background appears, then others appear.
- Lazy load only loads SOME products in collection
- No related products on non-pocket product page


## Getting Started

I assume that you at least have some knowledge of liquid. A lot of the code written is for specific use cases.
Each folder contains a ReadMe which goes through how installation should take place.

Built with Slate


## Basic Structure

```
├── assets
│   └── Javascript, CSS, and theme images
├── layout
│   ├── theme.liquid
│   └── optional alternate layouts
├── snippets
│   └── custom code snippets
├── spec
│   └── tests and helpers
├── templates
│   ├── 404.liquid
│   ├── article.liquid
│   ├── blog.liquid
│   ├── header.liquid
│   ├── cart.liquid
│   ├── collection.liquid
│   ├── collection.list.liquid
│   ├── collection--design.liquid
│   ├── collection--sidebar.liquid
│   ├── collection--section.liquid
│   ├── faq--section.liquid
│   ├── featured--collection--section.liquid
│   ├── featured--product.liquid
│   ├── footer.liquid
│   ├── index.liquid
│   ├── list-collections.liquid
│   ├── page.contact.liquid
│   ├── page.liquid
│   ├── newsletter--section.liquid
│   ├── product--normal.liquid
│   ├── product--pocket.liquid
│   ├── product.liquid
│   ├── promotion--section.liquid
│   ├── search.liquid
│   ├── slider-section.liquid
│   └── customers NOT REQUIRED
│         └── required templates if customer accounts are enabled
├── config.yml
│   └── remote push, and live site integration

```


## Additional resources

- Final Design view https://scene.zeplin.io/project/5a9d8fad6523d5a82930aa7d
- Themes Documentation: [To be release].
- Shopify Slate Kit: Theme scaffold and command line tool for developing Shopify themes - [Learn more](https://github.com/Shopify/slate).
- Liquid Cheat Sheet: [link](https://www.shopify.com/partners/shopify-cheat-sheet)


** to be detailed
