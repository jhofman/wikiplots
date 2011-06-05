var script_base = 'http://wikiplots.org/scripts/';
var scripts = ["jquery.flot.min.js","date.js","parse.js","data_frame.js","plot.js"];

function on_load() {
    console.log('wrapping tables');

    wrap_tables(find_tables());
} 

function load_script(i) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = script_base + scripts[i];

    console.log('loading script ' + i + ': ' + script.src);

    if (i < scripts.length-1)
	script.onload = load_script(i+1);
    else
	script.onload = on_load;

    document.body.appendChild(script);
}

if (typeof jQuery == 'undefined') {
    var script = document.createElement('script');

    script.type = 'text/javascript';
    script.src = script_base + "jquery-1.6.1.min.js";
    script.onload = load_script(0);

    console.log('loading ' + script.src);

    document.body.appendChild(script);
} else {
    load_script(0);
}
