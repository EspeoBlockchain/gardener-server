all: copy-env
	docker-compose up -d

copy-env:
	if ! [ -e .env ]; then cp .env.tpl .env; fi;

build:
	docker-compose build

clean:
	docker-compose down

local: copy-env
	docker-compose -f docker-compose.yml -f docker-compose.local.yml up -d

build-local:
	docker-compose -f docker-compose.yml -f docker-compose.local.yml build

clean-local:
	docker-compose -f docker-compose.yml -f docker-compose.local.yml down
