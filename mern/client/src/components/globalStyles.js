import { createGlobalStyle} from 'styled-components';
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }
  .card,.company-info-item,.job-info,footer{
    background: ${({ theme }) => theme.cardBackground};
  }
  .title{
    color: ${({ theme }) => theme.titleColor};
  }
  .sa-item,input{
    background-color: ${({ theme }) => theme.searchColor};
  }
  .site-button{
    background-color: ${({ theme }) => theme.siteButtonColor};
    color:  ${({theme}) => theme.textColor};
  }
  .site-button:hover{
    background-color: ${({ theme }) => theme.siteButtonHoverColor};
  }
  .contain{
      background-color: ${({theme}) => theme.contain}
  }
  .App-header{
      background: ${({theme}) => theme.bgBackground}
  }
  `