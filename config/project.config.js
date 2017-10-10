module.exports = {
    // projectTemplate: 'souche:souche-vue/project-template#2.0',
    noEscape: true,
    name: 'vue-pwa',
    description: 'A Vue.js project',
    author: '吴昀珠 <wyz>',
    // singlePage: false,
    /*
     * 多页面的应用，要在 multiPageNames 里配置每个页面的名称, eg:
     *
     *    multiPageNames: [ 'list', 'detail' ]
     *
     * 然后需要在 src/pages 目录下创建同名文件
     */
    // multiPageNames: ['partner-pc', 'partner-h5'],
    build: 'standalone',
    unit: true,
    e2e: false,
    hash: false,
    port: 8090
};