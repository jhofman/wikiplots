// slick way to include data_frame.js from here?

function find_tables() {
    return $('table:has(th)')
}

function wrap_tables(tables) {
    $.each(tables, function(t, table) {

      var a = $('<a>').attr('title','Click to Wikiplot');
      $(a).click(function() {
        select_table(this);
      });
      $(this).wrap(a);

      var width = $(table).css('border-width');

      $(table).hover(function() {
        $(this).css('border-width','5px');
      }, function() {
        $(this).css('border-width', width);
      });

    });
}

/*
function add_console(df, div) {
	var cols_html = '';
	$.each(df.col_names, function(index, col_name){
		cols_html += '<option name="' + index + '">' + col_name + '</option>';
	});
	var console_html = 'x-axis: <select class="x-axis">' + cols_html + '</select>';
	console_html += '<br/>y-axis: <select class="y-axis">' + cols_html + '</select>';
        console_html += '<br/><img name="scatter" class="plot-button" src="http://wikiplots.org/images/scatter_button.png">';
        console_html += '<img name="line" class="plot-button" src="http://wikiplots.org/images/line_button.png">';
        console_html += '<div id="wikiplot" style="width:400px;height:300px"></div>';

	$(div).html(console_html);
}
*/

function select_table(table) {
    var df = parse_table(table);
    console.log(df);
    
    var table_id = $(table).find('table')[0].id;
    $("#panel").remove();

    var panel_html = "<div id='panel' class='wikiplot-panel span-24 last'>";
    panel_html += "<div class='console span-8'>console</div>";
    panel_html += "<div class='span-15 prepend-1 last'><div class='plot-wrapper'></div></div>";
    panel_html += '<hr class="space" style="height:10px"">';
    panel_html += "<div class='table_div span-24 last'></div>";
    panel_html += "<hr class='space' style='height:50px'></div>";

    $(table).before(panel_html);

    add_console(df, $("#panel"));
    //wikiplot(df, {x: df.col_names[2], y: df.col_names[4]}, $("#wikiplot"));
    //wikiplot(df, {x: df.col_names[1], y: df.col_names[4], geom: 'line'}, $("#wikiplot"));
    //wikiplot(df, {x: df.col_names[3], y: df.col_names[4]}, $("#wikiplot"));

    // set up plotting buttons
    $('.plot-button').click(function(){
	var panel = $("#panel"); //$(this).parents('.wikiplot-panel');

	var geom = $(this).attr('name');
	var x_axis = df.col_names[panel.find('.x-axis option:selected').attr('name')];
	var y_axis = df.col_names[panel.find('.y-axis option:selected').attr('name')];
	plot = $("#wikiplot"); //panel.find('.plot-wrapper');
	plot.show();
	wikiplot(df, {x: x_axis, y: y_axis, geom: geom}, plot);
    })

}

function parse_table(table) {
    var table_data = {};
    var table_headers = [];

  try {
    $.each($(table).find('tr:first th'), function() {
	var header = $(this).text();

	table_headers.push(header);
	table_data[header] = [];
    });

    $.each($(table).find('tr'), function(i, tr) {
	$.each($(tr).find('td'), function(j, td) {
	    table_data[table_headers[j]].push($(td).text());
	});
    });

    var df = new data_frame(table_data, table_headers);

    return df;

  } catch (err) {
    return false;
  }
    /*
    console.log(df.slice(0,''));
    console.log(df.slice('',0));
    console.log(df.slice(1,1));
    console.log(df.col('Population'));

    df.add_col('foo', [0,1,2,3,4,5,6,7,8,9]);
    df.add_row([1,2,3,4,5,6,7]);
    df.del_row(0);
    df.del_col('Population');

    console.log(df);

    var values = ['3.14', '1,234', '1/10/11', 'May 21, 2011', '9:06 pm', '21:00', '$10.00', '€10,000', '0.2%', '5,000%'];

    $.each(values, function (i, vi) {
	var types = [];
	$.each(['is_number', 'is_currency', 'is_percentage', 'is_datetime', 'is_date', 'is_time'], function (j, fj) {
	    if (window[fj](vi))
		types.push(fj);
	});
	console.log(vi + ': ' + types.join(', '));
    });

    console.log('column types:');
    $.each(df.col_names, function(j, col_name) {
	console.log('\t' + col_name + ': ' + df.col_types[j]);//col_type(df.data[col_name]));
    });

    */
    
}


function array_type(v, types) {
    var type = false;

    $.each(types, function (t, type_t) {
	if (!type)
	    type = type_t;

	$.each(v, function (i, vi) {
	    if (!window['is_' + type](vi)) {
		type = false;
		return false;
	    }
	});

    });

    if (!type)
	return false;
    else
	return type;
}

function col_type(col) {
    //var type = array_type(col, ['datetime','percentage','currency','number']); // date has priority over number
    var type = array_type(col, ['number','datetime','percentage','currency']); // number has priority over date

    if (!type)
	return 'text';
    else
	if (type == 'datetime')
	    return array_type(col, ['time','date','datetime']);
        else
	    return type;
}

function to_number(x) {
    var number = x.replace(/,/g,'');

    if (isNaN(number))
        return false;
    else
	return parseFloat(number);
}

function to_currency(x) {
    var signs = ["₳","฿","₵","¢","₡","₢","₠","$","₫","৳","₯","€","ƒ","₣","₲","₴","₭","ℳ","₥","₦","₧","₱","₰","£","₹","₨","₪","₸","₮","₩","¥","៛"];

    var sign = x.substring(0,1);
    var amount = x.substring(1,x.length);

    if (signs.indexOf(sign) < 0)
	return false;
    else
	return to_number(amount);
}

function currency_sign(x) {
    if (is_currency(x))
	return x.substring(0,1);
    else
	return false;
}

function to_percentage(x) {
    if (x.substring(x.length-1) != '%')
	return false;
    else
	if (is_number(x.substring(0,x.length-1)))
	    return to_number(x.substring(0,x.length-1));
        else
	    return false;
}

function to_datetime(x) {
    var d = Date.parse(x);

    if (d == null || !d)
	return false;
    else
	return d;
}

function to_date(x) {
    var d = Date.parse(x);

    if (d == null || !d)
	return false;
    else {
	var no_time = d.equals(d.clone().clearTime());
	if (no_time)
	    return d;
	else
	    return false;
    }
}

function to_time(x) {
    var d = Date.parse(x);

    if (d == null || !d)
	return false;
    else {
	var same_day = d.toString('yyyy-MM-dd') == Date.today().toString('yyyy-MM-dd');
	if (same_day)
	    return d;
	else
	    return false;
    }
}

function to_text(x) {
    return $.trim(x.replace(/\s+/g,' '));
}

function is_type(x, f) {
    var x = f(x);

    if (typeof x == "boolean" && !x)
	return false;
    else
	return true;
}

function is_number(x) { return is_type(x, to_number); }
function is_currency(x) { return is_type(x, to_currency); }
function is_percentage(x) { return is_type(x, to_percentage); }
function is_datetime(x) { return is_type(x, to_datetime); }
function is_date(x) { return is_type(x, to_date); }
function is_time(x) { return is_type(x, to_time); }
function is_text(x) { return is_type(x, to_text); }
