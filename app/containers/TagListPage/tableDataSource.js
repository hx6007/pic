import React from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode.react';

import { HorizontalLayout, VerticalLayout } from '../../components/Layout';
import { SERVER } from '../../utils/universalConst';


export default class TableData {
  constructor(packs = [], onIconClick) {
    function getQrcodeUrl(tagId) {
      return `http://www.51etuku.com/tags/${tagId}`;
    }
    function getDownloadUrl(tagId, filename = '下载') {
      return `${SERVER.PT}/qrcode?tag=${tagId}&filename=${filename}`;
    }
    return [{
      title: '二维码',
      dataIndex: '',
      width: '135px',
      render: (text, row) => (
        <div>
          <QRCode value={getQrcodeUrl(row.id)} size={100} />
        </div>
      ),
    }, {
      title: '标签名称/说明',
      dataIndex: 'name',
      width: '200px',
      render: (text, row) => (
        <VerticalLayout>
          <HorizontalLayout fontSize="16px" color="#333">{text}</HorizontalLayout>
          <HorizontalLayout color="#999">{row.describe}</HorizontalLayout>
        </VerticalLayout>
      ),
    }, {
      title: '关联产品',
      dataIndex: 'packs',
      render: (text, row) => <div>{((text && text.no) || []).join(', ')}</div>,
    }, {
      title: '操作',
      key: 'action',
      width: '150px',
      render: (text, row, index) => (
        <div>
          <a download href={getDownloadUrl(row.id, row.name)}><Icon type="download" title="下载" style={{ cursor: 'pointer', padding: 10, color: '#08c' }} /></a>
          <Link to={{ pathname: `/admin/tags/${row.id}` }}><Icon type="edit" title="修改" style={{ cursor: 'pointer', padding: 10, color: '#08c' }} /></Link>
          <Icon type="delete" title="删除" style={{ cursor: 'pointer', padding: 10, color: '#08c' }} onClick={() => { onIconClick(index, 'delete'); }} />
        </div>
      ),
    }];
  }
}
