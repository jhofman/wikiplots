// javascript:function%20include(src)%20{}var%20scripts%20=%20[%22jquery-1.6.1.min.js%22,%22jquery.flot.min.js%22,%22date.js%22,%22parse.js%22,%22data_frame.js%22,%22plot.js%22];for%20(var%20i=0;%20i<scripts.length;%20i++)%20{var%20script%20=%20document.createElement(%27script%27);script.type%20=%20%27text/javascript%27;script.src%20=%20%27http://wikiplots.org/scripts/%27%20+%20scripts[i];if%20(scripts[i]%20==%20scripts[scripts.length-1])script.onload%20=%20function()%20{wrap_tables(find_tables());};document.body.appendChild(script);}
function include(src) {
}

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
