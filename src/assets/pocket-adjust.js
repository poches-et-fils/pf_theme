window.positionPocket = function($target, gender, type) {
  if(gender == 'Men') {
    $target.css('margin-left', '2%');
    $target.css('margin-top', '-10%');
    if(type == 'Tank-Top') {
    $target.css('margin-left', '3%');
    $target.css('margin-top', '-12%');
    }
  }
  if(gender == 'Women') {
    $target.css('margin-left', '2%');
    $target.css('margin-top', '-13%');
  }
  if(gender == 'Baby') {
    $target.css('margin-left', '0');
    $target.css('margin-top', '0');
  }
  if(gender == 'Kid') {
    $target.css('margin-left', '0');
    $target.css('margin-top', '-5%');
  }
}


$(document).ready(function () {
    var gender = window.poches.filters.helper.gup('gender');
    var type = window.poches.filters.helper.gup('type');
    window.positionPocket($('.product-preview'), gender, type);
});