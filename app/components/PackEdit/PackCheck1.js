/**
*
* PackEdit
*
*/

import React from 'react';
import { Button, Divider, Input, DatePicker, Modal, message } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import PackModal from '../../components/PackModal/index';
import { Hbox, Vbox } from '../Layout';
import { ProductSelector } from '../ProductSelector';
import InputRow from '../InputRow';
import ImageUploader from '../ImageUploader';

const { MonthPicker } = DatePicker;
const { TextArea } = Input;
const confirm = Modal.confirm;
/**
 * 一审管理
 */

class PackCheck1 extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super();
    this.state = props.serverPack;
  }

  render() {
    const { visible, products, images, cover, note, designer, department, shop, brand, address, area, decorateDate, status } = this.state;
    const { uploadToken, onSave, onDelete, onRefuse } = this.props;
    return (<Vbox>
      <InputRow title="图片" must stretch>
        <ImageUploader
          uploadToken={uploadToken}
          images={images}
          onImagesChanged={(list) => this.setState({ images: list })}
          cover={cover}
          onCoverChanged={(img) => this.setState({ cover: img })}
        />
      </InputRow>
      <Divider style={{ marginTop: 20 }} />
      <InputRow must title="产品编号" stretch>
        <ProductSelector
          defultProducts={products}
          onChange={(list) => this.setState({ products: list })}
        />
      </InputRow>
      <Divider style={{ marginTop: 50 }} />
      <InputRow title="产品备注">
        <TextArea disabled value={note} style={{ width: 435, height: 100 }} />
      </InputRow>
      <InputRow title="设计师">
        <Input value={designer} onChange={(e) => this.setState({ designer: e.target.value })} style={{ width: 200 }} />
      </InputRow>
      <InputRow title="所属单位">
        <Input value={department} onChange={(e) => this.setState({ department: e.target.value })} style={{ width: 200 }} />
      </InputRow>
      <InputRow title="店面名称">
        <Input value={shop} onChange={(e) => this.setState({ shop: e.target.value })} style={{ width: 200 }} />
      </InputRow>
      <InputRow title="品牌">
        <Input value={brand} onChange={(e) => this.setState({ brand: e.target.value })} style={{ width: 200 }} />
      </InputRow>
      <InputRow title="详细地址">
        <Input value={address} onChange={(e) => this.setState({ address: e.target.value })} style={{ width: 435 }} />
      </InputRow>
      <InputRow title="面积">
        <Hbox>
          <Input
            type="number"
            value={area || undefined}
            onChange={(e) => this.setState({ area: e.target.value })}
            style={{ width: 175, marginRight: 15 }}
            addonAfter="㎡"
          />
          装修日期：
          <MonthPicker
            allowClear={false}
            value={decorateDate ? moment(new Date(decorateDate)) : undefined}
            onChange={(date) => this.setState({ decorateDate: date.valueOf() })}
          />
        </Hbox>
      </InputRow>
      <Divider style={{ marginTop: 50 }} />
      <InputRow>
        <Hbox>
          {[3].includes(status) && (
            <Button
              type="primary"
              onClick={() => {
                if (products.length > 0) {
                  onSave({ products, images, cover, note, designer, department, shop, brand, address, area, decorateDate, status: 4 });
                } else {
                  message.warn('必须添加产品');
                }
              }}
            >一审通过</Button>
          )}
          {[5].includes(status) && (
            <Button
              type="primary"
              onClick={() => {
                if (products.length > 0) {
                  onSave({ products, images, cover, note, designer, department, shop, brand, address, area, decorateDate, status: 3 });
                } else {
                  message.warn('必须添加产品');
                }
              }}
            >保存(到一审)</Button>
          )}

          <Button style={{ margin: '0 12px' }} onClick={() => this.setState({ visible: true })}>不通过</Button>
          {/* <Button style={{ margin: '0 12px' }} onClick={() => onSave({ products, images, cover, note, designer, department, shop, brand, address, area, decorateDate, status: 5 })}>不通过</Button> */}
          <Button
            type="danger"
            onClick={() => confirm({
              title: '真的要删除该条数据吗',
              okText: '确定',
              okType: 'danger',
              cancelText: '取消',
              onOk: () => onDelete(),
            })}
          >删除</Button>
          <PackModal
            visible={visible}
            onClose={() => this.setState({ visible: false })}
            onConfirm={(checkMessage) => {
              if (checkMessage === '') {
                message.warn('请选择审核不通过原因, 或自行描述!');
              } else {
                onRefuse(checkMessage);
              }
            }}
          />
        </Hbox>
      </InputRow>
    </Vbox>);
  }
}

PackCheck1.propTypes = {
  serverPack: PropTypes.shape({// 服务器返回的包数据 不传则取默认值
    note: PropTypes.string, // 用户备注
    products: PropTypes.arrayOf(PropTypes.shape({  // 产品列表
      id: PropTypes.any.isRequired, // 唯一ID
      image: PropTypes.any, // 图片
      no: PropTypes.any, // 产品编号
      level: PropTypes.any, // 等级
      series: PropTypes.any, // 系列名称
      brand: PropTypes.any, // 品牌
      spec: PropTypes.any, // 规格
    })),
    images: PropTypes.arrayOf(PropTypes.string), // 图片列表
    cover: PropTypes.string, // 封面
    spaces: PropTypes.arrayOf(PropTypes.string), // 空间属性
    styles: PropTypes.arrayOf(PropTypes.string), // 风格属性
    sites: PropTypes.arrayOf(PropTypes.string), // 场所属性
    designer: PropTypes.string, // 设计师
    department: PropTypes.string, // 所属单位
    shop: PropTypes.string, // 店面名称
    brand: PropTypes.string, // 品牌
    address: PropTypes.string, // 详细地址
    area: PropTypes.number, // 面积
    decorateDate: PropTypes.number, // 装修日期
    status: PropTypes.number, // 发布状态
  }), // 产品
  // 上传凭证
  uploadToken: PropTypes.string.isRequired,
  // 保存回调
  onSave: PropTypes.func.isRequired,
  // 删除回调
  onDelete: PropTypes.func.isRequired,
  // 审核不通过回调
  onRefuse: PropTypes.func.isRequired,
};
PackCheck1.defaultProps = {// 默认值
  serverPack: {
    note: '', // 用户备注
    products: [], // 产品列表
    images: [], // 图片列表
    cover: '', // 封面
    spaces: [], // 空间属性
    styles: [], // 风格属性
    sites: [], // 场所属性
    designer: '', // 设计师
    department: '', // 所属单位
    shop: '', // 店面名称
    brand: '', // 品牌
    address: '', // 详细地址
    area: 0, // 面积
    decorateDate: 0, // 装修日期
    status: 2, // 发布状态
  },
};

export default PackCheck1;
