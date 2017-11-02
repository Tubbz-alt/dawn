window.DOC_DATA={"locales":[{"name":"zh","text":"中文","title":"Dawn","links":[{"text":"首页","url":"//alibaba.github.io/dawn/"},{"text":"GitHub","url":"//github.com/alibaba/dawn"},{"text":"问题反馈","url":"//github.com/alibaba/dawn/issues"}],"groups":[{"name":"guide","text":"使用指南","docs":[{"content":"# 使用入门\r\n\r\n### Dawn 是什么？\r\n\r\nDawn 取「黎明、破晓」之意，原为「阿里云·业务运营团队」内部的前端构建和工程化工具，现已完全开源。它通过 `pipeline` 和 `middleware` 将开发过程抽象为相对固定的阶段和有限的操作，简化并统一了开发人员的日常构建与开发相关的工作。\r\n\r\n\r\n### 有什么特点？\r\n\r\n- 采用中间件技术，封装常用功能，易于扩展，方便重用\r\n- 支持 pipeline 让多个 task 协同完成构建任务\r\n- 简单、一致的命令行接口，易于开发人员使用\r\n- 支持基于「中心服务」管理中间件和工程模板\r\n- 支持搭建私有中心服务，并统一下发构建规则，易于团队统一管理\r\n\r\n\r\n### 安装和更新\r\n\r\n依赖的环境、软件及其版本：\r\n- Node.js v7.6.0 及以上版本\r\n- Mac/Linux (Windows 基本支持未经严格测试)\r\n\r\n安装或更新 Dawn:\r\n\r\n```sh\r\n$ [sudo] npm install dawn -g\r\n```\r\n中国大陆用户可以使用 cnpm 加速安装\r\n\r\n\r\n### 初始化工程\r\n\r\n```sh\r\n$ dn init [template] [options]\r\n```\r\n\r\n示例：\r\n```sh\r\n$ dn init \r\n? Found 4 templates (Use arrow keys)\r\n❯ 1. front      : Blank front end project template\r\n  2. node       : Blank node project template\r\n  3. middleware : Dawn middleware project template\r\n  4. react      : Based on react-scripts, like create-react-app\r\n```\r\n选择一个工程类型，回车即可按向导初始化一个工程，还可以通过 `-t` 或 `--template` 直接按指定的模板名称，直接初始化工程。\r\n\r\n比如，通过名为 `front` 的模板，初始化一个工程\r\n```sh\r\n$ dn init -t front\r\n```\r\n\r\n\r\n### 启动开发服务\r\n\r\n```sh\r\n$ dn dev \r\n```\r\n如果是一个「前端」工程通常会启动构建进程并监听文件的变化，通常，还会启动一个 `Web Server`，并自动打开浏览器。\r\n\r\n\r\n### 执行检查和测试\r\n\r\n```sh\r\n$ dn test\r\n```\r\n在执行 test 的时候会先进行「语法检查」（通过 eslint），然后执行「单元测试」和「E2E 测试」。\r\n\r\n\r\n### 构建工程\r\n\r\n```\r\n$ dn build\r\n```\r\n\r\n执行构建任务，不同的工程类型的构建过程和结果可能不同，取决于初始化工程时使用的工程模板。\r\n完成后，会在当前项目的根目录产生 **build** 目录，这是构建结果，当然，也可以指定为其它目录名称。\r\n\r\n\r\n### 发布工程\r\n\r\n```\r\n$ dn publish\r\n```\r\n\r\n可以通过 `dn publish` 命令发布代码和构建结果，不同的工程模板决定了最终发布位置，是否支持 `publish` 命令取决于选择的「工程模板」。\r\n\r\n\r\n### 执行自定义任务\r\n\r\ninit/dev/build/test/publish 这几个命令可以直接作为「子命令」写在 dn 后边，对于其它名称的 `pipeline` 需要使用 `run` 命令\r\n\r\n编辑 `.dawn/pipe.yml` 或 `.dawn.yml`\r\n\r\n```yaml\r\ndemo:\r\n  - name: shell\r\n    script:\r\n      - echo demo\r\n```\r\n\r\n可以通过如下方法执行 demo\r\n\r\n```sh\r\ndn run demo\r\n```","group":"guide","name":"getting-started","title":"使用入门","index":0},{"content":"# 配置 Pipeline\r\n\r\nDawn 的每个工程中都需要包含对应的 pipeline 配置，在 pipe 配置中定义了「每个命令」对应的任务，配置可以是 `yml/json/js` 格式，但是通常建议用更易于阅读的 `yml` 格式，需要放到「工程根目录」，配置的名称为 `.dawn` 可以是一个目录，也可以是一个文件。\r\n\r\n### 使用单一个配置文件\r\n\r\n在工程根目录新建一个 `.dawn.yml` (也可以是 .dawn.json 或 .dawn.js)，下边是 `yml` 格式的配置\r\n\r\n```yml\r\npipe:\r\n  build:\r\n    - name: lint\r\n    - name: webpack\r\n      output: dist\r\n```\r\n\r\n如上配置，在执行 `dn build` 时，就会先进行语法检查，然后用 webpack 完成项目构建并将构建结果放入 dist 目录。\r\n\r\n### 使用目录作为配置\r\n\r\n在工程根目录新建一个 `.dawn` 的目录，然后在 `.dawn` 目录中新建一个 `pipe.yml` 的文件，如下\r\n\r\n```\r\nbuild:\r\n  - name: lint\r\n  - name: webpack\r\n    output: dist\r\n```\r\n\r\n如上示例，「目录形式」的配置和之前的「文件形式」的配置一样，执行 `dn build` 就可以完成构建\r\n\r\n### Pipe 的执行\r\n\r\n每个 pipe 中可以放任意多个「中间件」，在执行时会创建一个 `context` 实例，然后，依次执行每个中间件，所有中间件都能访问 `context` 实例对象。\r\n\r\n#### 示例\r\n```\r\ndemo:\r\n  - name: shell\r\n    script:\r\n      - echo 1\r\n  - name: shell\r\n    script:\r\n      - echo 2\r\n  - name: shell\r\n    script:\r\n      - echo 3\r\n```\r\n\r\n执行 `dn run demo`，控制台将会执次打印 `1 2 3`，每个中间件的配置选项有两个「保留的名称」\r\n\r\n- name: 用于指定中间件 package 名称，可以是完整的名称 `dn-middleware-xxx` 也可以是省略前缀的 `xxx`\r\n- location: 用于指定中间件入口文件的位置，一般用于本地调试，或内置在模板中不想独立发布的中间件\r\n\r\n不同的中间件通常会有对应的其他配置项，可以参考中间件自身的说明文档。\r\n\r\n#### 注意\r\n> name 还可以包含 `version`，例如 `dn-middleware-xxx@1.0.0`，也可以包含 `scope` 例如 `@scope/dn-middleware-xxx`，或同时包含 `scope` 和 `version`，例如 `@scope/dn-middleware@1.0.0`","group":"guide","name":"pipeline","title":"配置 Pipeline","index":1},{"content":"# 制作一个模板\r\n\r\n通常您应先看看是否已经存在满足您需求的模板，查看「推荐的模板」，可以通过如下命令：\r\n\r\n```sh\r\n$ dn template [keyword]\r\n```\r\n\r\n示例\r\n```sh\r\ndn template \r\n? Found 4 templates (Use arrow keys)\r\n❯ 1. front      : Blank front end project template\r\n  2. node       : Blank node project template\r\n  3. middleware : Dawn middleware project template\r\n  4. react      : Based on react-scripts, like create-react-app\r\n```\r\n\r\n通过「上下方向键」可以选择指定模板，然后「回车」可以查看对应模板的在线使用说明。\r\n\r\n\r\n当您准备开发一个模板时，通常只需要通过已有的工程模板创建一个工程，然后在此基础上，调整 pipeline 配置，或调整目录结构，也可添加其它依赖，并在模板中添加各类文件示例。当然，也可以直接在一个空目录中创建一个全新的模板，每一个工程模板就是一个 npm 包，但是，要求必须命名为 `dn-template-xxx` ，然后，通过 `npm publish` 发布就行了。\r\n\r\n### *.template 文件\r\n\r\n如果一个模板中有 `*.template` 文件，在用此模板创建工程时，会被重命名，去掉 `.template` 后缀，重命名后的文件如有重名会被覆盖，比如，在模板中有两个文件`.dawn.yml` 和 `.dawn.yml.template` ，那么最终用这个模板创建的工程中的  `.dawn.yml` 的内容会和模板中的 `.dawn.yml.template` 一致。\r\n\r\n#### 注意\r\n通常模板中的 `.gitignore` 需要利用这个特性。模板在通过 npm 包发布后会丢失 `.gitignore`，如果希望你的模板创建的工程中有一个默认的 `.gitignore`，那么需要在模板中添加 `.gitignore.template` \r\n\r\n### 提交到推荐列表\r\n如果希望将你的模板添加到「推荐模板列表」，请 fork [https://alibaba.github.io/dawn](https://alibaba.github.io/dawn) 后，编辑 `docs/template.yml`，然后，发起一个 Pull Request 就行了。","group":"guide","name":"template","title":"制作模板","index":2},{"content":"# 开发一个中间件\r\n\r\n\r\n通常，应该先看看是否已经存在满足您需求的中间件，查看「推荐的中间件」，可以通过如下命令：\r\n\r\n```sh\r\n$ dn middleware [keyword]\r\n```\r\n\r\n示例:\r\n```sh\r\n$ dn middleware webpack\r\n? Found 3 templates (Use arrow keys)\r\n❯ 1. webpack        : 基于 Webpack 的构建中间件（无缝升级）\r\n  2. webpack2       : 基于 Webpack2 的构建中间件\r\n  3. webpack1       : 基于 Webpack1 的构建中间件\r\n```\r\n\r\n通过「上下方向键」可以选择指定中间件，然后「回车」可以查看对应中间件的在线使用说明。\r\n\r\n当您决定要开发一个新的中间件时，您可以通过 dn init 命令，然后选择「中间件工程模板」即可快速创建一个「中间件」，如下：\r\n\r\n```sh\r\n$ dn init\r\n? Found 3 templates (Use arrow keys)\r\n  1. front      : Front Project Template\r\n  2. node       : Node.js Project Template\r\n❯ 3. middleware : Middleware Project Template\r\n```\r\n\r\nDawn 的中间件和 Koa 中间件类似，中间件核心基础代码结构如下：\r\n\r\n```js\r\n/**\r\n * 这是一个标准的中间件工程模板\r\n * @param {object} opts cli 传递过来的参数对象 (在 pipe 中的配置)\r\n * @return {AsyncFunction} 中间件函数\r\n */\r\nmodule.exports = function (opts) {\r\n\r\n  //外层函数的用于接收「参数对象」\r\n  //必须返回一个中间件处理函数\r\n  return async function (next) {\r\n\r\n    //在这里处理你的逻辑\r\n    this.console.log('This is an example');\r\n\r\n    //next 触发后续执行\r\n    //如果需要在后续中间件执行完成再做一些处理\r\n    //还可以 await next(); 并在之后添加逻辑\r\n    next();\r\n\r\n  };\r\n\r\n};\r\n```\r\n\r\n中间件是一个标准的 npm 包，但是要求必须命名为 `dn-middleware-xxx` 这样的格式，开发完成后直接通过 `npm publish` 发布就行了。\r\n\r\n### 提交到推荐列表\r\n如果希望将你的中间件添加到「推荐中间件列表」，请 fork [https://alibaba.github.io/dawn](https://alibaba.github.io/dawn) 后，编辑 `docs/middleware.yml`，然后，发起一个 Pull Request 就行了。","group":"guide","name":"middleware","title":"开发中间件","index":3}]},{"name":"service","text":"中心服务","docs":[{"content":"# 用户配置\r\n\r\nDawn 目前主要有三个配置项：\r\n\r\n- `server` : 要连接的中心服务，默认连接公共服务，也可以连接「私有中心服务」\r\n- `registry` : npm 源，默认连接 npm 官方源\r\n- `cacheTTL` : 缓存时长，设定远程配置的最大缓存时长\r\n\r\n### 通过命令更改配置\r\n\r\n```sh\r\n$ dn config [name] [value]\r\n```\r\n\r\n当省略 `name` 时会让用户先选择配置项的「名称」，然后，再让用户选择或输入「值」。当省略 `value` 时，会让用户在「默认值、历史、输入值」中选择。\r\n\r\n#### 示例一：\r\n\r\n```sh\r\n$ dn config server http://your_server_url\r\n```\r\n\r\n上边的示例，将会新「中心服务」更改为 `your_server_url`\r\n\r\n#### 示例二：\r\n\r\n```\r\n$ dn config server\r\n```\r\n将会有如下提示\r\n\r\n```sh\r\n? Please enter or select configuration value (Use arrow keys)\r\n❯ Enter a new configuration value\r\n  default : http://default_url/${name}.yml\r\n```\r\n\r\n会提示用户输入一个新的 URL 或选择默认的 URL，当选择输入或输入空时，将会使用默认 server 配置\r\n\r\n### 通过 .dawnrc 更改配置\r\n\r\n除了命令方式也可以手动编辑 `~/.dawnrc` 文件更改配置\r\n\r\n#### 示例\r\n```sh\r\n$ vim ~/.dawnrc\r\n``` \r\n\r\n.dawnrc 格式如下\r\n\r\n```yml\r\nserver: your_server_url\r\nregistry: your_registry_url\r\ncacheTTL: your_ttl\r\n```","group":"service","name":"client","title":"用户配置"},{"content":"# 团队配置\r\n\r\n如果你在一个团队，并希望团队成员使用 dawn 时能有一些公共配置，或下发一些统一的构建规则，那么可以搭建一个「私有的中心服务」\r\n\r\nDawn 的私有服务端搭建成本「极低」，不需要部署任何服务端程序，只需要有一个支持静态文件的 Web Server 即可，如果没有，在 GitHub 或 GitLab 上，新建一个 repo 也行，任意只要能托管静态文件的服务器都可以，当然你也可用基于动态服务搭建 dawn 中心服务\r\n\r\n假如，你现在有一个 Web Server，并且可以过 `http://your_server_url/<name>.yml` 访问，比如 \r\n\r\n- 推荐的模板列表： http://your_server_url/template.yml\r\n- 推荐的中间件列表： http://your_server_url/middleware.yml\r\n- 中心 Pipe 配置： http://your_server_url/pipe.yml\r\n- 中心 RC 配置： http://your_server_url/rc.yml\r\n\r\n### template.yml\r\n\r\n`template.yml` 用于管理中心服务上的所有「推荐的模板列表」，用户在执行 `dn init` 或 `dn template` 时列出的模板列表，就是在 `template.yml` 配置的列表，格式如下\r\n\r\n```yml\r\nfront: \r\n  location: 'dn-template-front'\r\n  summary: 'Front Project Template'\r\n\r\nnode: \r\n  location: 'dn-template-node'\r\n  summary: 'Node.js Project Template'\r\n  \r\nmiddleware: \r\n  location: 'dn-template-middleware'\r\n  summary: 'Middleware Project Template'\r\n```\r\n\r\n顶层的 `key` 是模板列表中的名称，在列表中唯一即可，比如上边的 `front`、`node`，通过 `location` 指定模板对应的 `npm package` 包名\r\n\r\n`location` 还可以指定 `scope` 或 `version`，示例\r\n\r\n```yml\r\nfront: \r\n  location: '@scope/dn-template-front'\r\n  summary: 'Front Project Template'\r\n\r\nnode: \r\n  location: 'dn-template-node@1.0.0'\r\n  summary: 'Node.js Project Template'\r\n\r\nmiddleware: \r\n  location: '@scope/dn-template-middleware@1.0.0'\r\n  summary: 'Middleware Project Template'\r\n```\r\n\r\nDawn 在连接对应的 `server` 后，便可以通过 `dn template [keyword]` 查询对应的模板\r\n\r\n**注意**\r\n所有不在中心服务 `template` 列表中的模板，也是可直接用于初始化工程的，需要用 `-t` 或 `--template` 参数指定「模板的包名称」，如下\r\n\r\n```sh\r\n$ dn init -t <package_name>\r\n``` \r\n\r\n`package_name` 可以是完整的包名称，也可以不带默认前缀。\r\n\r\n### middleware.yml\r\n\r\nmiddleware.yml 用于管理「推荐的中间件列表」，格式如下\r\n\r\n```yml\r\nshell: \r\n  location: '@ali/dn-middleware-shell'\r\n  summary: 可执行 shell 的中间件\r\n```\r\n\r\n配置格式及各字段和 `template` 一致，添加到 `middleware.yml` 中的「中间件」，在 dawn 连接到对应的 `server` 后，在配置 `pipe` 时，除了可以用完整的包名、不带前缀的包名，也可用在「中间件列表」中指定的名称，如上边示例中的 `shell`。\r\n\r\nDawn 在连接对应的 `server` 后，可以通过 `dn middleware [keyword]` 查询对应的模板\r\n\r\n\r\n### pipe.yml\r\n\r\npipe 是团队统一的构建配置的核心，Dawn 在连接某一个 `server` 后，在执行对应的命令时，会先合并「远程统一的 pipe 配置」，然后，再执行对应的的 `pipeline`，格式如下：\r\n\r\n```yml\r\n# 前置规则，会合并到工程本地配置的前边\r\nbefore:\r\n  test:\r\n    - name: lint\r\n\r\n# 后置规则，会合并到工程本地配置的后边\r\nafter:\r\n  test:\r\n    - name: shell\r\n      script:\r\n        - echo done\r\n```\r\n如上，中心 `pipe` 分为 `before` 和 `after` 两大部分，每部分和本地 `pipe` 格式一致，上边的示例，将强制让所有工程，在执行 `dn test` 时都会先进行 `lint` 检查语法。\r\n\r\n注意：如果本地配置中已有 `lint` 配置，不会重复执行。\r\n\r\n### rc.yml\r\n\r\n我们知道，本地 `.dawnrc` 中支持三项配置 `server`、`registry`、`cacheTTL`，但是中心服务的 `rc.yml` 只支持 `registry` 一项配置，并且是在本地 `.dawnrc` 没有指定任何值时才会有效，也就是说本地配置高于远程配置，主要用于在切换 `server` 时，也能一并把 `registry` 也进行切换。","group":"service","name":"server","title":"团队配置"}]},{"name":"middleware","text":"常用中间件","docs":[{"content":"## Webpack 中间件\r\n\r\n这是一个基于 `webpack3` 的构建中间件，默认能处理「js/jsx/ts/less/css/image/font」等文件\r\n\r\n## 特点\r\n- 支持多页面，可通过 glob 语法，指定多入口，可共用页面模板，也可根据名称匹配\r\n- 支持排除库文件，比如 React/Vue\r\n- 支持抽取当前项目中的公共模块或资源，生成 common 文件\r\n- 支持自定义 `webpack` 配置，还可通过 `config` 选项指定配置文件路径\r\n\r\n以上都可以在 `pipe.yml` 中配置完成，用于不同的工程或模板时作者可根据情况有不同配置。\r\n\r\n## 示例\r\n```yml\r\ndev:\r\n  - name: webpack\r\n    watch: true                     # 是否开启 watch，开启后，文件发生变化时将会实时增量编译\r\n    entry: ./src/*.js               # 将 src 下所有 .js 文件作为入口（不包括子目录中的 js,）\r\n    template: ./src/assets/*.html   # 将 assest 下的所有 html 作为页面模板 \r\n\r\nbuild:\r\n  - name: webpack\r\n    entry: ./src/*.js               # 将 src 下所有 .js 文件作为入口（不包括子目录中的 js,）\r\n    template: ./src/assets/*.html   # 将 assest 下的所有 html 作为页面模板 \r\n    externals:                      # 声明排除的库文件，将不会打入 chunks 中\r\n      jquery: jQuery \r\n    common:\r\n      disabled: true                # 是否禁用抽取公共部分\r\n      name: 'common'                # 生成的公共资源名称\r\n    cssModules: true                # 是否启用 css modules 方案\r\n    output: build                   # 构建结果目录，默认为 build\r\n    folders:                        # 指定资源子目录名称\r\n      js: js\r\n      css: css\r\n      font: font\r\n      img: img\r\n``` \r\n\r\n注意：\r\n- `entry` 和 `template` 的值都可以是一个数组，当 `template` 只有一个文件时将作为公共模板，所有 chunk 共用\r\n- `entry` 的默认值为 `./src/\\*.js`，tempalte 的默认值为 `./src/assets/\\*.html`\r\n- `entry` 和 `template` 还可以用 `map` 形式配置\r\n\r\n## 合并自定义 webpack 配置\r\n `webpack` 中间件，允行开发者自定义「构建配置」，开发者只需要在当前工程根目录添加 `webpack.config.js` 文件即可，示例：\r\n \r\n ```js\r\n module.exports = function(configs,webpack,ctx){\r\n   //configs 为默认配置，可以在这里对其进行修改\r\n   //webpack 当前 webpack 实例\r\n   //ctx 当前构建「上下文实例」\r\n   configs.module.loaders.push(<your_loader>);\r\n };\r\n ```\r\n\r\n 另外，开发者还可以通过 `config` 自定义「配置文件路径」，如下：\r\n\r\n ```yml\r\n dev:\r\n  - name: webpack\r\n    watch: true\r\n    configFile: ./wp.conf.js\r\n ```\r\n\r\n 如上边示例，在 dev 时 webpack 中间件将会加载名为 `wp.conf.js` 的构建配置\r\n\r\n ## 完全自定义 webpack 配置\r\n\r\n 除了合并部分自定义的配置，还可以完全使用自定义的 webpack 配置，如下\r\n\r\n ```js\r\n module.exports = {\r\n   ...\r\n   <your_config>\r\n   ...\r\n };\r\n ```\r\n\r\n 当然，如果目前的 `webpack` 中间件，不能满足需求时，可以通过 issue 或 pr 参与改进 webpack 中间件，甚至重新写一个新的中间件。","group":"middleware","name":"webpack","title":"Webpack","index":1},{"content":"## Server 中间件\r\n\r\n示例：\r\n\r\n```yml\r\ndev:\r\n  - name: server\r\n    port: 8001       \r\n    public: ./build\r\n    autoOpen: true\r\n```\r\n\r\n其中，`port`、`public`、`autoOpen` 都是可选参数，如下\r\n\r\n* port: 开发服务器要使用的端口\r\n* public: 指定静态文件目录\r\n* autoOpen: 是否自动打开浏览器窗口","group":"middleware","name":"dev-server","title":"Dev Server","index":2},{"content":"## 单元测试中间件\r\n\r\n示例：\r\n\r\n```yml\r\ntest:\r\n  - name: lint\r\n  - name: unit\r\n```\r\n\r\n默认测试代码目录为 ./test/unit，如需要自定义，参考下边的示例\r\n\r\n```yml\r\ntest:\r\n  - name: lint\r\n  - name: unit\r\n    files: ./**/*.test.js\r\n```\r\n\r\n一般情况，不建议自定义测试代码目录","group":"middleware","name":"unit","title":"单元测试","index":2},{"content":"## 清理中间件\r\n\r\n一般用于清理构建结果目录\r\n\r\n示例\r\n```yml\r\nbuild:\r\n  - name: clean\r\n    target: ./build/**/*.*    # 指定清理的目录或文件，默认为 build 目录\r\n  - name: webpack2\r\n```","group":"middleware","name":"clean","title":"目录清理"},{"content":"## 文件复制中间件\r\n在不需要编译，而仅需要将文件按规则从一个地方复制到别一个地方时，可使用 copy 中间件\r\n\r\n### 示例\r\n\r\n如下示例，将所有 md 文件复制到 build 目录，并通过使用 (1) 保留上一级目录结构\r\n\r\n```yml\r\nbuild\r\n  - name: copy\r\n    files:\r\n      ./build/(1)/(0).md: ./**/*.md\r\n```\r\n\r\n`files` 配置节的 `value` 为源文件匹配表达式，`key` 为目标文件生成表达式，`(n)` 为路径中某级的名称，`0` 为当前文件名称，「从右向左」依次为各级目录名称。","group":"middleware","name":"copy","title":"文件拷贝"},{"content":"## Faked 中间件\r\n\r\nFaked 用一个用于 `mock` 后端 `API` 的中间件\r\n\r\n### 特点\r\n- 支持 mock 静态数据或逻辑\r\n- 支持 mock `fetch/jsonp/ajax`\r\n- 支持 RESTful api \r\n- 同时支特手写 `mock` 代码或通过 GUI 配置\r\n- 不依赖 `WebServer` 降低单测的成本\r\n\r\n### 使用\r\n\r\n```sh\r\ndev:\r\n  - name: faked\r\n    port: 6002\r\n  - name: webpack2\r\n```\r\n\r\n放到 `webpack` 中间件前即可，`port` 选项可指定 `GUI` 端口，省略将自动选取可用端口","group":"middleware","name":"faked","title":"数据模拟"},{"content":"## lint 中间件\r\n\r\n### 简介\r\n基于 eslint 的语法检查中间件\r\n\r\n### 用法\r\n\r\n默认配置\r\n```yml\r\ntest:\r\n  - name: lint\r\n```\r\n\r\n默认会检查 `./lib`、`./src`、`./app` 三个目录\r\n\r\n自定义检查目录\r\n```yml\r\ntest:\r\n  - name: lint\r\n    source: ./xxx ./yyy         # 空格隔开多个目录\r\n```\r\n\r\n其它选项\r\n```yml\r\ntest:\r\n  - name: lint\r\n    disabled: true              # 禁用，一般不要用这个选项，只有在旧工程中临时禁用\r\n    global: $,jQuery:true       # 声明全局变量\r\n    ignore: './src/**/*.jsx'    # 不检查 jsx 文件\r\n    ext: .js,.jsx               # 检查的扩展名，默认为 .js,.jsx\r\n    env: browser,node           # 环境，默认为 browser,node\r\n```","group":"middleware","name":"lint","title":"静态检查"},{"content":"## shell 中间件\r\n\r\n这是一个执行 shell 的中间件，只有一个 `script` 选项，示例\r\n\r\n```yml\r\ndev:\r\n  - name: shell\r\n    script:\r\n      - echo 你好\r\n      - echo Hello\r\n```\r\n\r\n在 `script` 选项中可以写多行 `shell/bat` 脚本代码，将会依次执行。\r\n\r\n提示：执行 shell 时的当前工作目录就是「项目根目录」","group":"middleware","name":"shell","title":"执行脚本"}]},{"name":"template","text":"常用模板","docs":[{"content":"## dn-template-front\r\n\r\n这是一个基础的前端工程模板，没有集成任何框架，但相关配置是完整的，默认已经支持：\r\n\r\n- 新语法，已针对 es6/7 几乎所有新语法做自动转译。\r\n- 单元测试，已启用 unit 中间件\r\n\r\n通过 `front` 模板初始化一下工程\r\n\r\n```sh\r\n$ dn init -t front\r\n```\r\n\r\n如果你的 dn 连接的是默认服务，也可以从模板列表中选择\r\n\r\n```sh\r\n$ dn init\r\n```\r\n\r\n可以在类似如下的菜单中选择 `front` 模板\r\n```sh\r\n? Found 3 templates (Use arrow keys)\r\n❯ 1. front      : Blank front end project template\r\n  2. node       : Blank node project template\r\n  3. middleware : Dawn middleware project template\r\n```\r\n\r\n工程初始化完成后，就可以使用 `dn` 相关命令进行开发构建了。\r\n\r\n你还可以在此工程的基础上集成相关框架、比如 react/vue 等，并发布为新的模板。","group":"template","name":"front","title":"普通前端工程"},{"content":"## dn-template-middleware\r\n\r\n中间件模板，用于快速的创建一个 Dawn 中间件工程，和普通的 node 工程模板相比，该模板已包括一个极简的中间件示例。\r\n\r\n\r\n创建一个中间件\r\n\r\n```sh\r\n$ dn init -t middleware\r\n```\r\n\r\n如果你的 dn 连接的是默认服务，也可以从模板列表中选择\r\n\r\n```sh\r\n$ dn init\r\n```\r\n\r\n可在以类似如下的菜单中选择 `middleware` 模板\r\n```sh\r\n? Found 3 templates (Use arrow keys)\r\n  1. front      : Blank front end project template\r\n  2. node       : Blank node project template\r\n❯ 3. middleware : Dawn middleware project template\r\n```\r\n\r\n工程初始化完成后，就可以使用 `dn` 相关命令进行开发构建了。","group":"template","name":"middleware","title":"中间件工程"},{"content":"## dn-template-node\r\n\r\n普通 Node 工程模板\r\n\r\n创建一个中间件\r\n\r\n```sh\r\n$ dn init -t node\r\n```\r\n\r\n如果你的 dn 连接的是默认服务，也可以从模板列表中选择\r\n\r\n```sh\r\n$ dn init\r\n```\r\n\r\n可在以类似如下的菜单中选择 `node` 模板\r\n```sh\r\n? Found 3 templates (Use arrow keys)\r\n  1. front      : Blank front end project template\r\n❯ 2. node       : Blank node project template\r\n  3. middleware : Dawn middleware project template\r\n```\r\n\r\n工程初始化完成后，就可以使用 `dn` 相关命令进行开发构建了。","group":"template","name":"node","title":"Node 工程"}]}]}]};