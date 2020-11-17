import React, { Component } from 'react'
import {Button} from "antd"

export default class addUpdate extends Component {
  render() {
    return (
      <div>
        addUpdate <Button onClick={() => { this.props.history.goBack()}}>返回</Button>
      </div>
    )
  }
}
