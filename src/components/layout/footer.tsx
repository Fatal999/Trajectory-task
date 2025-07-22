/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const footerStyle = css`
  display: flex;
  margin: 25px;
`

const copyRightStyle = css`
  font-size: 20px;
  line-height: 26px;
`

export default function Footer() {
  return (
    <footer css={footerStyle}>
      <span css={copyRightStyle}>© Created by Fatal999, 2025</span>
    </footer>
  )
}
