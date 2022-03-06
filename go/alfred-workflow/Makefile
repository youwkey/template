PACKAGE_NAME := "xxxxx.alfredworkflow"
EXEC_BIN := "alfred-xxxxx"
DIST_DIR := "build"

# Dependency tool versions
GOTESTSUM_VERSION := 1.7.0
GOLANGCLI_VERSION := 1.44.2

.PHONY: all mod test lint fix copy-build-assets package-workflow clean tools

all: build copy-build-assets package-workflow

mod:
	go mod tidy

check: test lint

test:
	gotestsum --format=short-verbose -- -race

lint:
	golangci-lint run

fix:
	golangci-lint run --fix

build: mod
	CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 go build -o $(DIST_DIR)/$(EXEC_BIN)-amd64
	CGO_ENABLED=0 GOOS=darwin GOARCH=arm64 go build -o $(DIST_DIR)/$(EXEC_BIN)-arm64

copy-build-assets:
	cp info.plist icon.png $(DIST_DIR)

package-workflow:
	cd $(DIST_DIR) && zip -r $(PACKAGE_NAME) ./

clean:
	rm -r $(DIST_DIR)

tools:
	go install gotest.tools/gotestsum@v$(GOTESTSUM_VERSION)
	go install github.com/golangci/golangci-lint/cmd/golangci-lint@v$(GOLANGCLI_VERSION)
