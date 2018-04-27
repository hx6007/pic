import React from 'react';
import { HorizontalLayout, Layout, VerticalLayout } from '../../components/Layout';
import parseImgUrl from '../../utils/imgUrlParse';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';

export default class TableData {
  constructor(packs = [], type, onDeleteClick) {
    this.packs = packs;
    this.dataSource = packs.map((item) => {
      const cover = item.cover || item.images[0];
      return {
        key: item._id,
        image: <img src={parseImgUrl(cover, 60, 60)} alt="" />,
        products: (<VerticalLayout>
          <HorizontalLayout
            color="#333"
          >{(item.products || []).map((item) => item.no || '无').join('，')}</HorizontalLayout>
          <HorizontalLayout
            color="#999"
          >{(item.products || []).map((item) => item.series || '无').join('，')}</HorizontalLayout>
        </VerticalLayout>),
        recorder: item.founder || item.recorder || '无',
        status: item.status === 1 ? '待发布' : '已发布', // 状态 1 待发布 2 已发布
        updatedAt: <pre>{new Date(item.updatedAt).toLocaleString().replace(' ', '\n')}</pre>,
      };
    });
    this.columns = [{
      title: '缩略图',
      dataIndex: 'image',
      width: 80,
    }, {
      title: '产品编号/系列名',
      dataIndex: 'products',
    }, {
      title: '录入人',
      dataIndex: 'recorder',
      width: 80,
    }, {
      title: '状态',
      dataIndex: 'status',
      width: 70,
    }, {
      title: '修改日期',
      dataIndex: 'updatedAt',
      width: 110,
    }, {
      title: '操作',
      key: 'action',
      width: 80,
      render: (text, record, index) => (<div>
        <Link
          to={{
            pathname: `/admin/pack/${record.key}`,
            state: { type },
          }}
        ><Icon type="edit" title="修改" style={{ cursor: 'pointer', padding: 8 }} /></Link>
        <a onClick={(e) => onDeleteClick(record.key)}><Icon type="delete" title="删除" style={{ cursor: 'pointer', padding: 8 }} /></a>
      </div>),
    }];
  }

  getColumns() {
    return this.columns;
  }

  getDataSource() {
    return this.dataSource;
  }
}
