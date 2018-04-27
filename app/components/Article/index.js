/**
*
* Article
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { HorizontalLayout, Layout, VerticalLayout } from '../Layout';
import Image from '../Image';


const ArticleBox = styled(Link)`
    width: 100%;
    display: flex;
    border-top: 10px solid #F5F5F5;
`;
const Item = styled(Layout)`
  width: 90%;
  padding: 15px 0;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  flex-direction: ${(props) => props.displayMode ? 'column' : 'row-reverse'};
`;
const ItemImg = styled(HorizontalLayout)`
  width: ${(props) => props.displayMode ? '100%' : '30%'};
  margin-bottom: ${(props) => props.displayMode ? '10px' : '0px'};
  margin-left: ${(props) => props.displayMode ? '0' : '10px'};
`;
const ItemTitle = styled(HorizontalLayout)`
  width: 100%;
  margin: 6px 0;
  font-size:15px;
  line-height:21px;
  color: #000;
  text-align: left;
`;
const ItemDetail = styled.p`
  width: 100%;
  height:34px; 
  margin: 0;
  font-size:12px;
  color:rgba(155,155,155,1);
  line-height:17px;
  text-align: left;
  overflow: hidden;
`;
const Itemtext = styled(VerticalLayout)`
  flex: 1;
  width: 100%;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  
`;
function Article(props) {
  // console.log("Article",props);
  const images = Array.isArray(props.images) ? props.images.length > 0 ? props.images[0] : '' : '';
  return (
    <ArticleBox to={`/mobile/articlepage?id=${props.id}`}>
      <Item displayMode={props.displayMode === 1 ? true : false}>
        <ItemImg displayMode={props.displayMode === 1 ? true : false}>
          <Image src={images} width="100%" maxWidth="750px"></Image>
        </ItemImg>
        <Itemtext>
          <ItemTitle>{props.title}</ItemTitle>
          <ItemDetail>
            {props.describe}
          </ItemDetail>
        </Itemtext>
      </Item>
    </ArticleBox>

  );
}

Article.propTypes = {
  id: PropTypes.string,
  displayMode: PropTypes.number,
  title: PropTypes.string,
  describe: PropTypes.string,
  images: PropTypes.array,
};

export default Article;
