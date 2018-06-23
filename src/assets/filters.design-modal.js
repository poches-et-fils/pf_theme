$(document).ready(function () {
    $('.open-design-modal').click(function () {
        $('#design-selector').show();
    });
    $('#design-selector > .close-modal').click(function () {
        $('#design-selector').hide();
    });
    $('.design-selector-design').click(function () {
        if($('body').hasClass('template-product')) {
            window.location = window.location.href.replace(JSON.parse($('script[data-product-json]').html())['handle'], $(this).attr('data-design-handle'));
        } else {
            window.poches.filters.helper.uup('design', $(this).attr('data-design-title'));
        }
    });
    $('.design-selector-nav > a').click(function (e) {
        $('.design-selector-nav > a').css('font-weight', 'normal');
        $(this).css('font-weight', 'bold');
        e.preventDefault();
        $('.design-selector-products').hide();
        $('.design-selector-products[data-product-category="' + $(this).attr('data-product-category') + '"]').show();
        return false;
    });
});