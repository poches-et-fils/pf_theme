const toggleProductInfo = event => {
  const container = $(event.target).closest(".toggle--item");
  const currentArrow = container.find("img.toggle--icon--plus") || false;
  const plusArrow =
    "https://cdn.shopify.com/s/files/1/0013/6685/1647/files/plus.svg";
  const minusArrow =
    "https://cdn.shopify.com/s/files/1/0013/6685/1647/files/minus.svg";

  container.find(".toggle--contents").toggle("fast");

  if (currentArrow) {
    currentArrow.attr(
      "src",
      currentArrow.attr("src").includes(plusArrow) ? minusArrow : plusArrow
    );
  }
};

$(document).on(
  "click",
  ".toggle--heading, *[class^=toggle--icon]",
  toggleProductInfo
);
