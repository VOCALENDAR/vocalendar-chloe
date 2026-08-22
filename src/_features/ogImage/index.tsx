import React, { useEffect, useState } from 'react'
import OgImageComp from './component'

type Props = {
  siteURL?: string
}

/**
 * OpenGraph形式の画像を取得するコンテナ
 * @returns
 */
const OgImage: React.FC<Props> = props => {
  if (!props.siteURL) {
    return <></>
  }
  const [imageUrl, setImageUrl] = useState<string>()
  useEffect(() => {
    setImageUrl(undefined)
    ;(async () => {
      setImageUrl(await getImageURL(props.siteURL!))
    })()
  }, [props.siteURL])

  return <OgImageComp imageURL={imageUrl}></OgImageComp>
}
const toAbsoluteURL = (url: string, baseURL: string): string => {
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  const { origin } = new URL(baseURL)
  return `${origin}${url.startsWith('/') ? '' : '/'}${url}`
}

const getImageURL = async (siteURL: string) => {
  console.log(siteURL)
  // Clientから他のURLはCOLSではじかれるのでCOLS Proxyを利用
  const url = await fetch(`https://zufjl0y1v6.execute-api.ap-northeast-1.amazonaws.com/prod/proxy?url=${siteURL}`, {
    headers: { 'x-api-key': import.meta.env.VITE_PROXY_API_KEY ?? '' },
  }).then(async response => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const document = new DOMParser().parseFromString(await response.text(), 'text/html')
    const metas = Array.from(document.querySelectorAll('head > meta'))
    // ogpの取得
    const ogps = metas
      .filter(n => n.hasAttribute('property'))
      .reduce<Map<string, string>>((previous, current) => {
        const property = current.getAttribute('property')?.trim()
        if (property) previous.set(property, current.getAttribute('content') ?? '')
        return previous
      }, new Map<string, string>())
    const ogImage = ogps.get('og:image')

    // ogpが無い場合にはTwitter Cardを取得
    if (ogImage) return toAbsoluteURL(ogImage, siteURL)
    const twitterCards = metas
      .filter(n => n.hasAttribute('name'))
      .reduce<Map<string, string>>((previous, current) => {
        const name = current.getAttribute('name')?.trim()
        if (name) previous.set(name, current.getAttribute('content') ?? '')
        return previous
      }, new Map<string, string>())
    const twitterImage = twitterCards.get('twitter:image')
    return twitterImage ? toAbsoluteURL(twitterImage, siteURL) : undefined
  })
  return url
}
export default OgImage
