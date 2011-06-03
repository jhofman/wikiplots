DROP TABLE IF EXISTS plots;

CREATE TABLE plots (
	id VARCHAR(255) NOT NULL PRIMARY KEY,
	table_offset INT,
	url VARCHAR(255),
	x_axis VARCHAR(255),
	y_axis VARCHAR(255),
	geom ENUM('line', 'scatter'),
	ts DATETIME,
	ip VARCHAR(255)
) ENGINE=INNODB;
