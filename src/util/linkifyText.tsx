import React from 'react'

const URL_REGEX = /(https?:\/\/[^\s]+)/g

const linkifyText = (text: string): React.ReactNode[] =>
  text.split(URL_REGEX).map((part, i) =>
    URL_REGEX.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer">
        {part}
      </a>
    ) : (
      part
    )
  )

export default linkifyText
