var scripts = ["jquery-1.6.1.min.js","jquery.flot.min.js","date.js","parse.js","data_frame.js","plot.js"];

for (var i=0; i<scripts.length; i++) {

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://wikiplots.org/scripts/' + scripts[i];

    if (scripts[i] == scripts[scripts.length-1])
	script.onload = function() {
	    //document.body.appendChild('<style type="text/css" src="http://wikiplots.org/css/base.css"></style>');
	    wrap_tables(find_tables());
	};

    document.body.appendChild(script);

}
