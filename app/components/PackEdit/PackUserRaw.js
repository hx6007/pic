/**
*
* PackEdit
*
*/

import React from 'react';
import { Button, Divider, Input, DatePicker } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Hbox, Vbox } from '../Layout';
import InputRow from '../InputRow';
import ImageUploader from '../ImageUploader';
const { TextArea } = Input;
const { MonthPicker } = DatePicker;

/**
 * 前台用户图片上传
 */
class PackUserRaw extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super();
    this.state = props.serverPack;
  }
  render() {
    const { images, cover, note, designer, department, address, area, decorateDate, brand, shop } = this.state;
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
      <Divider style={{ marginTop: 20 }} />
      <InputRow title="产品备注">
        <TextArea value={note} placeholder="请备注效果图中的使用到的产品信息或产品编号..." onChange={(e) => this.setState({ note: e.target.value })} style={{ width: 435, height: 100 }} />
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
        <Button type="primary" onClick={() => onSave({ images, cover, note, designer, department, address, area, decorateDate, brand, shop })}>　　发 布　　</Button>
      </InputRow>
    </Vbox>);
  }
}

PackUserRaw.propTypes = {
  serverPack: PropTypes.shape({// 服务器返回的包数据 不传则取默认值
    images: PropTypes.arrayOf(PropTypes.string), // 图片列表
    cover: PropTypes.string, // 封面
    note: PropTypes.string, // 用户备注
    designer: PropTypes.string, // 设计师
    department: PropTypes.string, // 所属单位
    address: PropTypes.string, // 详细地址
    area: PropTypes.number, // 面积
    decorateDate: PropTypes.number, // 装修日期
    brand: PropTypes.string, // 品牌
    shop: PropTypes.string, // 店面名称
  }), // 产品
  // 上传凭证
  uploadToken: PropTypes.string.isRequired,
  // 保存回调
  onSave: PropTypes.func.isRequired,
};
PackUserRaw.defaultProps = {// 默认值
  serverPack: {
    images: [], // 图片列表
    cover: '', // 封面
    note: '', // 用户备注
    designer: '', // 设计师
    department: '', // 所属单位
    address: '', // 详细地址
    area: 0, // 面积
    decorateDate: 0, // 装修日期
  },
};

export default PackUserRaw;
