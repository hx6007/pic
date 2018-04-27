import React from 'react';
import { Icon } from 'antd';
import { HorizontalLayout, VerticalLayout } from '../../components/Layout';
import parseImgUrl from '../../utils/imgUrlParse';

export default class TableData {
  constructor(onRemoveClick) {
    return [{
      title: '图片',
      dataIndex: 'image',
      width: '60px',
      render: (text, record, index) => <img src={parseImgUrl(text, 40, 40)} width="40px" height="40px" />,
    }, {
      title: '产品编号/分类',
      dataIndex: 'no',
      render: (text, record, index) => (<VerticalLayout>
        <HorizontalLayout color="#333">{text}</HorizontalLayout>
        <HorizontalLayout color="#999">{record.categoryName}</HorizontalLayout>
      </VerticalLayout>),
    }, {
      title: '系列',
      dataIndex: 'series',
    }, {
      title: '品牌',
      dataIndex: 'brand',
    }, {
      title: '规格',
      dataIndex: 'spec',
    }, {
      title: '操作',
      key: 'action',
      width: '60px',
      render: (text, record, index) => (<Icon
        type="delete" title="删除" style={{ cursor: 'pointer', padding: 12 }} onClick={(e) => {
          onRemoveClick(index);
        }}
      />),
    }];
  }
}
