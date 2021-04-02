import React from 'react'
import styled from 'styled-components'
import { fragments } from 'api/lib'

console.log('from shared/Box', fragments)

export const Box = styled.div`
  font-size:1.4rem;
  background: rgb(238,174,202);
  background: radial-gradient(circle, rgba(138,174,202,0.4) 0%, rgba(248,187,233,0.4) 100%);
  color:#333;
  border-radius: 0.5rem;
  padding: 2rem;
  margin:1rem;
  opacity:0.9;
  transition: opacity 0.3s linear;
  &:hover {
    opacity:1;
  }
`

export default Box
