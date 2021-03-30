import dynamic from 'next/dynamic'

export const Button = dynamic(() => import('./components/Button'))
export const Box = dynamic(() => import('./components/Box'))

export const hyphenize = (str) =>
  str
    .replace(/([A-Z])/g, ' $1')
    .split(' ')
    .join('_')
    .toLowerCase()
