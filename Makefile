
deploy: .ovh-functions-cli
	for f in $(shell ls -d */ | cut -d '/' -f1); do \
		./.ovh-functions deploy -d $$f ; \
	done

.ovh-functions-alpine-cli:
	@echo download ovh-functions cli...
	curl -s https://get.functions.ovh/builds/Alpine-Linux-amd64/ovh-functions > .ovh-functions \
		&& chmod +x .ovh-functions

.ovh-functions-cli:
	@echo download ovh-functions cli...
	curl -s https://get.functions.ovh/builds/Linux-amd64/ovh-functions > .ovh-functions \
		&& chmod +x .ovh-functions
