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
    margin: 0;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 1366px;
    background-color: #001733;
    background-image: url('../src/assets/background-img.webp');
    background-repeat: no-repeat;
    background-position: 800px 150px;
  }
`
