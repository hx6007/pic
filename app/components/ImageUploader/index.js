/**
*
* ImageUploader
*
*/

import React from 'react';
import { Button, Icon, Upload } from 'antd';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Lightbox from 'react-images';
import Card from './Card';
import { SERVER } from '../../utils/universalConst';
import { Hbox, Vbox } from '../Layout';
// import styled from 'styled-components';

/**
 * 图片上传器
 */
@DragDropContext(HTML5Backend)
class ImageUploader extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super();
    function parseToUploadList(images) {
      return images.map((item) => ({
        uid: item,
        name: '',
        url: item,
        status: 'done',
      }));
    }
    this.state = {
      uploadList: parseToUploadList(props.images || []),
      lightboxIsOpen: false, // 是否显示大图
      currentImage: 0, // 当前展示大图下标
    };
    this.moveCard = this.moveCard.bind(this);
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextState.uploadList !== this.state.uploadList) {
      const { onImagesChanged = () => {} } = this.props;
      const images = nextState.uploadList
      .filter((item) => item.status === 'done')
      .map((item) => item.url);
      onImagesChanged(images);
    }
  }
  /**
   * 上传监听
   * @param fileList
   */
  onUploaderChanged = ({ fileList }) => {
    const uploadList = fileList.map((item) => {
      if (!item.originFileObj || item.url) return item;
      const url = item.status === 'done' && SERVER.QND + item.response.hash;
      return {
        ...item,
        url,
      };
    });
    this.setState({ uploadList });
  };
  moveCard=(dragIndex, hoverIndex) => {
    const { uploadList } = this.state;
    const listCopy = uploadList.concat();
    listCopy.splice(dragIndex, 1);
    listCopy.splice(hoverIndex, 0, uploadList[dragIndex]);
    this.setState({ uploadList: listCopy });
  };
  deleteItem=(index) => {
    const { uploadList } = this.state;
    const listCopy = uploadList.concat();
    listCopy.splice(index, 1);
    this.setState({ uploadList: listCopy });
  };
  openLightbox=(index) => this.setState({ currentImage: index, lightboxIsOpen: true });
  closeLightbox=() => this.setState({ lightboxIsOpen: false });
  goImage=(index) => this.setState({ currentImage: index });
  render() {
    const { uploadToken, cover, onCoverChanged = () => {} } = this.props;
    const { uploadList, lightboxIsOpen, currentImage } = this.state;
    return (
      <Vbox>
        <Hbox margin="0 0 15px 0">
          <Upload
            action={SERVER.QNU}
            onChange={this.onUploaderChanged}
            data={{ token: uploadToken }}
            fileList={uploadList}
            showUploadList={false}
            multiple
            accept="image/*"
          >
            <Button><Icon type="upload" />选择文件</Button>
          </Upload>
          <Hbox color="#888">（至少上传一张，建议图片宽度大小为1200px，高度不限）</Hbox>
        </Hbox>
        <Hbox flexWrap="wrap" margin="-6px">
          {uploadList.map((card, i) => (
            <Card
              key={card.uid}
              index={i}
              id={card.uid}
              name={card.name}
              onUpdateCover={onCoverChanged}
              onDelete={this.deleteItem}
              isCover={card.url && card.url === cover}
              status={card.status}
              image={card.url || ''}
              moveCard={this.moveCard}
              onClick={() => this.openLightbox(i)}
            />
          ))}
        </Hbox>
        <Lightbox
          currentImage={currentImage}
          images={uploadList.map((item) => ({ src: item.url || '' }))}
          isOpen={lightboxIsOpen}
          onClose={this.closeLightbox}
          onClickImage={this.closeLightbox}
          onClickNext={() => this.goImage(currentImage + 1)}
          onClickPrev={() => this.goImage(currentImage - 1)}
          onClickThumbnail={(index) => this.goImage(index)}
          spinnerColor={'white'}
          showThumbnails
        />
      </Vbox>
    );
  }
}

ImageUploader.propTypes = {
  uploadToken: PropTypes.string.isRequired, // 上传凭据
  cover: PropTypes.string, // 封面
  onCoverChanged: PropTypes.func, // 封面改变回调
  images: PropTypes.arrayOf(PropTypes.string), // 初始图片列表
  onImagesChanged: PropTypes.func, // 图片列表改变回调
};

export default ImageUploader;
