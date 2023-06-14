import Image from 'next/image'
import type { FC } from 'react'

type ImageInput = {
  typeName: 'ImageInput'
  url: string
  alt: string
}

type TokenInput = {
  typeName: 'TokenInput'
  token: string
}

type RemoteInput = {
  typeName: 'RemoteInput'
  url: string
}

type TextInput = {
  typeName: 'TextInput'
  text: string
}

type Props = ImageInput | TokenInput | RemoteInput | TextInput

export const BrandThumbnail: FC<Props> = ({ typeName, ...props }) => {
  if (typeName === 'ImageInput') {
    const { alt, url } = props as ImageInput
    return <Image src={url} alt={alt} />
  }

  if (typeName === 'TextInput') {
    const { text } = props as TextInput
    return <h1 className="txt-h3">{text}</h1>
  }

  return null
}
