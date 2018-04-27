/* eslint-disable react/prop-types */
/**
*
* PageTitle
*
*/

import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
  font-size: 24px;
  color: #333;
`;

function PageTitle(props) {
  return (
    <Title>
      {props.children}
    </Title>
  );
}

PageTitle.propTypes = {

};

export default PageTitle;
