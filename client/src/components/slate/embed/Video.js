import React, { Component } from 'react'

class Video extends Component {
  onChange = e => {
    const video = e.target.value
    const { node, editor } = this.props
    editor.setNodeByKey(node.key, { data: { video } })
  }

  onClick = e => {
    e.stopPropagation()
  }

  render() {
    // const { isSelected, attributes } = this.props
    const { attributes } = this.props
    const video = this.props.node.data.get('video')

    return (
      <div {...attributes}>
        {this.renderInput()}
        {video.length > 0 ? this.renderVideo() : null}
        {/* { this.renderVideo() } */}
        {/* { isSelected ? this.renderInput() : null } */}
      </div>
    )
  }

  renderVideo = () => {
    const { node, isFocused } = this.props
    const video = node.data.get('video')

    const wrapperStyle = {
      position: 'relative',
      outline: isFocused ? '2px solid blue' : 'none'
    }

    const maskStyle = {
      display: isFocused ? 'none' : 'block',
      position: 'absolute',
      top: '0',
      left: '0',
      height: '100%',
      width: '100%',
      cursor: 'cell',
      zIndex: 1
    }

    const iframeStyle = {
      display: 'block',
      width: '100%',
      marginBottom: '10px'
    }

    return (
      <div style={wrapperStyle}>
        <div style={maskStyle} />
        <iframe
          id="ytplayer"
          type="text/html"
          width="100%"
          // width='640'
          height="300"
          src={video}
          frameBorder="0"
          style={iframeStyle}
          title={video}
        />
      </div>
    )
  }

  renderInput = () => {
    const { node } = this.props
    const video = node.data.get('video')
    const style = {
      margin: '5px 0',
      boxSizing: 'border-box',
      height: '40px',
      width: '100%',
      fontSize: '14px',
      background: '#142634'
    }

    return (
      <input
        value={video}
        onChange={this.onChange}
        onClick={this.onClick}
        style={style}
        placeholder=" Copy & paste your fav embedded URL."
      />
    )
  }
}

/*,
        {
          "object": "block",
          "type": "paragraph",
          "nodes": [
            {
              "object": "text",
              "leaves": [
                {
                  "text":
                    "Embed your fav URL or try this one: https://www.youtube.com/embed/Xx52--WmLQs"
                }
              ]
            }
          ]
        }
*/

export default Video
