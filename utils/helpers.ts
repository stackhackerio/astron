import { IncomingMessage, ServerResponse } from 'http'

export const getURL = () => {
  const url =
    process?.env?.URL && process.env.URL !== ''
      ? process.env.URL
      : process?.env?.VERCEL_URL && process.env.VERCEL_URL !== ''
      ? process.env.VERCEL_URL
      : 'http://localhost:3000'
  return url.includes('http') ? url : `https://${url}`
}

type Props = {
  url: string
  token: string
  data?: any
}

export const postData = async ({ url, token, data = {} }: Props) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json', token }),
      credentials: 'same-origin',
      body: JSON.stringify(data),
    })

    return res.json()
  } catch (error) {
    throw error
  }
}

export const toDateTime = (secs: number) => {
  var t = new Date('1970-01-01T00:30:00Z') // Unix epoch start.
  t.setSeconds(secs)
  return t
}
