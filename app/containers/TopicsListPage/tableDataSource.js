import React from 'react';
import { Icon, Badge } from 'antd';
import { Link } from 'react-router-dom';
import parseImgUrl from '../../utils/imgUrlParse';

import { HorizontalLayout, VerticalLayout } from '../../components/Layout';

function getStatus(id) {
  switch (id) {
    case 1:
      return '待发布';
    case 2:
      return '已发布';
    case 3:
    case 4:
      return '待审核';
    case 5:
      return '驳回';
    default:
      return '无';
  }
}

function formatDate(date) {
  const datetime = new Date(date);
  const [year, month, day, house, minut, secound] = [datetime.getFullYear(), datetime.getMonth() + 1, datetime.getDate(), datetime.getHours(), datetime.getMinutes(), datetime.getSeconds()];
  let ap = '上午';
  if (house > 12) {
    ap = '下午';
  }
  return <div>{year}/{month}/{day}/<br />{ap}{house - 12}:{minut}:{secound}</div>;
}

export default class TableData {
  constructor(packs = [], onIconClick) {
    return [{
      title: '缩略图',
      dataIndex: 'images',
      width: '105px',
      render: (text, row) => (
        // TODO 页面样式
        <Badge
          count={row.images.length}
          style={{
            top: 53,
            left: 60,
            width: 18,
            height: 18,
            padding: 0,
            borderRadius: 0,
            background: '#999999',
            boxShadow: '0 0 0 1px #999999',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div>
            <img src={parseImgUrl(row.cover || (row.images && row.images[0]) || '', 60, 60)} alt="" width="60" height="60" style={{ fontSize: 0, border: 0, margin: 0, padding: 0, }} />
          </div>
        </Badge>
      ),
    }, {
      title: '专题名称/摘要',
      dataIndex: 'title',
      width: '500px',
      render: (text, row) => (
        <VerticalLayout>
          <HorizontalLayout fontSize="16px" color="#333">{text}</HorizontalLayout>
          <HorizontalLayout color="#999">{row.describe}</HorizontalLayout>
        </VerticalLayout>
      ),
    }, {
      title: '录入人',
      dataIndex: 'recorder',
      width: '100px',
      render: (text) => <div>{text}</div>,
    }, {
      // { 0: 所有, 1: 待发布, 2: 已发布, 3: 一审, 4: 二审, 5: 驳回 }
      title: '状态',
      dataIndex: 'status',
      width: '100px',
      render: (text) => <div>{getStatus(text)}</div>,
    }, {
      title: '日期',
      dataIndex: 'updatedAt',
      width: '100px',
      render: (text) => formatDate(text),
    }, {
      title: '操作',
      key: 'action',
      width: '150px',
      render: (text, row) => (
        <div>
          <Link to={{ pathname: `/admin/topics/${row.id}` }}><Icon type="edit" title="修改" style={{ cursor: 'pointer', padding: 10, color: '#08c' }} /></Link>
          <Icon type="delete" title="删除" style={{ cursor: 'pointer', padding: 10, color: '#08c' }} onClick={() => { onIconClick(row.id, 'delete'); }} />
        </div>
      ),
    }];
  }
}
