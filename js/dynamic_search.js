function search_result(ret, i) {
    delete_divs();
    var newdiv = $('<div class="resultSearch" >'+ret+'</div>');
    $('#SearchBar').append(newdiv);
    $('.resultSearch').css('background-color','#B0B0B0');
    $('.resultSearch').css('width',$('#SearchBarInput').width()+3+'px');
    $('.resultSearch').css('border','solid 1px');
};

$('#SearchBar').keyup(function() {
    var conn = new Connect();
    var inpt = $("#SearchBarInput").val();
    //    alert ($("#SearchBarInput").text.lenght);
    if (inpt != '')
    {
	var ret = new Array();
	ret = conn.dynamicSearch(inpt);
	{
	    $('.resultSearch').remove();
	    var i = 0;
	    while (ret[i]) {
		search_result(ret[i]['users'], i);
		i++;
	    }
	}
    }
    else
	$('.resultSearch').remove();
});
