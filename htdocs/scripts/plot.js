function wikiplot(df, aes, placeholder) {

    var type_x = df.col_types[df.col_names.indexOf(aes['x'])];
    var type_y = df.col_types[df.col_names.indexOf(aes['y'])];

    var x = to_points(df, aes['x']);
    var y = to_points(df, aes['y']);

    var data = zip(x,y);
    
    console.log(df.data[aes['x']]);
    console.log(to_points(df, aes['x']));
    //console.log(data);

    var series = [
	{data: data,
	 points: {show: true},
	 lines: (aes['geom'] == 'line') ? {show: true} : {show: false}}];

    var options = {};
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

    $.plot($(placeholder), series, options);

    if (type_x == 'text')
	$(placeholder).find('.xAxis .tickLabel').addClass('diagonal');
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

