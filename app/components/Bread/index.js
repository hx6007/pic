/* eslint-disable react/no-unescaped-entities */
/**
*
* Bread
*
*/

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HorizontalLayout } from '../Layout';

const Piece = styled(Link)``;
const LastPiece = styled.span``;
const Span = styled.div`
  display: inline-block;
  margin: 0 8px;
`;

// eslint-disable-next-line react/prop-types
function Bread({ first, second, third }) {
  return (
    <HorizontalLayout fontSize="12px" margin="20px 0">
      当前位置：
      <Piece to="/">E图库</Piece> <Span> > </Span>
      {second ? <Piece to={`/products?type=${first}`}>{ second }</Piece> : ''}
      {first === 1 ? <LastPiece> <Span> > </Span>{third}</LastPiece> : ''}
      {first === 0 ? <LastPiece>会员中心</LastPiece> : ''}
    </HorizontalLayout>
  );
}

Bread.propTypes = {

};

export default Bread;
