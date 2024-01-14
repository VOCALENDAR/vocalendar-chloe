import { error } from "console"
import React from "react"
import OgImageComp from "../components"
import {JSDOM} from "jsdom"

type Props = {
  siteURL:string
}

/**
 * OpenGraph形式の画像を取得するコンテナ
 * @returns 
 */
const OgImage: React.FC<Props> = React.memo((props) => {

  const imageURL = getImageURL(props.siteURL)


  return <OgImageComp imageURL={imageURL}></OgImageComp>
})

const getImageURL = async (siteURL:string) => {

  const url = await fetch("www.google.com")
  .then(Response => {
    if(!Response.ok) {
      throw new Error(Response.statusText)
    }
    const dom = JSDOM.fragment(Response.text())
    const ogps = Array.from(dom.querySelectorAll("head > meta")).filter(n=>n.hasAttribute("property"))
                  .map(n=> {n.getAttribute("property"), n.getAttribute("content")})
    return ogps.get("og:image")
  })
  .catch(error=>{

  })
  return url
}
export default OgImage