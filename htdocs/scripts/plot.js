$(document).ready(function() {
  $(document.body).append('<style type="text/css">' +
		   '.diagonal {' +
		   '-o-transform:rotate(-45deg);' +
		   '-moz-transform: rotate(-45deg);' +
		   '-webkit-transform:rotate(-45deg);}' +
		   '</style>');
});

function wikiplot(df, aes, placeholder) {

    var options = {grid: {hoverable: true}};

    var type_x = df.col_types[df.col_names.indexOf(aes['x'])];
    var type_y = df.col_types[df.col_names.indexOf(aes['y'])];

    var x = to_points(df, aes['x']);
    var y = to_points(df, aes['y']);

    if (type_x == 'number' && aes['scale_x'] == 'log') {
	log_x = log10(x);
        options['xaxis'] = {ticks: zip(log_x, x)};
	x = log_x;
    }
    if (type_y == 'number' && aes['scale_y'] == 'log') {
	log_y = log10(y);
        options['yaxis'] = {ticks: zip(log_y, y)};
	y = log_y;
    }

    var data = zip(x,y);

    var series = [
	{data: data,
	 points: {show: true},
	 lines: (aes['geom'] == 'line') ? {show: true} : {show: false}}];

    if (type_x == 'text')
	options['xaxis'] = {ticks: zip(seq(x.length), df.col(aes['x']))};
    if (type_y == 'text')
	options['yaxis'] = {ticks: zip(seq(y.length), df.col(aes['y']))};

    if (type_x == 'date')
	options['xaxis'] = {mode: 'time', timeformat: '%y/%m/%d'};
    if (type_y == 'date')
	options['yaxis'] = {mode: 'time', timeformat: '%y/%m/%d'};

    if (type_x == 'time')
	options['xaxis'] = {mode: 'time', timeformat: '%H:%M:%S'};
    if (type_y == 'time')
	options['yaxis'] = {mode: 'time', timeformat: '%H:%M:%S'};

    if (type_x == 'datetime')
	options['xaxis'] = {mode: 'time', timeformat: '%y/%m/%d %H:%M:%S'};
    if (type_y == 'datetime')
	options['yaxis'] = {mode: 'time', timeformat: '%y/%m/%d %H:%M:%S'};

    var plot = $.plot($(placeholder), series, options);

    if (type_x == 'text')
	$(placeholder).find('.xAxis .tickLabel').addClass('diagonal');

    if (aes['hover'] in df.data) {
	var previousPoint = null;
	$(placeholder).bind("plothover", function (event, pos, item) {
            $("#x").text(pos.x.toFixed(2));
            $("#y").text(pos.y.toFixed(2));
	    
            if (item) {
		var index = item.dataIndex;
		if (previousPoint != item.dataIndex) {
                    previousPoint = item.dataIndex;
                    
                    $("#tooltip").remove();
                    var label = df.data[aes['hover']][index];
                    showTooltip(item.pageX, item.pageY, label);
                    //item.series.label + " of " + x + " = " + y);
		}
            }
            else {
		$("#tooltip").remove();
		previousPoint = null;            
            }
            
	});
    }
}


function showTooltip(x, y, contents) {
    $('<div id="tooltip">' + contents + '</div>').css( {
	position: 'absolute',
	display: 'none',
	top: y + 5,
	left: x + 5,
	//border: '1px solid #fdd',
	padding: '2px',
	'background-color': '#fff',
	opacity: 0.80
    }).appendTo("body").show();
}


function to_points(df, col_name) {
    var j = df.col_names.indexOf(col_name);
    var type = df.col_types[j];
    var col = df.col(col_name);

    if (type == 'number' || type == 'currency' || type == 'percentage')
	return col;
    else { 
	var points = col.map(function (x, i) {	    
	    if (type == 'date' || type == 'time' || type == 'datetime')
		return to_timestamp(x); //.format('u'); // seems to fail
	    else
		return i;
	});
    
	return points;
    }

}

function to_timestamp(d) {
    var year = d.toString('yyyy');
    var month = d.toString('M');
    var day = d.toString('d');
    var hour = d.toString('H');
    var min = d.toString('m');
    var sec = d.toString('s');

    //console.log(year + ' ' + month + ' ' + day + ' ' + hour + ' ' + min + ' ' + sec);
    var d2 = new Date(year, month, day, hour, min, sec, 0);

    return d2.getTime();
}

function seq(n) {
    var v = [];
    
    for (var i=0; i<n; i++)
	v.push(i);

    return v;
}

function zip(x, y) {
    if (x.length != y.length)
	return undefined;

    var v = [];
    for (var i=0; i<x.length; i++)
	v.push([x[i],y[i]]);

    return v;
}

function log10(v) {
    return $(v).map(function (i, vi) {
	return Math.log(vi)/Math.log(10);
    });
}