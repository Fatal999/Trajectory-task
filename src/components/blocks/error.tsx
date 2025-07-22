/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const errorStyle = css`
  font-family: 'Delius', 'Arial', 'Helvetica', sans-serif;
  font-weight: 400;
  font-size: 32px;
  line-height: 26px;
  color: red;
  margin: 50px;
`

export default function Error() {
  return (
    <span css={errorStyle}>Error loading data, please reload the page!</span>
  )
}
