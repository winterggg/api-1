import { createGlobalStyle } from 'styled-components'
import normalize from '/node_modules/normalize.css/normalize.css?inline'
// todo: 这里需要重新考虑
// todo: https://vitejs.dev/guide/features.html#css-modules
// 当你导入一个CSS文件时，它的内容会通过一个<style>标签被插入到页面中。但是，如果你
// 使用了?inline查询参数来导入CSS文件，那么它的内容不会被插入到页面中。相反，处理后的
// CSS字符串会作为模块的默认导出返回。

export const GlobalStyle = createGlobalStyle`
${normalize}

*, *:before, *:after {
  box-sizing: border-box;
}

body,
html {
  height: 100%;
  margin: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  background-color: #fff;
  line-height: 1.4;
}

a:link,
a:visited {
  color: #0077cc;
}

a:hover,
a:focus {
  color: #004499;
}

code,
pre {
  max-width: 100%;
  overflow: auto;
  margin: 0 auto;
}
`


