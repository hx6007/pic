import React from 'react';
import { Icon, Badge } from 'antd';
import { Link } from 'react-router-dom';
import parseImgUrl from '../../utils/imgUrlParse';
import { HorizontalLayout, VerticalLayout } from '../../components/Layout';

export default class TableData {
  constructor(packs = [], onIconClick) {
    this.packs = packs;
    this.dataSource = packs.map((item) => {
      const cover = item.cover || item.images[0];
      const decorateDate = item.decorateDate ? `${new Date(item.decorateDate).getFullYear()}/${new Date(item.decorateDate).getMonth() + 1}` : '';
      const updatedAt = item.updatedAt ? new Date(item.updatedAt).toLocaleString().replace(' ', '\n') : '';
      const location = item.location ? item.location : '';
      return {
        key: item._id,
        image: (<Badge
          count={item.images.length} style={{
            top: 53,
            left: 60,
            width: 18,
            height: 18,
            padding: 0,
            borderRadius: 0,
            background: '#999999',
            boxShadow: '0 0 0 1px #999999',
            display: 'flex',
            justifyContent: 'center' }}
        ><div>
          <img src={parseImgUrl(cover, 60, 60)} alt="" width="60" height="60" />
        </div></Badge>),
        products: (
          <VerticalLayout>
            <HorizontalLayout fontSize="14px" color="#333">设计师：{(item.designer) || '暂无'}（所属单位：{(item.department) || '暂无'}）</HorizontalLayout>
            <HorizontalLayout fontSize="13px" color="#999">{ item.styles.length > 0 ? (item.styles) : '暂无'} | 地址：{ (location.detail) || '暂无'} | 面积：{(item.area) || '暂无'} | 装修日期：{ decorateDate || '暂无'}</HorizontalLayout>
          </VerticalLayout>),
        founder: item.founder || '暂无',
        checkMessage: item.checkMessage || '无',
        updatedAt: <pre>{updatedAt || '暂无'}</pre>,
      };
    });
    this.columns = [{
      title: '缩略图',
      dataIndex: 'image',
      width: 80,
    }, {
      title: '产品编号/系列名称',
      dataIndex: 'products',
    }, {
      title: '审核不通过原因',
      dataIndex: 'checkMessage',
      width: 200,
    }, {
      title: '上传者',
      dataIndex: 'founder',
      width: 80,
    }, {
      title: '上传日期',
      dataIndex: 'updatedAt',
      width: 110,
    }, {
      title: '操作',
      key: 'action',
      width: 80,
      render: (text, record) => (<div>
        <Link
          to={`/admin/user_pack/${record.key}`}
        ><Icon type="edit" title="修改" style={{ cursor: 'pointer', padding: 8 }} /></Link>
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
