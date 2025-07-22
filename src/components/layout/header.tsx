/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const headerStyle = css`
  display: flex;
  margin: 25px;
`

const headerTitle = css`
  font-size: 48px;
  line-height: 30px;
  margin-left: 50px;
`

export default function Header() {
  return (
    <header css={headerStyle}>
      <h1 css={headerTitle}>Table with cars</h1>
    </header>
  )
}
