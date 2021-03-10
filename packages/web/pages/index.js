import { Button, Box } from 'shared'
import fetch from 'node-fetch'

export default function Home({ data }) {
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
  const data = await (await fetch('http://localhost:3001')).json()
  return {
    props: { data },
  }
}
