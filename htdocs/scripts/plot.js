function wikiplot(df, aes, placeholder) {

    var data = [];
    var x = df.col(aes['x']);
    var y = df.col(aes['y']);

    // assume x and y for now
    for (var i=0; i<df.size()[0]; i++)
	data.push([x[i],y[i]]);

    $.plot($(placeholder), data);
}


function format_date() {

}