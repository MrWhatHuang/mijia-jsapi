# 示例页面

在 `example/` 下有一个简单的开发页面，用于在浏览器中快速测试 `src` 中的导出。

运行开发服务器（使用 pnpm）：

```bash
pnpm run dev
```

打开浏览器访问 http://localhost:5173/example/index.html （默认端口 5173，Vite 启动后终端会打印实际端口）。

页面会展示 `config` 对象和 `MijiaJSAPI` 类名，并在控制台暴露 `window.mijiaExample` 以便调试。
