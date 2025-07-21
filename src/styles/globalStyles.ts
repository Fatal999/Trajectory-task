import { css } from '@emotion/react'
import DeliusWoff2 from '../fonts/Delius-Regular.woff2'

export const globalStyles = css`
  @font-face {
    font-family: 'Delius';
    src: url(${DeliusWoff2}) format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  body {
    font-family: 'Delius', 'Arial', 'Helvetica', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    margin: 0 auto;
    background-color: white;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 1366px;
  }
`
