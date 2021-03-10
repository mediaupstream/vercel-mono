import express from 'express'
import { hyphenize } from 'shared'

const app = express()
const port = 3001

app.get('/', (req, res) => {
  console.log('api request')
  res.json({
    message: hyphenize('hello from the api!'),
    time: new Date()
  })
})

app.listen(port)
