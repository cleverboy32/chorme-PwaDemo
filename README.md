### chorme-PwaDemo
#### study pwa

vue 和 渐进式应用合并。 发现 webpack 工具和 渐进式应用 配合并不怎么理想。 现在打算搭建一个demo, 实现 webpack 和 sw 的配合。

具体步骤如下：

#### 一 用 v-cli 搭建一个 vue 项目

    vue, 想必你应该很熟悉了吧，关于项目的编写，这里就不在多说了。
    
#### 二 编写 pwa 所需的的注册相关文件
    
 - app.js （注册 service-worker 的文件）
     
 - service-worker.js (sw 所需处理的事务, 如缓存等）
     
 - manifest.json (应用桌面清单的设置）
     
 - imgs (应用清单所需的图标icon)
   

#### 三 配置，文件打包输出到相应位置。
    
    多个入口 , 把编写的app.js文件打包，注入到生成的html中
```
    entry: {
        app: './src/main.js',
        registerSw: './scripts/app.js'
    },
```
```
    // 复制 pwa 所需的文件到 输出的地方
    new CopyWebpackPlugin([
        {
            from: 'imgs',
            to: 'img'
        },
        {
            from: 'manifest.json',
            to: 'manifest.json'
        }
    ])
```
    因为环境的不同，我们请求的路径也不同， sw中缓存静态资源的名字也会不同，所以我编写了两份 service-worker.js 文件，根据环境的不同， 复制不同的 service-worker.js (sw 所需处理的事务, 如缓存等）到输出目录下
    
    开发环境中， webpack.dev.conf.js 配置
```
    new CopyWebpackPlugin([ 
        {
            from: 'service-worker.js',
            to: 'sw.js'
        }
    ])
```
    生产环境中， webpack.prod.conf.js 的配置
```
    new CopyWebpackPlugin([ 
        {
            from: 'prod-service-worker.js',
            to: 'sw.js'
        }
    ])
```
    
    然后 npm run dev 成功启动
  
    npm run build  打包文件成功，放上自己的服务器， 进行访问。 这里打包的文件可以查看我的 gh-pages 分支下的目录。 因为没有服务器，所以我把文件放在 git 上的，这样通过 git 可以访问。 
    
    觉得有用的话，点个赞吧亲
