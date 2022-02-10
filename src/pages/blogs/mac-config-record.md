---
title: mac配置集合
date: 2022-02-10 15:50:15
hero_image: ""
lang: en
duration: 10min
---

## install brew

`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`


## using `nvm` manage node and npm version

### intall nvm

> full guide of nvm: https://github.com/nvm-sh/nvm#readme

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`

if you have problem w/ curl, you can download the release manually.

### install node & npm

run `nvm ls-remote`, you will see the history version of node

just run `nvm install stable` to install the current stabel version of node
then `nvm alias default stable` set the system default node version

the npm will installed with node, you can type`which npm` `which node` to check the location.


### troubleshooting

#### install nvm failed
For me, I have installed nvm before, when I want to update the nvm to the latest version, I got a problem, you can [check this issue](https://github.com/nvm-sh/nvm/issues/2741).
In this case, just do `rm -rf "$NVM_DIR"` to uninstall nvm manually then install  again


## git manage

Normally, mac has `Git` internaly, let's use `Homebrew` to take care of it.

so type:

```sh
# check if there's git already installed by brew firstly
brew info git

# if yes, just upgrade
brew upgrade git
# else
brew update && brew install git  # brew will auto add location to PATH

# check git location
which git

# overwrite the default git 
brew link git

which git # check again, it should be the brew install location

```


## locale

After install git from brew, I found that the message are changed to Chinese where I live'in, so after I search, I know how it works now.

```sh

# check locale, the language of terminal output will be the LANG
locale

# if you wanna change it to English, just type

LANG="en_US.UTF-8"

```

For permanently use, you need set it in `~/.bashrc`, if you have installed git, it should have an option like below, just remove the comment, if not, you can type it by hand.
```sh
# You may need to manually set your language environment
export LANG=en_US.UTF-8
```
