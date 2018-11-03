import React, { Component } from 'react'
import { Editor } from 'slate-react' 
import { Value } from 'slate' 

import Video from './Video' 
import initialValue from './value.json' 

class Embed extends Component {

  state = { value: Value.fromJSON(initialValue) }

  schema = {
    blocks: {
      video: {
        isVoid: true 
      }
    }
  }

  style = {
    width: '90%',
    margin: 'auto'
  }

  render() {
    return (
      <Editor
        value={this.state.value}
        schema={this.schema}
        onChange={this.onChange}
        renderNode={this.renderNode}
        style={this.style}
      />
    )
  }

  renderNode = (props, editor, next) => {
    switch(props.node.type) {
      case 'video':
        return  <Video {...props} />
      default:
        return next()
    }
  }

  onChange = ({ value }) => {
    this.setState({ value })
  }

}

export default Embed;
