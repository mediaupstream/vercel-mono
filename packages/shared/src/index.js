export * from './components/Box'
export * from './components/Button'

export const hyphenize = (str) =>
  str
    .replace(/([A-Z])/g, ' $1')
    .split(' ')
    .join('_')
    .toLowerCase()
