// JavaScript source code

$(document).ready(function () {
    $('input').focus(function () {
        $(this).addClass('highlight');
    });
    $('input').blur(function () {
        $(this).removeClass('highlight');
    });

   var getData = function (searchText) {

        $.ajax({
            url: 'https://en.wikipedia.org/w/api.php',
            data: { action: 'opensearch', search: searchText, redirects: 'resolve', format: 'json', limit: 'max', formatversion: '2' },
            dataType: 'jsonp',
            success: function (x) {

                displayResult(x);
            }

        });
    }
    $('i').click(function () {

    })

    $('input').keyup(function () {

        //remove white spaces at the start of the string
        var val = $('input').val();
        val = val.replace(/^\s+/, '');
        $('input').val(val);

        if (val.length > 1) {
            getData($(this).val());
        }
        else
            reset();
    });

    function reset() {
        $('.result').html('');
        $('.searchText').hide();
    }
    
});
function displayResult(data) {
    var html = resultText = "";
    var l = data[1].length > 10 ? 10 : data[1].length; 
    for(var i=0; i < l; i++)
    {

        html += "<a  class='row' href='" + data[3][i] + "' target='_blank'>";
        html += "<h3>" + data[1][i] + "</h3>";
        html += "<p>" + data[2][i] + "</p></a>";
        
    }
    $('.result').html(html);
    if (i == 10)
        resultText = 'Showing the first 10 results for <span>"' + data[0] + '"</span>';
    else if (i == 0)
        resultText = 'No results for <span>"' + data[0] + '"</span>';
    else
        resultText = 'Showing results for <span>"' + data[0] + '"</span>';
    
    $('.searchText').html(resultText).show();
    
}

