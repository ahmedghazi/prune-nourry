import React from 'react'
import {ImEmbed2} from 'react-icons/im'
import ReactPlayer from 'react-player'

type Props = {
  url: string
  title: string
  placeholder: string
  renderDefault: Function
}

const EmbedPreview = (props: Props): JSX.Element => {
  const {url, title, placeholder, renderDefault} = props

  const playerConfig = {
    youtube: {
      playerVars: {
        controls: 1,
        disablekb: 1,
        enablejsapi: 1,
        iv_load_policy: 3,
        modestbranding: 1,
        cc_load_policy: 0,
        showinfo: 0,
        rel: 0,
        origin: 'https://studio-eker-backoffice.sanity.studio',
      },
      embedOptions: {
        host: 'https://www.youtube-nocookie.com',
      },
    },
  }

  if (!url) return <div>{renderDefault(props)}</div>
  return (
    <div>
      {renderDefault({...props, title: title})}
      {/* {placeholder} */}
      <ReactPlayer
        url={url}
        config={playerConfig}
        light={placeholder}
        width="100%"
        height="auto"
        style={{
          aspectRatio: '5 / 3',
        }}
      />
    </div>
  )
}

export default {
  title: 'Embed',
  name: 'embed',
  type: 'object',
  icon: ImEmbed2,
  fields: [
    {
      name: 'title',
      type: 'localeString',
    },
    {
      name: 'subTitle',
      type: 'localeString',
    },
    {
      name: 'placeholder',
      type: 'image',
    },
    {
      name: 'url',
      type: 'url',
      description: 'url publique du media ex: https://www.youtube.com/watch?v=exTZ9vB6ZeE',
    },
    {
      name: 'aspectRatio',
      type: 'string',
      description: 'Ratio de la video. Examples de format: 5 / 3 ou 16 / 9 ou 4 / 3',
    },
  ],
  components: {
    preview: EmbedPreview, // Add custom preview component
  },
  preview: {
    select: {
      url: 'url',
      title: 'title.en',
      placeholder: 'placeholder.asset.url',
    },
  },
}
