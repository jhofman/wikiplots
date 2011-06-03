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
	 lines: {show: false}}];

    var options = {};
    if (type_x == 'text')
	options['xaxis'] = {ticks: zip(seq(x.length), df.col(aes['x']))};
    if (type_y == 'text')
	options['yaxis'] = {ticks: zip(seq(y.length), df.col(aes['y']))};

    if (type_x == 'date')
	options['xaxis'] = {mode: 'time', timeformat: '%y/%m/%d'};
    if (type_y == 'date')
	options['yaxis'] = {mode: 'time', timeformat: '%y/%m/%d'};

    $.plot($("#wikiplot"), series, options);
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
		return x; //.format('u'); // fix this
	    else
		return i;
	});
    
	return points;
    }

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

