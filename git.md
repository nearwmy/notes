## 收集一些关于git的操作

### git clone

`git clone url` 根据url将代码克隆到本地  
`git clone url reponame` 当自定义前目录名

### git status

`git status` 检查当前文件状态，记录从上次提交后所有文件状态  
`git status -s` 显示简洁版的文件状态  
`git status -b` 根据分支显示状态信息  
`git status --ignored` 显示被忽略文件的状态信息  

### git add

`git add  filename` 开始跟踪新文件  
`git add -A/*`  跟踪所有未跟踪文件，将其放到本地仓库的暂存区

### .gitignore 

` touch .gitignore `创建需要忽略的文件规则,摘自[Git](https://git-scm.com/book/zh/v1/Git-%E5%9F%BA%E7%A1%80-%E8%AE%B0%E5%BD%95%E6%AF%8F%E6%AC%A1%E6%9B%B4%E6%96%B0%E5%88%B0%E4%BB%93%E5%BA%93)

```
# 此为注释 – 将被 Git 忽略
# 忽略所有 .a 结尾的文件
*.a
# 但 lib.a 除外
!lib.a
# 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
/TODO
# 忽略 build/ 目录下的所有文件
build/
# 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
doc/*.txt
# 忽略 doc/ 目录下所有扩展名为 txt 的文件
doc/**/*.txt
```

### git commit

`git commit -m commitInfo` 提交到仓库，commitInfo 为提交信息  
`git commit -a -m commitInfo ` 跳过 `git add` 操作，自动暂存跟踪过文件的修改，并添加提交信息，**注意未跟踪过的文件不能跳过 git add 操作**  
`git commit --amend` 修改最后一次提交

```
git commit -m 'initial commit' // 修改最后一次提交
git add forgotten_file    // 添加忘记跟踪文件
git commit --amend    

```
### git reset 
`git reset HEAD filename` git commit之后，取消已暂存的文件
`git reset --hard commitNum` 回到某个版本号
`git reset --hard HEAD^` 回退到上一个版本号

### git reflog
当你提交或修改分支时,记录每次命令操作,可用于从新版回退到旧版又需要回退到新版时获取最新版commitnum

### git checkout 
`git checkout --[filename]` git add 之后，取消对文件的修改
`git checkout [branch_name]` 切换到某分支
`git checkout -b [branch_name]` 如果没有则新建此分支并切换到

**说明: 任何已经提交过的文件对于 git 来说都是可以恢复的，即便已经删除，除了从没有提交过的文件，对于 git 来说就像从没有存在过**

### git diff 

`git diff` 检查已跟踪文件尚未暂存的文件有哪些改动  
`git diff --cached` 已经写入缓存的改动

### git rm

`git rm file_path` 删除暂存区中的文件，工作区上的也会被删除  
`git rm --cached file_path` 删除暂存区中的文件，工作区上还会保留  
`git rm -r -n --cached file_path` 加上`-n`,列出将会删除的远程文件列表  
`git rm -r --cached file_path` 删除远程仓库文件列表，记得提交commit，然后push到仓库，才会生效

### git config

`git config [--local|--global|--systerm] -l` 查看仓库级别｜全局级别｜系统级别的配置信息  
`git conifg --global user.name username`, `git config --global user.email email`  初次运行时配置，该信息将存在用户主目录下，以后所有的项目提交默认使用此配置信息，如果想针对某个仓库使用其他名字和邮箱，只需要去掉`--global`参数即可


### git branch

`git branch` 查看当前本地仓库所有分支，并且能看出当前处于哪个分支上  
`git branch -a` 查看仓库所有分支，包括远程分支
`git branch -v` 查看本地仓库各个分支最后一个提交对象的信息
`git branch -a -v` 查看仓库所有分支最后一个提交对象的信息
`git branch --merged` 查看哪些分支已被并入当前分支
`git branch --no-merged` 查看尚未合并的分支
`git branch -d [branch name]` 删除某个分支，前提是前面没有 * 号 

### git remote

`git remote` 列出远程仓库的简短名字  
`git remote -v` 列出远程仓库对应的克隆地址  
`git remote add [shortname] [url]` 添加一个远程仓库并起名

### git fetch
`git fetch [远程主机名]` 拉取远程主机所有分支更新到本地
`git fetch [远程主机名]:[分支名]` 拉取远程主机指定某个分支代码到本地，但是不做合并操作  


### git merge

`git merge --abort` 合并导致冲突时，放弃合并并试图回到合并前状态
`git merge` 合并提交，当两个分支都有修改时，只创建一个新的提交，之前的合并记录在合并之后会丢失

### git rebase
`git rebase` 当合并冲突时，

### git push

### git pull

`git pull [远程主机名] ［远程分支名]:[本地分支名]`  拉取远程主机某个分支的更新，再与本地的指定分支合并，当远程分支和当前分支合并时，本地分支名可以省略







