import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Major Mono Display', monospace;
    font-size:44px;
  }

  input[type="text"] {
      font-family: 'Major Mono Display', monospace;
      font-size:24px;
  }
  button {
      font-family: 'Major Mono Display', monospace;
      font-size:24px;
  }

  button.save:hover {
    background-color: #228b22; /* green */
    color: white;
    border: 1px solid #4CAF50;
  }
  button.unsave:hover {
    background-color: #cb4154; /* red */
    color: white;
    border: 1px solid #cb4154;
  }

  button.search:hover {
    background-color: #b666d2; /* lilac */
    color: white;
    border: 1px solid #4CAF50;
  }

  .card {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 5px;
    margin: 15px;
    padding: 15px;
    max-width: 90%;
  }

  .gif-entry.card:hover {
    background-image: linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);
  }

  h3 {
    margin: 15px 0px;
  }

  body.fontLoaded {
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  input {
    border: 1px solid #222222;
    padding: 2px;
    margin: 5px 0px;
  }

  .gif-entry {
    display: inline-block;
    margin: 5px;
    padding: 5px;
    border: 1px solid #222222;
    font-size:14px;

  }

  button {
    border: 1px solid #222222;
    padding: 2px;
    margin: 5px;
  }

  p,
  label {
    line-height: 1.5em;
  }
`;

export default GlobalStyle;
