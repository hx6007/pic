import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: Microsoft YaHei,tahoma,arial,Hiragino Sans GB,'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: Microsoft YaHei,tahoma,arial,Hiragino Sans GB,'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Microsoft YaHei,tahoma,arial,Hiragino Sans GB,Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
`;
