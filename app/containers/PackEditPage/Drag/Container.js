import React, { Component } from 'react'
import update from 'immutability-helper'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Card from './Card'
import {HorizontalLayout} from "../../../components/Layout";


@DragDropContext(HTML5Backend)
export default class Container extends Component {
	constructor(props) {
		super(props);
		this.moveCard = this.moveCard.bind(this)
	}


	moveCard(dragIndex, hoverIndex) {
		const { uploadList,onChangeUploadList } = this.props;
		const dragCard = uploadList[dragIndex];
    const newUploadList=update(uploadList, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
      });
    onChangeUploadList(newUploadList)
	}

	deleteItem=(index)=>{
    const { uploadList,onChangeUploadList } = this.props;
    uploadList.splice(index,1);
    onChangeUploadList(uploadList);
  };


	render() {
		const { uploadList,cover,onUpdateCover } = this.props;
    return (
			<HorizontalLayout flexWrap="wrap" margin='-6px'>
				{uploadList.map((card, i) => (
					<Card
						key={card.uid}
						index={i}
						id={card.uid}
            name={card.name}
            onUpdateCover={onUpdateCover}
            onDelete={this.deleteItem}
            isCover={card.url&&card.url===cover}
            status={card.status}
            image={card.url||''}
						moveCard={this.moveCard}
            openLightbox={(i,e) => this.props.openLightbox(i, e)}
					/>
				))}
			</HorizontalLayout>
		)
	}
}
