import { Button, Box } from 'shared'
import fetch from 'node-fetch'
const {
  API_URL = 'http://localhost:3001',
  VERCEL_URL,
} = process.env

console.log(API_URL, VERCEL_URL)

export default function Home({ data }) {
  console.log(API_URL, VERCEL_URL)
  return (
    <div style={{ padding: "2rem"}}>
      <Button>Shared Button</Button>
      <Button>Shared Button</Button>
      <Button>Shared Button</Button>
      <Box>Shared Box</Box>
      <Box>
        Data from API:
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
