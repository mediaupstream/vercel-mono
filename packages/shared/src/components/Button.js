import React from 'react'
import styled from 'styled-components'

export const Button = styled.a`
  font-size:1.4rem;
  display:inline-block;
  background: rgb(217,164,247);
  background: linear-gradient(0deg, rgba(117,164,247,0.5) 0%, rgba(131,232,234,0.5) 100%);
  color: #333;
  border: none;
  border-radius: 0.5rem;
  padding:1rem;
  margin: 0 1rem;
  opacity:0.9;
  text-decoration: none;
  transform: translateY(0);
  transition: transform 0.1s linear, opacity 0.1s linear;
  border: 3px solid cyan;
  &:hover {
    opacity:1;
    transform: translateY(-4px);
  }
`
Button.defaultProps = {
  href: '#'
}

export default Button
