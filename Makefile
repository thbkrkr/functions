
deploy: .funk-cli
	for f in $(shell ls -d */ | cut -d '/' -f1); do \
		./.funk-cli deploy -d $$f ; \
	done

.funk-cli:
	@echo download funk-cli...
	curl -s https://get.functions.ovh/builds/Alpine-Linux-amd64/funk-cli > .funk-cli \
		&& chmod +x .funk-cli

