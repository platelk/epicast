var	pos = 0;
var	old_in = undefined;

function search_dyn_result(ret, i, pos) {
    var newdiv = $('<div class="resultSearch" id="divSearch'+i+'">'+ret+/*'<span class=desc>('+'users'+')</span>*/'</div>');
    $('#SearchBar').append(newdiv);
    $('.desc').css('color', '#BABABA');
    $('.desc').css('position', 'absolute');
    $('.desc').css('text-align', 'right');
    $('.desc').css('text-align', 'right');
    $('.desc').css('width', $('#SearchBarInput').width()+'px');
    if (i != pos)
	$('#divSearch'+i).css('background-color','#B0B0B0');
    else
	$('#divSearch'+i).css('background-color','#1E7FCB');
    $('.resultSearch').css('width',$('#SearchBarInput').width()+3+'px');
    $('.resultSearch').css('border','solid 1px');
};

$('#SearchBar').keyup(function(e) {
    var conn = new Connect();
    var inpt = $("#SearchBarInput").val();

    var tab = ['users'];
    var ret = conn.dynamicSearch(inpt);
    for (var l = 0; tab[l]; l++)
    {
	if (e.keyCode == 13 || inpt != '' || (e.keyCode >= 38 && e.keyCode <= 41))
	{
	    if (old_in == undefined)
		old_in = inpt;
	    if (inpt != old_in) {
		pos = 0;
		old_in = inpt;
	    }
	    else {
		if (e.keyCode == 38 || e.keyCode == 40)
		{
		    if (e.keyCode == 38)
		    {
			if (pos == 0)
			    pos = ret.length - 1;
			else
			    pos--;
		    }
		    if (e.keyCode == 40)
		    {
			if (pos == ret.length - 1)
			    pos = 0;
			else
			    pos++;
		    }
		}
	    }
	    if (e.keyCode == 13)
	    {
		$("#SearchBarInput").val(ret[pos][tab[l]]);
		connect_to_user($("#SearchBarInput").val());
		$('.resultSearch').remove();
	    }
	    else
	    {
		$('.resultSearch').remove();
		for (var i = 0; ret.length > i;i++)
		{
		    $('#divSearch'+i).remove();
		    search_dyn_result(ret[i][tab[l]], i, pos);
		}
	    }
	}
	else
	    $('.resultSearch').remove();
    }
});
