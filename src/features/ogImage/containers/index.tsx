import { error } from "console"
import React from "react"
import OgImageComp from "../components"

type Props = {
  siteURL:string
}

/**
 * GpenGraph形式の画像を取得するコンテナ
 * @returns 
 */
const OgImage: React.FC<Props>= React.memo((props) => {

  const imageURL = getImageURL(props.siteURL)


  return <OgImageComp imageURL={imageURL}></OgImageComp>
})

const getImageURL =  (siteURL:string) => {

  let result:string = ""
  fetch("www.google.com")
  .then(Response => {
    if(!Response.ok) {
      throw new Error(Response.statusText)
    } 
    Response.headers.forEach((value, key)=>{
      if(key === "") {
        result = value
      }
    })
  })
  .catch(error=>{

  })
  return result
}
export default OgImage