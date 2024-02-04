import { error } from "console"
import React, { useCallback } from "react"
import OgImageComp from "../components"
import {JSDOM} from "jsdom"

type Props = {
  siteURL:string
}

/**
 * OpenGraph形式の画像を取得するコンテナ
 * @returns 
 */
const OgImage:React.FC<Props> =  (props) => {

  // TODO awaitをasyncの中で使わなければいけないが、React.FCをasync指定できなくてどうすればいいか謎。
  const imageURL = "" // await getImageURL(props.siteURL)
  return <OgImageComp imageURL={imageURL}></OgImageComp>
}
const getImageURL = async (siteURL:string = "www.google.com") => {

  const url = await fetch(siteURL)
  .then(async response => {
    if(!response.ok) {
      throw new Error(response.statusText)
    }
    const dom = JSDOM.fragment(await response.text())
    const ogps = Array.from(dom.querySelectorAll("head > meta")).filter(n=>n.hasAttribute("property"))
                .reduce<Map<string,string>>((previous: Map<string,string>, current: Element) => {
                  const property = current.getAttribute("property")?.trim()
                  if (property){
                    previous.set(property, current.getAttribute("content") ?? "")
                  }
                  return previous
                }, new Map<string,string>)
    return ogps.get("og:image")               
  })
  return url
}
export default OgImage