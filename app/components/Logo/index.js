/**
 *
 * Logo
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import imgLogo from './logo.png';

const Img = styled.img`
  width: ${(props) => props.width};
  cursor: pointer;
`;

function Logo(props) {
// eslint-disable-next-line react/prop-types
  const width = props.width;
  return (
    <Link to="/">
      <Img src={imgLogo} alt="e图库" width={width} />
    </Link>
  );
}

Logo.propTypes = {};

export default Logo;

