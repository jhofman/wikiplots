// slick way to include data_frame.js from here?

var selected_table = undefined;

function find_tables() {
    return $('table:has(th)')
}

function wrap_tables(tables) {
    $.each(tables, function(t, table) {

      var a = $('<a>').attr('title','Click to Wikiplot');
      $(a).click(function() {
        select_table(this);
	parse_table(this);
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

function select_table(table) {
    selected_table = table;
}

function parse_table(table) {
    var table_data = {};
    var table_headers = [];

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
    */

    var values = ['3.14', '1,234', '1/10/11', 'May 21, 2011', '9:06 pm', '21:00', '$10.00', '€10,000', '0.2%', '5,000%'];

    $.each(values, function (i, vi) {
	var types = [];
	$.each(['is_number', 'is_currency', 'is_percentage', 'is_datetime', 'is_date', 'is_time'], function (j, fj) {
	    if (window[fj](vi))
		types.push(fj);
	});
	console.log(vi + ': ' + types.join(', '));
    });

}


function to_number(x) {
    var number = x.replace(',','');

    if (isNaN(number))
        return false;
    else
	return number;
}

function to_currency(x) {
    var signs = ["₳","฿","₵","¢","₡","₢","₠","$","₫","৳","₯","€","ƒ","₣","₲","₴","₭","ℳ","₥","₦","₧","₱","₰","£","₹","₨","₪","₸","₮","₩","¥","៛"];

    var sign = x.substring(0,1);
    var amount = x.substring(1,x.length);

    if (signs.indexOf(sign) < 0)
	return false;
    else
	if (is_number(amount))
	    return amount; //[sign, amount];
        else
	    return false;
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
	    return x.substring(0,x.length-1);
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
