/**
*
* Mpicker
*
*/

import React from 'react';
import styled from 'styled-components';
import { Picker } from 'antd-mobile';
import { HorizontalLayout } from '../Layout';
import Down from './downActive@2x.png';
import {makeSelectTToken} from "../../containers/App/selectors";


const seasons = [
  [
    {
      label: '产品图',
      value: '1',
    },
    {
      label: '实景图',
      value: '2',
    },
    {
      label: '效果图',
      value: '3',
    },
    {
      label: '样板间',
      value: '4',
    },
    {
      label: '直板图',
      value: '5',
    },
    {
      label: '地面图',
      value: '6',
    },
    {
      label: '装修效果图',
      value: '7',
    },
    {
      label: '平面布局图',
      value: '8',
    },
    {
      label: '整屋空间效果图',
      value: '9',
    },
    {
      label: '整屋空间实景图',
      value: '10',
    },
  ],
];
const seasons2 = [
  [
    {
      label: '产品图',
      value: '1',
    },
    {
      label: '实景图',
      value: '2',
    },
    {
      label: '效果图',
      value: '3',
    },
    {
      label: '整屋空间效果图',
      value: '9',
    },
    {
      label: '整屋空间实景图',
      value: '10',
    },
  ],
];
const PickerItem = styled(HorizontalLayout)`
  flex: 1;
  font-size: 13px;
  color: #1890ff;
`;
const DownIcon = styled.img`
  width: 14px;
  height: 14px;
  margin-left: 2px;
`;


class Mpicker extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super();
    const typetext = this.changTypeText(props.nowType);
    this.state.value = typetext || '产品图';
  }
  state = {
    data: [],
    cols: 1,
    pickerValue: [],
    asyncValue: [],
    sValue: ['1'],
    value: '产品图',
    visible: false,
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      const params = new URLSearchParams(location.search);
      const typetext = this.changTypeText(params.get('type'));
      this.state.value = typetext;
    }
  }
  onClick(v) {
    const { history, keyword } = this.props;
    const key = v[0];
    const typetext = this.changTypeText(key);
    this.setState({ value: typetext });
    let url = `/mobile/pageList?type=${key}`;
    if (keyword) {
      url += `&keyword=${keyword}`;
    }
    history.push(url);
  }
  changTypeText(key) {
    let typetext;
    switch (parseInt(key)) {
      case 1:
        typetext = '产品图';
        break;
      case 2:
        typetext = '实景图';
        break;
      case 3:
        typetext = '效果图';
        break;
      case 4:
        typetext = '样板图';
        break;
      case 5:
        typetext = '直板图';
        break;
      case 6:
        typetext = '地面图';
        break;
      case 7:
        typetext = '装修效果图';
        break;
      case 8:
        typetext = '平面布局图';
        break;
      case 9:
        typetext = '整屋空间效果图';
        break;
      case 10:
        typetext = '整屋空间实景图';
        break;
      default:
    }
    return typetext;
  }
  render() {
    const { ttoken } = this.props;
    return (
      <div>
        <Picker
          data={ttoken ? seasons : seasons2 }
          title=""
          cascade={false}
          extra="请选择(可选)"
          value={this.state.sValue}
          onChange={(v) => this.onClick(v)}
          onOk={(v) => this.setState({ sValue: v })}
        >
          <PickerItem>{this.state.value}<DownIcon src={Down} /></PickerItem>
        </Picker>
      </div>
    );
  }
}

Mpicker.propTypes = {

};

export default Mpicker;
