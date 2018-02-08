#
# Copyright (C) 2017 Jianhui Zhao <jianhuizhao329@gmail.com>
#
# Licensed under the GPL V3
#

all: build

.tmp/.download_stamp: package.json
	if [ -f node_modules.tar.xz ]; \
	then \
		tar Jxvf node_modules.tar.xz && rm node_modules.tar.xz; \
	else \
		npm install; \
	fi
	mkdir -p .tmp
	touch .tmp/.download_stamp

prepare: .tmp/.download_stamp

build: prepare
	echo "// Automatically generated file; DO NOT EDIT." > ./src/apps/index.js
	cd ./src/apps; for app in `ls -d */ | tr '/' ' '`; do echo "import $$app from './$$app'" >> ./index.js; done

	echo -n "export default [" >> ./src/apps/index.js
	cd ./src/apps; apps=`ls -d */ | sed 's/\///g' | tr '\n' ','`; echo -n "$${apps%?}]" >> ./index.js

	npm run build

	rm -rf ./.tmp/apps; mkdir ./.tmp/apps
	cd ./src/apps; for app in `ls -d */ | tr '/' ' '`; do mv ../../dist/static/js/$$app.*.js ../../.tmp/apps; done
