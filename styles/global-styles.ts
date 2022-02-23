import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
    
    ${normalize}

    a {
        text-decoration:none;
        color:inherit;
    }

    * {
        box-sizing:border-box;
    }

    body {
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 14px;
        margin: 0; 
        padding: 0;
        overflow: hidden; 
    }
	@font-face {
        font-family: 'Roboto-Regular';
        src: url('./fonts/Roboto-Regular.woff2') format('woff2'),
             url('./fonts/Roboto-Regular.woff') format('woff'),
             url('./fonts/Roboto-Regular.otf') format('truetype');
    }
    @font-face {
        font-family: 'Roboto-Bold';
         src: url('./fonts/Roboto-Bold.woff2') format('woff2'),
              url('./fonts/Roboto-Bold.woff') format('woff'),
              url('./fonts/Roboto-Bold.otf') format('truetype');
     }
     ul,li{
        list-style:none;
        margin:0;
        padding:0;
    }
`;

export default GlobalStyle;
