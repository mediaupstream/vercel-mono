import { Button, Box } from 'shared'
import fetch from 'node-fetch'

const API_URL = process.env.apiUrl + '/api'

console.log('API_URL:', API_URL)

export default function Home({ data }) {
  return (
    <div style={{ padding: "2rem"}}>
      <Button>Shared Button</Button>
      <Button>Shared Button</Button>
      <Button>Shared Button</Button>
      <Box>Shared Box</Box>
      <Box>
        <h2 style={{fontFamily: 'monospace'}}>Data from {API_URL}</h2>
        <code><pre>
        {JSON.stringify(data, null, 2)}
        </pre></code>
      </Box>
    </div>
  )
}

export async function getStaticProps(context) {
  const data = await (await fetch(API_URL)).json()
  return {
    props: { data },
  }
}
