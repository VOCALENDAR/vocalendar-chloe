import React, {useEffect, useState } from "react"
import OgImageComp from "./component"

type Props = {
  siteURL : string
}

/**
 * OpenGraph形式の画像を取得するコンテナ
 * @returns 
 */
const OgImage:React.FC<Props> =  (props) => {

  const [imageUrl, setImageUrl] = useState<string>()
  useEffect(()=>{
    (async ()=>{
      setImageUrl(await getImageURL(props.siteURL))
    })()
  },[props.siteURL])

  return <OgImageComp imageURL={imageUrl}></OgImageComp>
}
const getImageURL = async (siteURL:string) => {

  console.log(siteURL)
  // Clientから他のURLはCOLSではじかれるのでCOLS Proxyを利用
  const url = await fetch(`https://corsproxy.io/?${siteURL}`)
  .then(async (response) => {
    if(!response.ok) {
      throw new Error(response.statusText)
    }
    const document = new DOMParser().parseFromString(await response.text(), 'text/html')
    const ogps = Array.from(document.querySelectorAll("head > meta")).filter(n=>n.hasAttribute("property"))
                 .reduce<Map<string,string>>((previous: Map<string,string>, current: Element) => {
                   const property = current.getAttribute("property")?.trim()
                   if (property){
                     previous.set(property, current.getAttribute("content") ?? "")
                   }
                   return previous
                 }, new Map<string,string>)
     return ogps.get("og:image")               
    return ""
  })
  return url
}
export default OgImage