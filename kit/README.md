开发：

```bash
npm run build:dll #第一次npm run dev时需运行此命令，使开发时编译更快
npm run start:dev #连的是测试环境
npm run start:prod #连的是生产环境
打开 http://localhost:8000
```

构建：
[详情](https://github.com/zuiidea/antd-admin/issues/269)

```bash
npm run build:prod

生产环境打包将会打包至dist/{version}目录 #package.json里version字段

npm run build:dev

测试环境打包将会打包至devDist/{version增加1}目录 #package.json里version字段
```

代码检测：

```bash
npm run lint
```

测试