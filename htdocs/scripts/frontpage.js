$(document).ready(function() {
	
	// when the url is submitted, fetch the page and disply the tables
	$('#urlform').submit(function() {
		var url = $('#urlbox').val();
		$('#tables').html('<div id="loading">loading tables</div>');
		$.getJSON('/gettables.php', {'url': url}, function(tables){
			$('#tables').html('');
			for (var i=0; i<tables.length; i++) {
				table = tables[i];
				$('#tables').append('<div id=table-'+i+'></div><hr class="space" style="height:50px">');
				$('#table-'+i).html(table);
			}
			$.each($('table'), function(){
				$(this).removeClass();
				$(this).attr('style','');
			})
		});
		
		return false;
	});
	$('#urlbox').focus();
	
});
