function renderBody(status: string, content: object) {
  const html = `
    <script>
      const receiveMessage = (message) => {
        window.opener.postMessage(
          'authorization:github:${status}:${JSON.stringify(content)}',
          message.origin
        );
        window.removeEventListener("message", receiveMessage, false);
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    </script>
    `
  const blob = new Blob([html])
  return blob
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const client_id = config.GITHUB_CLIENT_ID
  const client_secret = config.GITHUB_CLIENT_SECRET

  try {
    const urlData = getRequestURL(event)

    const code = urlData.searchParams.get('code')
    const response = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'user-agent': 'cloudflare-functions-github-oauth-login-demo',
          'accept': 'application/json',
        },
        body: JSON.stringify({ client_id, client_secret, code }),
      },
    )

    const result = await response.json()
    if (result.error) {
      return new Response(renderBody('error', result), {
        headers: {
          'content-type': 'text/html;charset=UTF-8',
        },
        status: 401,
      })
    }
    const token = result.access_token
    const provider = 'github'
    const responseBody = renderBody('success', {
      token,
      provider,
    })
    return new Response(responseBody, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
      status: 200,
    })
  }
  catch (error) {
    console.error(error)
    const message = error instanceof Error ? error.message : 'Internal Server Error'
    return new Response(message, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
      status: 500,
    })
  }
})
