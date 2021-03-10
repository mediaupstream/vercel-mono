import { hyphenize } from 'shared'

export default function handler(req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.json({
    message: `Hello from the API. This API call uses the "hyphenize" function imported from "shared"`,
    example: hyphenize('example hyphenized string'),
    time: new Date()
  })
}
