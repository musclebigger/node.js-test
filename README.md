# node.js-test
For node.js &amp; Express.js postman study
npm 管理：使用terminal 初始化npm 命令：npm init
初始化的意义在于将下载的包管理在json文件中，从而不用每个项目中的人都要下载这个npm package 而是通过json去npm调用就可以。并且要在.gitignore文件中忽略掉node_modeles的模块，因为它很大有可能。Express.js 是node的一个包

npm管理semantic version命名要求：major.minor.patch (patch 修改小bug的更改版本号区域，minor功能添加更改版本号区域并清零patch，major是大变更break change，全部清零)，其中^ 代表固定当前版本号，都可以lock但是packag-lock存在，那么^会被无视，优先级地域package-lock，~代表固定major和minor获取patch版本

命令行操作用@选取版本号

npm nodemon包：可以监听server，当server更新时，关闭当前sever，放在devDependancies里（通过在命令行里npm i nodemon -D）,储存不属于部署部分的工具类
在package.json中可以设置快捷键自动执行，在script中设置，在terminal中执行