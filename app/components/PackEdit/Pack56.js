/**
*
* PackEdit
*
*/

import React from 'react';
import { Button, Divider, Switch } from 'antd';
import PropTypes from 'prop-types';
import { Vbox } from '../Layout';
import { ProductSelector } from '../ProductSelector';
import InputRow from '../InputRow';
import ImageUploader from '../ImageUploader';
/**
 * 直板及地面图管理
 */
class Pack56 extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super();
    this.state = props.serverPack;
  }
  render() {
    const { products, images, cover, tags, status } = this.state;
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
      <Divider style={{ marginTop: 30 }} />
      <InputRow title="产品编号" must stretch margin="30px 0 0 0">
        <ProductSelector
          onChange={(list) => this.setState({ products: list })}
        />
      </InputRow>
      <InputRow title="是否发布">
        <Switch style={{ marginTop: 6 }} checked={status === 2} onChange={(value) => this.setState({ status: value ? 2 : 1 })} />
      </InputRow>
      <Divider style={{ marginTop: 50 }} />
      <InputRow>
        <Button type="primary" onClick={() => onSave({ products, images, cover, tags, status })}>　　保 存　　</Button>
      </InputRow>
    </Vbox>);
  }
}

Pack56.propTypes = {
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
    tags: PropTypes.arrayOf(PropTypes.shape({ // 标签列表
      id: PropTypes.any.isRequired, // 唯一ID
      name: PropTypes.any.isRequired, // 标签名
    })),
    status: PropTypes.number, // 发布状态
  }), // 产品
  // 上传凭证
  uploadToken: PropTypes.string.isRequired,
  // 保存回调
  onSave: PropTypes.func.isRequired,
};
Pack56.defaultProps = {// 默认值
  serverPack: {
    products: [], // 产品列表
    images: [], // 图片列表
    cover: '', // 封面
    status: 2, // 发布状态
  },
};

export default Pack56;
