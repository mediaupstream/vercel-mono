import React from 'react'
import styled from 'styled-components'
import { fragments } from 'api/lib'

console.log('from shared/Box', fragments)

export const Box = styled.div`
  background: rgb(238,174,202);
  background: radial-gradient(circle, rgba(238,174,202,0.4) 0%, rgba(148,187,233,0.4) 100%);
  color:#333;
  border-radius: 0.5rem;
  padding: 2rem;
  margin:1rem;
  opacity:0.9;
  transition: opacity 0.3s linear;
  border: 3px solid cyan;

  &:hover {
    opacity:1;
  }
`

export default Box
