#!/bin/bash
if [[ $# -eq 0 || $1 != "live" ]]; then
	echo "deploying staging version: http://stage.wikiplots.org"
	rsync -rlCtO --modify-window=1 --exclude ".git" --delete htdocs/ mars:/var/www/wikiplots/stage
else
	echo "deploying live version: http://wikiplots.org"
	rsync -rlCtO --modify-window=1 --exclude ".svn" --delete htdocs/ mars:/var/www/wikiplots/public_html
fi
