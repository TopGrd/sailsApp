$(document).ready(function () {
    var total = $('#pagess').attr('data-pages') + 1;
    var pathname = location.pathname;
    var arr = pathname.split('/');
    $('#pagess').pagination({
        items: total,
        itemsOnPage: 10,
        currentPage: arr[arr.length - 1],
        cssStyle: '',
        hrefTextPrefix: '',
        onPageClick: function (number) {
            $('#pagess ul').addClass('pagination');

        }
    });
    $('#pagess ul').addClass('pagination');

});
