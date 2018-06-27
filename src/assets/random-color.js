const getRandColor = _ => {
  const colors = ["f9f9f9", "f9f9f9", "f9f9f9", "f9f9f9", "f9f9f9"];
  return `#${colors[Math.floor(Math.random() * colors.length)]}c2`;
};

const fillBg = _ => {
  const itemsContainer = $(".random-colored-bg");
  itemsContainer.map((i, item) =>
    $(item).css("background-color", getRandColor())
  );
};

$(document).ready(fillBg);
