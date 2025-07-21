/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const headerStyle = css`
  background-color: red;
`

export default function Header() {
  return (
    <header css={headerStyle}>
      <h1>Car List</h1>
    </header>
  )
}
