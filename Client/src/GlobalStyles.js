import { createGlobalStyle } from "styled-components";

export const themeVars = {
  paradisePink: "#E34665",
  spaceCadet: "#2D3142",
  silver: "#bfc0c0",
  white: "#FFFFFF",
  blueCrayola: "#3777ff",
};

export default createGlobalStyle`
:root {
    --paradise-pink: #E34665;
    --space-cadet: #2D3142;
    --silver: #bfc0c0;
    --white: #FFFFFF;
    --blue-crayola: #3777ff;
    --font-existence: 'Atkinson Hyperlegible', sans-seriff;
   
  body{
      background-color: #FFFFFF;
        }
}
html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 101%;
        vertical-align: baseline;
        box-sizing: border-box;
        background:transparent;
        font-family: var(--font-existence);
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
  
table, th, td{
    border: 0.5px solid black;
   
}
table{
    border-collapse:collapse;
    width:85%;
}
td{
    height: 25px;
    text-align:center;
    vertical-align: center;
}
th{
    height:50px;
}

`;
