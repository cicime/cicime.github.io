---
layout: post
title: "Homebrew 更换镜像"
subtitle: "Package Manager for macOS, Homebrew, update Ruby"
author: "Toma"
header-style: text
tags:
  - 笔记
  - brew
  - ruby
  - mac
---

> 安装教程 [Homebrew 官网](https://brew.sh/index_zh-cn.html)


## 更换镜像

解决 mac brew update 卡着不动的问题

```sh
# 查看现在镜像源
brew config

# 替换brew.git:
cd "$(brew --repo)"
git remote set-url origin https://mirrors.ustc.edu.cn/brew.git

# 替换homebrew-core.git:
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git

# 替换homebrew-cask.git:
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-cask"
git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-cask.git

# 查看现在镜像源
brew config

# 应用生效
brew update

# 替换homebrew-bottles 在~/.zshrc中添加
export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles

```


如果需要恢复之前的镜像源

```sh
git -C "$(brew --repo)" remote set-url origin https://github.com/Homebrew/brew.git

git -C "$(brew --repo homebrew/core)" remote set-url origin https://github.com/Homebrew/homebrew-core.git

git -C "$(brew --repo homebrew/cask)" remote set-url origin https://github.com/Homebrew/homebrew-cask.git

# 找到 ~/.bash_profile 或者 ~/.zshrc 中的HOMEBREW_BOTTLE_DOMAIN 一行删除
brew update
```


## Mac下升级ruby至最新版本

Mac自身的ruby 版本 2.x，通过ruby -v可以查看版本号。<br />
为更新到ruby的最新版本，可通过以下命令解决：

```sh
brew update
brew install ruby
```

执行完命令后，ruby -v后其实还是原来的版本👌，<br />
这是因为环境变量没有配置。因此，还有一个步骤就是配置环境变量。

```sh
echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.bash_profile

# cat .bash_profile
# 需要找到 gems 版本对应的具体位置 如下，再加入环境变量
# export PATH="/usr/local/lib/ruby/gems/3.0.0/bin:$PATH"

# 刷新
source ~/.bash_profile
```

执行后，查看版本后，会判断已更新到最新版本。