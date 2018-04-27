/**
 *
 * PackEdit
 *
 */

import React from 'react';
import { Button, Divider, Input, DatePicker, Modal, Radio, message } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Hbox, Vbox } from '../Layout';
import { ProductSelector } from '../ProductSelector';
import InputRow from '../InputRow';
import ImageUploader from '../ImageUploader';
import CheckBox from '../CheckBox';
import { SPACES, STYLES, SITES } from '../../utils/universalConst';
import PackModal from '../../components/PackModal/index';
const { MonthPicker } = DatePicker;
const { TextArea } = Input;
const confirm = Modal.confirm;
const { Group: RadioGroup } = Radio;

/**
 * 二审管理
 */
class PackCheck2 extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super();
    this.state = props.serverPack;
  }

  checkPackType(type) {
    this.setState({ type });
  }

  checkParams({ type, products, images, spaces, styles, sites }) {
    if (![2, 3, 4, 6, 7, 8, 9, 10].includes(type)) {
      message.warn('审核通过发布到 必选');
    } else if (images.length <= 0) {
      message.warn('至少上传一张图片');
    } else if ([2, 3, 4, 6, 7, 8].includes(type) && spaces.length !== 1) {
      message.warn('空间属性必选, 只选一个');
    } else if (styles.length <= 0 || styles.length > 3) {
      message.warn('风格属性必选, 且不超过三个');
    } else if (sites.length <= 0 || sites.length > 2) {
      message.warn('场所属性必选, 且不超过两个');
    } else if (products.length <= 0) {
      message.warn('必须添加产品');
    } else {
      return true;
    }
    return false;
  }

  render() {
    const { products, images, cover, note, spaces, styles, sites, designer, department, shop, brand, address, area, decorateDate, status, type = 101, visible } = this.state;
    const { uploadToken, onSave, onDelete, onRefuse } = this.props;
    return (<Vbox>
      <InputRow must title="审核通过发布到">
        <RadioGroup
          defaultValue={type || 3}
          onChange={(e) => this.checkPackType(e.target.value)}
        >
          <Radio value={3}>效果图</Radio>
          <Radio value={7}>装修效果图</Radio>
          <Radio value={9}>整屋-效果图</Radio>
          <Radio value={10}>整屋-实景图</Radio>
          <Radio value={2}>实景图</Radio>
          <Radio value={4}>样板间</Radio>
          <Radio value={8}>平面布局图</Radio>
          {/* <Radio value={5}>直板图</Radio> */}
          {/* <Radio value={6}>地面图</Radio> */}
        </RadioGroup>
      </InputRow>
      <InputRow title="图片" must stretch>
        <ImageUploader
          uploadToken={uploadToken}
          images={images}
          onImagesChanged={(list) => this.setState({ images: list })}
          cover={cover}
          onCoverChanged={(img) => this.setState({ cover: img })}
        />
      </InputRow>
      {[2, 3, 4, 7, 8].includes(type) && (
        <InputRow title="空间属性" must stretch>
          <CheckBox min={1} max={1} array={SPACES} defaultValue={spaces} onChanged={(list) => this.setState({ spaces: list })} />
        </InputRow>
      )}
      {[2, 3, 4, 7, 8, 9, 10].includes(type) && (
        <InputRow title="风格属性" must stretch>
          <CheckBox min={1} max={3} array={STYLES} defaultValue={styles} onChanged={(list) => this.setState({ styles: list })} />
        </InputRow>
      )}
      {[2, 3, 4, 7, 8, 9, 10].includes(type) && (
        <InputRow title="场所属性" must stretch>
          <CheckBox min={1} max={2} array={SITES} defaultValue={sites} onChanged={(list) => this.setState({ sites: list })} />
        </InputRow>
      )}
      <Divider style={{ marginTop: 50 }} />
      <InputRow title="产品备注">
        <TextArea disabled value={note} style={{ width: 435, height: 100 }} />
      </InputRow>
      <InputRow title="产品编号" must stretch>
        <ProductSelector
          defultProducts={products}
          onChange={(list) => this.setState({ products: list })}
        />
      </InputRow>
      <Divider style={{ marginTop: 50 }} />
      {[2, 3, 4, 7, 8, 9, 10].includes(type) && (
        <InputRow title="设计师">
          <Input value={designer} onChange={(e) => this.setState({ designer: e.target.value })} style={{ width: 200 }} />
        </InputRow>
      )}
      {[2, 3, 4, 7, 8, 9, 10].includes(type) && (
        <InputRow title="所属单位">
          <Input value={department} onChange={(e) => this.setState({ department: e.target.value })} style={{ width: 200 }} />
        </InputRow>
      )}
      {[4, 7, 8, 9, 10].includes(type) && (
        <InputRow title="店面名称">
          <Input value={shop} onChange={(e) => this.setState({ shop: e.target.value })} style={{ width: 200 }} />
        </InputRow>
      )}
      {[7, 8, 9, 10].includes(type) && (
        <InputRow title="品牌">
          <Input value={brand} onChange={(e) => this.setState({ brand: e.target.value })} style={{ width: 200 }} />
        </InputRow>
      )}
      {[2, 4, 7, 8, 9, 10].includes(type) && (
        <InputRow title="详细地址">
          <Input value={address} onChange={(e) => this.setState({ address: e.target.value })} style={{ width: 435 }} />
        </InputRow>
      )}
      {[7, 8, 9, 10].includes(type) && (
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
      )}
      {![5, 6, 101].includes(type) && (
        <Divider style={{ marginTop: 50 }} />
      )}
      <InputRow>
        {status === 1 && ( // 待发布
          <Hbox>
            <Button
              style={{ margin: '0 12px' }}
              type="primary"
              onClick={() => {
                if (this.checkParams({ type, products, images, spaces, styles, sites })) {
                  onSave({ type, products, images, cover, spaces, styles, sites, note, designer, department, shop, brand, address, area, decorateDate, status: 2 });
                }
              }}
            >发布</Button>
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
          </Hbox>
        )}
        {status === 4 && ( // 待二审, 二审通过到已通过(status=2)
          <Hbox>
            <Button
              type="primary"
              onClick={() => {
                if (this.checkParams({ type, products, images, spaces, styles, sites })) {
                  onSave({ type, products, images, cover, spaces, styles, sites, note, designer, department, shop, brand, address, area, decorateDate, status: 2 });
                }
              }}
            >二审通过</Button>
            <Button
              style={{ margin: '0 12px' }}
              onClick={() => this.setState({ visible: true })}
            >不通过</Button>
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
          </Hbox>
        )}
        {status === 5 && ( // 审核不通过, 保存到一审(status=3)
          <Hbox>
            <Button
              style={{ margin: '0 12px' }}
              type="primary"
              onClick={() => {
                if (this.checkParams({ type, products, images, spaces, styles, sites })) {
                  onSave({ type, products, images, cover, spaces, styles, sites, note, designer, department, shop, brand, address, area, decorateDate, status: 3 });
                }
              }}
            >保存(到一审)</Button>
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
          </Hbox>
        )}
        {status === 2 && ( // 已通过, 保存(仅是修改这张单而已, 不改变状态)
          <Hbox>
            <Button
              style={{ margin: '0 12px' }}
              type="primary"
              onClick={() => {
                if (this.checkParams({ type, products, images, spaces, styles, sites })) {
                  onSave({ type, products, images, cover, spaces, styles, sites, note, designer, department, shop, brand, address, area, decorateDate, status: 2 });
                }
              }}
            >保存</Button>
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
          </Hbox>
        )}
      </InputRow>
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
    </Vbox>);
  }
}

PackCheck2.propTypes = {
  serverPack: PropTypes.shape({// 服务器返回的包数据 不传则取默认值
    type: PropTypes.number, // 审核通过发布到
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
PackCheck2.defaultProps = {// 默认值
  serverPack: {
    type: 1, // 审核通过发布到
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

export default PackCheck2;
