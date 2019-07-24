all: copy-env
	docker-compose up -d --build

copy-env:
	if ! [ -e .env ]; then cp .env.tpl .env; fi;

clean:
	docker-compose down

local: copy-env
	docker-compose -f docker-compose.yml -f docker-compose.local.yml up -d --build

clean-local:
	docker-compose -f docker-compose.yml -f docker-compose.local.yml down

ganache:
	docker-compose -f docker-compose.yml -f docker-compose.local.yml up -d --build ganache-cli

sgx: copy-env
	docker-compose -f docker-compose.sgx.yml -f docker-compose.local.yml up -d --build
