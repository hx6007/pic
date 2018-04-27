/**
 *
 * PackEdit
 *
 */

import React from 'react';
import { Button, Divider, Input, Modal, Radio, message, Switch } from 'antd';
import PropTypes from 'prop-types';
import { Hbox, Vbox } from '../Layout';
import { ProductSelector } from '../ProductSelector';
import InputRow from '../InputRow';
import ImageUploader from '../ImageUploader';
import PackModal from '../../components/PackModal/index';
import { TUKU_PACKS } from '../../components/ProductSelector/constants';
const { TextArea } = Input;
const confirm = Modal.confirm;
const { Group: RadioGroup } = Radio;

/**
 * 专题
 */
class PackArticle extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super();
    this.state = props.serverPack;
  }

  checkPackType(displayMode) {
    this.setState({ displayMode });
  }

  checkParams({ title, describe, images, products, html }) {
    if (title.length <= 0) {
      message.warn('专题名称必填');
    } else if (describe.length <= 0) {
      message.warn('专题摘要必填');
    } else if (images.length <= 0) {
      message.warn('至少上传一张图片');
    } else if (products.length <= 0) {
      message.warn('必须添加产品');
    } else if (html.length <= 0) {
      message.warn('专题详情必填');
    } else {
      return true;
    }
    return false;
  }

  render() {
    const { title, describe, cover, images, displayMode, video, vr, products, html = '', recorder, status = 1, visible } = this.state;
    const { uploadToken, onSave, onDelete } = this.props;
    return (<Vbox>
      <InputRow must title="专题名称">
        <Input value={title} onChange={(e) => this.setState({ title: e.target.value })} style={{ width: 435 }} />
      </InputRow>
      <InputRow must title="专题摘要">
        <TextArea value={describe} onChange={(e) => this.setState({ describe: e.target.value })} style={{ width: 435, height: 100 }} />
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
      <Divider style={{ marginTop: 50 }} />
      <InputRow must title="展示模式">
        <RadioGroup
          defaultValue={displayMode || 1}
          onChange={(e) => this.checkPackType(e.target.value)}
        >
          <Radio value={1}>大图模式</Radio>
          <Radio value={2}>小图模式</Radio>
        </RadioGroup>
      </InputRow>
      <Divider style={{ marginTop: 50 }} />
      <InputRow title="视频链接地址">
        <Input value={video} onChange={(e) => this.setState({ video: e.target.value })} style={{ width: 435 }} />
      </InputRow>
      <InputRow title="全景图地址">
        <Input value={vr} onChange={(e) => this.setState({ vr: e.target.value })} style={{ width: 435 }} />
      </InputRow>
      <InputRow title="产品清单" must stretch>
        <ProductSelector
          from={TUKU_PACKS}
          defultProducts={products}
          onChange={(list) => this.setState({ products: list })}
        />
      </InputRow>
      <Divider style={{ marginTop: 50 }} />
      <InputRow title="专题详情" must stretch>
        <Input value={html} onChange={(e) => this.setState({ html: e.target.value })} style={{ width: 435 }} />
      </InputRow>
      <Divider style={{ marginTop: 50 }} />
      <InputRow title="是否发布">
        <Switch
          checked={status === 2}
          onChange={(value) => this.setState({ status: value ? 2 : 1 })}
        />
      </InputRow>
      <Divider style={{ marginTop: 50 }} />
      <InputRow>
        <Hbox>
          <Button
            style={{ margin: '0 12px' }}
            type="primary"
            onClick={() => {
              if (this.checkParams({ title, describe, images, products, html })) {
                onSave({ title, describe, images, displayMode, video, vr, products, html, recorder, status });
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
      </InputRow>
      <PackModal
        visible={visible}
        onClose={() => this.setState({ visible: false })}
        onConfirm={(checkMessage) => {
          message.warn('todo', checkMessage);
        }}
      />
    </Vbox>);
  }
}

PackArticle.propTypes = {
  serverPack: PropTypes.shape({// 服务器返回的包数据 不传则取默认值
    title: PropTypes.string, // 文章标题
    describe: PropTypes.string, // 文章简介
    cover: PropTypes.string, // 文章简介
    images: PropTypes.arrayOf(PropTypes.string), // 图片列表
    displayMode: PropTypes.number, // 列表展示模式 1 大图模式 2 小图模式
    video: PropTypes.string, // 视频链接
    vr: PropTypes.string, // 全景图链接
    products: PropTypes.arrayOf(PropTypes.shape({  // 产品列表
      id: PropTypes.any.isRequired, // 唯一ID
      image: PropTypes.any, // 图片
      no: PropTypes.any, // 产品编号
      level: PropTypes.any, // 等级
      series: PropTypes.any, // 系列名称
      brand: PropTypes.any, // 品牌
      spec: PropTypes.any, // 规格
    })),
    html: PropTypes.string, // 文章详情
    recorder: PropTypes.string, // 录入人 最后的修改者
    status: PropTypes.number, // 状态 1 待发布 2 已发布
  }), // 专题
  // 上传凭证
  uploadToken: PropTypes.string.isRequired,
  // 保存回调
  onSave: PropTypes.func.isRequired,
  // 删除回调
  onDelete: PropTypes.func.isRequired,
};
PackArticle.defaultProps = {// 默认值
  serverPack: {
    title: '', // 文章标题
    describe: '', // 文章简介
    cover: '', // 封面图
    images: [], // 图片列表
    displayMode: 1, // 列表展示模式 1 大图模式 2 小图模式
    video: '', // 视频链接
    vr: '', // 全景图链接
    products: [], // 产品清单
    html: '', // 文章详情
    recorder: '', // 录入人 最后的修改者
    status: 1, // 状态 1 待发布 2 已发布
  },
};

export default PackArticle;
