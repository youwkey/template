# Templates

Github does not support 'git archive --remote', so using svn command.

``` shell
# copy template
svn export https://github.com/youwkey/templates.git/trunk/go/package ./path/to/project
svn export https://github.com/youwkey/templates.git/trunk/go/alfred-workflow ./path/to/project

# move to project
cd ./path/to/project

# set go version
goenv local x.y.z

# init go.mod
go mod init github.com/youwkey/xxxxx
```