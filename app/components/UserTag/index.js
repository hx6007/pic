/* eslint-disable react/prop-types */
/**
*
* UserTag
*
*/

import React from 'react';
import styled from 'styled-components';
import { HorizontalLayout, VerticalLayout } from '../Layout';
import imgPortrait from './designer.png';
import Div from '../Div';

const Img = styled.img`
  cursor: pointer;
  border-radius: 25px; 
`;

function UserTag(props) {
  return (
    <HorizontalLayout {...props}>
      <Img src={imgPortrait} alt="" width={50} />
      <VerticalLayout margin="0 0 0 15px">
        <Div>{props.designer}</Div>
        <Div>{props.department}</Div>
      </VerticalLayout>
    </HorizontalLayout>
  );
}

UserTag.propTypes = {

};

export default UserTag;
