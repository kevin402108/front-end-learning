#### 配置用户信息

- git config --global user.name "kevin-467"
- git config --global user.email "<3077384244@qq.com>"

#### git仓库

- 创建
  1. 本地文件->git仓库：git init
  2. 克隆仓库：git clone

#### Git的三个区域

- 工作区：实际开发时操作的文件夹
- 暂存区：保存之前的准备区域（暂存改动过的文件）
- 版本库：提交并保存暂存区中的内容，产生一个版本快照
- `git add 文件名`: 暂存指定文件
- `git add` . : 暂存所有改动的文件
- `git commit -m` "注释说明"：提交并保存，产生版本快照
- `git ls-files`：查看当前目录下所有文件

### Git文件状态

- 2种状态
  - 未跟踪 U (从未被 Git 管理过)
  - 已跟踪
    - 新添加 A (第一次被 Git 暂存)
    - 已修改 M (工作区内容变化)
    - 未修改  (三个区域统一)
  - 查看暂存区和工作区状态：git status -s

### Git暂存区

- 暂存区覆盖工作区：`git restore 目标文件` (覆盖工作区同名文件)
- 从暂存区移除文件：`git rm --cached 目标文件`
  - 注意：若文件在工作区与暂存区状态不一致，需在末尾加上`-f`强制移除

### Git回退版本

- 查看版本日志：`git reflog --oneline`
- 查看提交历史：`git log --oneline`
- 回退命令
  - 命令
    - `git reset --soft 版本号`（其他文件未跟踪）只覆盖暂存区和工作区的同名文件
    - `git reset --hard 版本号` 彻底回退到指定版本
    - `git reset --mixed 版本号` （与 git reset 等价）覆盖工作区的同名文件，暂存区完全回退到指定版本

### 删除文件

- 步骤
  - 手动删除工作区文件
  - git add . / git rm --cached xxx
  - git commit -m "xxx"

### 合并删除分支

- 合并: git merge 要合并的分支 (先切回主分支！！！)
- 删除：git branch -d 要删除的分支
- 遇到合并冲突，先`解决冲突`，后`手动提交合并记录`

### 远程仓库

- 添加远程仓库：git remote add origin 远程仓库link (origin为远程仓库的别名)
- 删除远程仓库：git remote remove origin
- 查看远程仓库：git remote -v
- 克隆远程仓库：git clone 远程仓库地址
- 拉取远程仓库：git pull 远程仓库地址 远程仓库分支:本地仓库分支（相同可简写）