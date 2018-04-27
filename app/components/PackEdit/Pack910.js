/**
*
* PackEdit
*
*/

import React from 'react';
import { Button, Divider, Input, Switch, DatePicker } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Hbox, Vbox } from '../Layout';
import { ProductSelector } from '../ProductSelector';
import InputRow from '../InputRow';
import ImageUploader from '../ImageUploader';
import CheckBox from '../CheckBox';
import { STYLES, SITES } from '../../utils/universalConst';
const { MonthPicker } = DatePicker;

/**
 * 整屋空间管理
 */
class Pack910 extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super();
    this.state = props.serverPack;
  }
  render() {
    const { products, images, cover, styles, sites, designer, department, shop, brand, address, area, decorateDate, status } = this.state;
    const { uploadToken, onSave } = this.props;
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
      <InputRow title="风格属性" must stretch>
        <CheckBox min={1} max={3} array={STYLES} onChanged={(list) => this.setState({ styles: list })} />
      </InputRow>
      <InputRow title="场所属性" must stretch>
        <CheckBox min={1} max={2} array={SITES} onChanged={(list) => this.setState({ sites: list })} />
      </InputRow>
      <Divider style={{ marginTop: 50 }} />
      <InputRow title="产品编号" stretch>
        <ProductSelector
          onChange={(list) => this.setState({ products: list })}
        />
      </InputRow>
      <Divider style={{ marginTop: 50 }} />
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
      <InputRow title="是否发布">
        <Switch style={{ marginTop: 6 }} checked={status === 2} onChange={(value) => this.setState({ status: value ? 2 : 1 })} />
      </InputRow>
      <Divider style={{ marginTop: 50 }} />
      <InputRow>
        <Button type="primary" onClick={() => onSave({ products, images, cover, styles, sites, designer, department, shop, brand, address, area, decorateDate, status })}>　　保 存　　</Button>
      </InputRow>
    </Vbox>);
  }
}

Pack910.propTypes = {
  serverPack: PropTypes.shape({// 服务器返回的包数据 不传则取默认值
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
};
Pack910.defaultProps = {// 默认值
  serverPack: {
    products: [], // 产品列表
    images: [], // 图片列表
    cover: '', // 封面
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

export default Pack910;
