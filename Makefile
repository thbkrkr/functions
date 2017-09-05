
deploy: .ovh-functions-cli
	for f in $(shell ls -d */ | cut -d '/' -f1); do \
		./.ovh-functions-cli deploy -d $$f ; \
	done

.ovh-functions-cli:
	@echo download ovh-functions cli...
	curl -s https://get.functions.ovh/builds/Alpine-Linux-amd64/ovh-functions > .ovh-functions-cli \
		&& chmod +x .ovh-functions-cli

