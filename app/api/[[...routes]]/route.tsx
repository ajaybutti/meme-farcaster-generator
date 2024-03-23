/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { pinata } from 'frog/hubs'
import { handle } from 'frog/vercel'
import { NextRequest } from 'next/server';

const app = new Frog({
  basePath: '/api',
})


app.use("/*", async (c:any, next:any) => {
  await next()
    const isFrame = c.res.headers.get('content-type')?.includes('html');
    if (isFrame) {
      let html = await c.res.text();
      const metaTag = '<meta property="of:accepts:xmtp" content="2024-02-01" />';
      html = html.replace(/(<head>)/i, `$1${metaTag}`);
      c.res = new Response(html, {
        headers: {
          'content-type': 'text/html',
        },
      });
    }
  }); 



app.frame('/', (c) => {
  return c.res({
    action: '/picker',
    image: `https://meme-farcaster-generator.vercel.app/blue.jpg`,
    imageAspectRatio:"1:1",
    intents: [<Button value="A">A</Button>, <Button value="B">B</Button>],
  })
 
})


app.frame('/picker', (c:any) => {
  const { buttonValue} = c
    if (buttonValue === 'A') {
      return c.res({
        action: '/meme/a',
        image: 'https://meme-farcaster-generator.vercel.app/meme/a',
        intents: [
          <TextInput placeholder="Text" />,
          <Button value="generate">Generate Meme </Button>,
        ],
      })
    }

    return c.res({
      action: '/meme/b',
      image: 'https://meme-farcaster-generator.vercel.app/meme/b',
      imageAspectRatio: '1:1',
      intents: [
        <TextInput placeholder="Text" />,
        <Button value="generate">Generate</Button>,
      ],
    })


  return c.res({
    action: '/',
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
        Invalid User
      </div>
    ),
    intents: [<Button>Try Again 🔄</Button>],
  })
})

app.frame('/meme/:id', (c:any) => {
  const id = c.req.param('id')

  const { frameData } = c
  const { inputText = '' } = frameData || {}

    const newSearchParams = new URLSearchParams({
      text: inputText,
    })

    if (id === 'a') {
      return c.res({
        action: '/',
        image: `https://meme-farcaster-generator.vercel.app/meme/a?${newSearchParams}`,
        intents: [<Button>Start Over 🔄</Button>],
      })
    }

    return c.res({
      action: '/',
      image: `https://meme-farcaster-generator.vercel.app/meme/b?${newSearchParams}`,
      imageAspectRatio: '1:1',
      intents: [<Button>Start Over 🔄</Button>],
    })


  return c.res({
    action: '/',
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
        Invalid User
      </div>
    ),
    intents: [<Button>Try Again 🔄</Button>],
  })
})

export const GET = handle(app)
export const POST = handle(app)
