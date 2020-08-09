#! /usr/bin/env node
const program = require('commander')
const shell = require('shelljs')
const download = require('git-clone')

// 定义版本
program.version('1.0.0')

// 定义命令
program
  .command('new <name>')
  .description('创建项目')
  .action(name => {
    const gitUrl = 'https://github.com/vuejs/vue-next-webpack-preview.git'
    download(gitUrl, `./${name}`, () => {
      // 删除 .git 隐藏文件
      shell.rm('-rf', `${name}/.git`)
      shell.cd(name)
      shell.exec('npm install')
      // 成功后的提示
      console.log(`
                创建项目：${name} 成功
                pro-init-cli run  启动项目
            `)
    })
  })

program
  .command('run')
  .description('运行项目')
  .action(() => {
    // 使用 shell 完成
    shell.exec('npm run dev')
    console.log(`
        项目启动成功
    `)
})

// 解析命令行参数
program.parse(process.argv)
