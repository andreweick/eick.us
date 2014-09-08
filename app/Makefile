install:
	@npm install
	@bower install

clean:
	@rm -rf build ../_public

build: clean
	@gulp build

# serve: build <-removed because it seemed to double up tasks
serve:
	@gulp

publish:
	@gulp deploy

.PHONY: install clean build serve publish
