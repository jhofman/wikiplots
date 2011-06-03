function wikiplot(df, aes, placeholder) {

    var data = [];
    var xs = df.col(aes['x']);
    var ys = df.col(aes['y']);

    var type_x = df.col_types[df.col_names.indexOf(aes['x'])];
    var type_y = df.col_types[df.col_names.indexOf(aes['y'])];

    var xTicks = [];
    var yTicks = [];
    // assume x and y for now
    for (var i=0; i<df.size()[0]; i++) {
	if (type_x == 'text') {
	    x = i;
	    xTicks.push([i, xs[i]]);
	} else {
	    x = xs[i];
	}

	if (type_y == 'text') {
	    y = i;
	    yTicks.push([i, ys[i]]);
	} else {
	    y = ys[i];
	}

	data.push([x,y]);
    }

    var series = [
	{data: data, 
	 points: {show: true}, 
	 lines: {show: false}}];

    var options = {};
    if (type_x == 'text')
	options['xaxis'] = {ticks: xTicks};
    if (type_y == 'text')
	options['yaxis'] = {ticks: yTicks};

    //$.plot($("#wikiplot"), [{data: data, points: {show: true}, lines: {show: false}}]);
    $.plot($("#wikiplot"), series, options);
}


function format_date() {

}