import React from 'react'
import styled from 'styled-components'

export const Button = styled.a`
  display:inline-block;
  background-color: blue;
  color: #fff;
  border: none;
  border-radius: 1rem;
  padding:1rem;
  margin: 0 1rem;
  opacity:0.8;
  text-decoration: none;
  &:hover {
    opacity:1
  }
`
Button.defaultProps = {
  href: '#'
}

export default Button
