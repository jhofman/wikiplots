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
	console_html += '<br/><br/><button class="save">Save Plot</button><br/><input type="text" class="plot-url">'
	console_html += '<input type="hidden" name="geom"><input type="hidden" name="x_axis"><input type="hidden" name="y_axis">';
	
	$(div).html(console_html);
}

$(document).ready(function() {
	
	// fetch the page and disply the tables
		$('#panels').html('<div id="loading">loading tables</div>');
		$.getJSON('/gettables.php', {'url': url, 'table_offset': table_offset}, function(table){
			$('#panels').html('');
			var panel_id = 0;
			
			// insert panel structure (console, plot, table)
			var panel_html = "<div id=panel-" + panel_id +" class='wikiplot-panel span-24 last'>";
			panel_html += "<div class='console span-8'>console</div>";
			panel_html += "<div class='span-15 prepend-1 last'><div class='plot-wrapper'></div></div>";
			panel_html += '<hr class="space" style="height:10px"">';
			panel_html += '<input type="hidden" name="table_offset" value="' + table_offset + '">';
			panel_html += "<div class='table_div span-24 last'></div>";
			panel_html += "<hr class='space' style='height:50px'></div>";
			$('#panels').append(panel_html);
			var panel = $('#panel-' + panel_id);
				
			// insert table and validate
			panel.find('.table_div').html(table);
			var df = parse_table(panel.find('table'));
			var dims = false;
			if (df) { dims = df.size(); }
			
			if (df && dims[0] > 1 && dims[1] > 1 && dims[0] > dims[1]) {
				panel_id++;
				dfs.push(df);
			} else {
				panel.remove();
				return
			}
				
				// add console
			add_console(df, panel.find('.console'));
			
				panel.find('input[name="geom"]').val(geom);
				panel.find('input[name="x_axis"]').val(x_axis);
				panel.find('input[name="y_axis"]').val(y_axis);
						
			// strip table styling and deactivate links
			$.each($('table'), function(){
				$(this).removeClass().attr('style','');
				$(this).find('a').attr('href','#').click(function(){ return false; });
			})
			
			// set up plotting buttons
			$('.plot-button').click(function(){
				alert('click');
				var panel = $(this).parents('.wikiplot-panel');
				var df = dfs[panel.attr('id').split('-')[1]];
				console.log(df);
				var geom = $(this).attr('name');
				var x_axis = df.col_names[panel.find('.x-axis option:selected').attr('name')];
				var y_axis = df.col_names[panel.find('.y-axis option:selected').attr('name')];
				
				panel.find('input[name="geom"]').val(geom);
				panel.find('input[name="x_axis"]').val(x_axis);
				panel.find('input[name="y_axis"]').val(y_axis);
				
				plot = panel.find('.plot-wrapper');
				plot.show();
				wikiplot(df, {x: x_axis, y: y_axis, geom: geom}, plot);
			})
			
			
			// set up plot saving
			$('.save').click(function() {
				var panel = $(this).parents('.wikiplot-panel');
				$.get('save_plot.php', {
					url: url,
					table_offset: panel.find('input[name="table_offset"]').val(),
					geom: panel.find('input[name="geom"]').val(),
					x_axis: panel.find('input[name="x_axis"]').val(),
					y_axis: panel.find('input[name="y_axis"]').val()
				}, function(plot_id) {
					if (plot_id) { panel.find('.plot-url').val('http://wikiplots.org/plots.php?id=' + plot_id) };
				})
			})
		});
		
		console.log(dfs[0]);
		wikiplot(dfs[0], {x: x_axis, y: y_axis, geom: geom}, $('.plot-wrapper'));
	
});
