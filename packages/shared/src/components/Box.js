import React from 'react'
import styled from 'styled-components'
import { fragments } from 'api/lib'

console.log('from shared/Box', fragments)

export const Box = styled.div`
  background: pink;
  color:#fff;
  padding: 2rem;
  margin:1rem;
`

export default Box
