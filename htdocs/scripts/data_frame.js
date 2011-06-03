function data_frame(data, col_names) {

    this.data = data;
    this.col_names = col_names;
    this.col_types = [];
    this.dim = this.size();

    /*
    $.each(col_names, function(j, col_name) {
	this.col_types.push(this.col_type(col_name));
    });
    */
}

data_frame.prototype.size = function() {
    var cols = this.col_names.length;
    var rows = this.data[this.col_names[0]].length;
    
    return [rows, cols];
}

data_frame.prototype.col = function(col_name) {
    return this.data[col_name];
}

/*
data_frame.prototype.col_type = function(col_name) {
    var type = array_type(this.data[col_name], ['datetime','percentage','currency','number']);
    if (!type)
	return 'text';

    if (type == 'datetime')
	type = array_type(this.data[col_name], ['time','date','datetime']);

    return type;
}
*/

data_frame.prototype.slice = function(i, j) {
    if (parseInt(i) == i && parseInt(j) == j)
	return this.data[this.col_names[j]][i];
    else if ((i == '' || i == null) && parseInt(j) == j)
	return this.data[this.col_names[j]]
    else if (parseInt(i) == i && (j == '' || j == null)) {
	var row = [];

	var data = this.data;
	$.each(this.col_names, function(j, col_name) {
	    row.push(data[col_name][i]);
	});

	return row;
    } else {
	return null;
    }
}

data_frame.prototype.add_col = function(col_name, col) {
    if (col.length != this.dim[0])
	return false;
	
    this.data[col_name] = col;
    this.col_names.push(col_name);

    this.dim[1] += 1;

    return true;
}


data_frame.prototype.add_row = function(row) {
    if (row.length != this.dim[1])
	return false;

    var data = this.data;
    $.each(this.col_names, function(j, col_name) {
	data[col_name].push(row[j]);
    });

    this.dim[0] += 1;

    return true;
}


data_frame.prototype.del_row = function(i) {
    if (i < 0 || i > this.dim[0])
	return false;

    var data = this.data;
    $.each(this.col_names, function(j, col_name) {
	data[col_name].splice(i, 1);
    });

    this.dim[0] -= 1;

    return true;
    
}

data_frame.prototype.del_col = function(col_name) {
    var j = this.col_names.indexOf(col_name);
    
    if (j < 0)
	return false;

    delete this.data[col_name];
    this.col_names.splice(j, 1);
    
    this.dim[1] -= 1;
    
    return true;
}

data_frame.prototype.apply = function(i, j) {

}