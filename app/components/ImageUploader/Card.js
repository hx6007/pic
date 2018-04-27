import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import styled from 'styled-components';
import { HorizontalLayout, VerticalLayout } from '../Layout/index';
import { Spin } from 'antd';
import parseImgUrl from '../../utils/imgUrlParse';


const CenterInfo = styled.div`
      position: absolute;
      left:50%;
      top:50%;
      transform: translate(-50%, -50%);
      color: #333;

`;

const Tag = styled.span`
      position: absolute;
      left:0;
      top:8px;
      color: #333;
      padding: 0 5px;
      border-radius: 0 5px 0 0 ;
      background: rgba(255,255,255,.5);

`;
const MyCard = styled(VerticalLayout)`
      margin: 6px;
      border-radius: 3px;
      overflow: hidden;
      cursor: move;
      opacity:${(p) => p.opacity || '0'};
      background-image:${(p) => `url(${p.src})` || 'none'} ;
      background-size: cover;
    
      position: relative;
      align-items: stretch;
      justify-content: flex-end;
      #uploadItem{
        opacity:0;
      }
      &:visited,&:hover,&:active{
        #uploadItem{
        opacity:1;
        }
      }
`;


const Button = styled(HorizontalLayout)`
      cursor: pointer;
      padding: 5px;
      &:visited,&:hover,&:active{
        color: white;
      }
`;

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

@DropTarget(ItemTypes.CARD, cardTarget, (connect) => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class Card extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    id: PropTypes.any.isRequired,
    image: PropTypes.string.isRequired,
    status: PropTypes.string,
    name: PropTypes.string,
    onClick: PropTypes.func,
    onUpdateCover: PropTypes.func,
    onDelete: PropTypes.func,
    isCover: PropTypes.bool,
  };

  render() {
    const {
      image,
      name,
      index,
      status,
      isCover,
      onUpdateCover, onDelete,
      isDragging,
      connectDragSource,
      connectDropTarget,
      onClick,
    } = this.props;
    const opacity = isDragging ? 0 : 1;
    const imageUrl = parseImgUrl(image, 170, 140);
    return connectDragSource(
      connectDropTarget(<div>
        <MyCard
          opacity={opacity}
          onClick={(e) => {
            e.preventDefault();
            onClick(image);
          }}
          width="170px"
          height="140px"
          src={imageUrl}
          title={name}
        >
          {isCover && <Tag>封面图</Tag>}
          {status === 'uploading' && <CenterInfo><Spin /></CenterInfo>}
          {status === 'error' && <CenterInfo>上传失败</CenterInfo>}
          {status === 'done' && <HorizontalLayout
            id="uploadItem"
            fontSize="14px"
            background="rgba(0,0,0,.3)"
            color="#ddd"
            onClick={(e) => e.stopPropagation()}
          >
            {!isCover && <Button title={'设为封面'} onClick={() => { onUpdateCover(image); }}>设为封面</Button>}
            <HorizontalLayout flex="1" />
            <Button
              title={'删除'}
              onClick={() => {
                if (isCover)onUpdateCover('');
                onDelete(index);
              }}
            >删除</Button>
          </HorizontalLayout>}

        </MyCard>
      </div>),
    );
  }

}
