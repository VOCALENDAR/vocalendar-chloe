import React from 'react'

type Props = {
  imageURL: string | undefined
}

/**
 * GpenGraph形式の画像を取得するコンテナ
 * @returns
 */
const OgImageComp: React.FC<Props> = React.memo(function OgImageCompInner(props) {
  return props.imageURL ? (
    <>
      <img src={props.imageURL} width={'300px'} />
    </>
  ) : (
    <></>
  )
})
export default OgImageComp
