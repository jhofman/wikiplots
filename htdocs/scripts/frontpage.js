// array of dataframes for each table
var dfs = [];

// generate the control panel, and insert it into the given div
function add_console(df, div) {
	var cols_html = '';
	$.each(df.col_names, function(index, col_name){
		cols_html += '<option name="' + index + '">' + col_name + '</option>';
	});
	var console_html = 'x-axis: <select class="x-axis">' + cols_html + '</select>';
	console_html += '<br/>y-axis: <select class="y-axis">' + cols_html + '</select>';
	console_html += '<br/><img name="scatter" class="plot-button" src="/images/scatter_button.png">';
	console_html += '<img name="line" class="plot-button" src="/images/line_button.png">';
	
	$(div).html(console_html);
}

$(document).ready(function() {
	
	// when the url is submitted, fetch the page and disply the tables
	$('#urlform').submit(function() {
		var url = $('#urlbox').val();
		$('#panels').html('<div id="loading">loading tables</div>');
		$.getJSON('/gettables.php', {'url': url}, function(tables){
			$('#panels').html('');
			var panel_id = 0;
			$.each(tables, function(i, table){
				// insert panel structure (console, plot, table)
				var panel_html = "<div id=panel-" + panel_id +" class='wikiplot-panel span-24 last'>";
				panel_html += "<div class='console span-8'>console</div>";
				panel_html += "<div class='span-15 prepend-1 last'><div class='plot-wrapper'></div></div>";
				panel_html += '<hr class="space" style="height:10px"">';
				panel_html += "<div class='table_div span-24 last'></div>";
				panel_html += "<hr class='space' style='height:50px'></div>";
				$('#panels').append(panel_html);
				var panel = $('#panel-' + panel_id);
				
				// insert table and validate
				panel.find('.table_div').html(table);
				var df = parse_table(panel.find('table'));
				if (df) {
					panel_id++;
					dfs.push(df);
				} else {
					panel.remove();
					return
				}
				
				// add console
				add_console(df, panel.find('.console'));
			});
			
			// strip table styling and deactivate links
			$.each($('table'), function(){
				$(this).removeClass().attr('style','');
				$(this).find('a').attr('href','#').click(function(){ return false; });
			})
			
			// set up plotting buttons
			$('.plot-button').click(function(){
				var panel = $(this).parents('.wikiplot-panel');
				var df = dfs[panel.attr('id').split('-')[1]];
				console.log(df);
				var geom = $(this).attr('name');
				var x_axis = df.col_names[panel.find('.x-axis option:selected').attr('name')];
				var y_axis = df.col_names[panel.find('.y-axis option:selected').attr('name')];
				plot = panel.find('.plot-wrapper');
				plot.show();
				wikiplot(df, {x: x_axis, y: y_axis, geom: geom}, plot);
			})
		});
		
		return false;
	});
	$('#urlbox').focus();
	
});
