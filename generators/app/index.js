// ～/generators/app/index.js

// 此文件作为 Generator 的核心入口
// 需要导出一个继承自 Yeoman Generator 的类型
// Yeoman Generator 在工作时会自动调用我们在此类型中定义的一些生命周期方法
// 我们在这些方法中可以通过调用父类提供的一些工具方法实现一些功能，例如文件写入

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  
  // yo 会自动调用该方法
  // 依据模板进行新项目结构的写操作

  prompting() {
    // Have Yeoman greet the user.

    const prompts = [
      {
        type: "input",
        name: "fullName",
        message: "Please input project name:",
        default: "react"
      },
      {
        type: "input",
        name: "description",
        message: "Please input project description:",
        default: "a react project"
      },
      {
        type: "input",
        name: "author",
        message: "Author's Name",
        default: ""
      },
      {
        type: "input",
        name: "email",
        message: "Author's Email",
        default: ""
      },
      {
        type: "input",
        name: "license",
        message: "License",
        default: ""
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing () {
    // 一些无需配置的文件
    this.__writingCopy([
      // "mock",
      "public",
      "src",
      ".editorconfig",
      ".gitignore",
      ".prettierignore",
      ".prettierrc",
      ".umirc.dev.js",
      ".umirc.pre.js",
      ".umirc.prod.js",
      ".umirc.testenv.js",
      ".umirc.ts",
      "package.json",
      "README.md",
      "tailwind.config.js",
      "tsconfig.json",
      "typings.d.ts",
      "yarn.lock"
    ], {
      name: this.props.name,
      fullName: this.props.fullName,
      description: this.props.description,
      author: this.props.author,
      email: this.props.email,
      license: this.props.license
    });
  }
  // 文件copy工具函数
  __writingCopy(filePath, params) {
    filePath.forEach(item => {
      this.fs.copyTpl(
        this.templatePath(item),
        this.destinationPath(item),
        params
      );
    });
  }
};