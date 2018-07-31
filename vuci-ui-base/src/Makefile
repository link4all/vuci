#
# Copyright (C) 2017 Jianhui Zhao <jianhuizhao329@gmail.com>
#
# Licensed under the GPL V3
#

all: build

.tmp/.download_stamp: package.json
	if [ -f node_modules.tar.xz ]; \
	then \
		tar Jxf node_modules.tar.xz && rm node_modules.tar.xz; \
	else \
		npm install; \
	fi
	mkdir -p .tmp
	touch .tmp/.download_stamp

prepare: .tmp/.download_stamp

build: prepare
	npm run build
