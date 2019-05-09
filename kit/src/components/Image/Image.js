/**
 * 图片组件
 */
import styles from './Image.less';
import React, {Component} from 'react';
import {Form, Row, Col, Input, Button, Icon, DatePicker, Select, InputNumber, Radio, Cascader} from 'antd';
import classnames from 'classnames';
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';

class Index extends Component {
  constructor(props) {
    super(props);
    const value = this.props.data.value || this.props.data.defaultValue;
    this.state = {
      value,
      zoomUrl: null
    };
  }
  componentDidMount() {
    setTimeout(function() {
      for (let i = 0; i < document.getElementsByClassName('images').length; i++) {
        new Viewer(document.getElementsByClassName('images')[i]);
      }
    }, 3000)
  }
  handleZoomImage(index) {
    const imgUrl = this.props.data.value[Number(index)];
    this.setState({
      zoomUrl: imgUrl
    })
  }
  handleCloseZoom() {
    this.setState({
      zoomUrl: null
    })
  }
  render() {
    const {data} = this.props;
    return (
      <div id="images" className="images">
        {
          data.value.map((item, index) => {
            return (
              <img src={
                item.indexOf('http') > -1 ? item :
                  item.indexOf('data:image/') > -1 ? item :
                    `data:image/png;base64,${item}`
              }
              key={index}
              // onClick={() => {this.handleZoomImage(index)}}
              />
            );
          })
        }
        {
          !!this.state.zoomUrl &&
          <div className={styles.zoomImageWrap} onClick={this.handleCloseZoom.bind(this)}>
            <img src={
              this.state.zoomUrl.indexOf('http') > -1 ? this.state.zoomUrl :
                this.state.zoomUrl.indexOf('data:image/') > -1 ? this.state.zoomUrl :
                  `data:image/png;base64,${this.state.zoomUrl}`
            }
            className={styles.zoomImage} />
          </div>

        }
      </div>
    );
  }
}
export default Index;
