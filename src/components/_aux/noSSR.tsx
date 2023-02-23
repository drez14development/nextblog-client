import dynamic from 'next/dynamic'
import React from 'react'

const NoSSRWrapper = (props: { children: JSX.Element | React.ReactFragment }) => (
  <React.Fragment>{props.children}</React.Fragment>
)

export default dynamic(() => Promise.resolve(NoSSRWrapper), {
  ssr: false
})