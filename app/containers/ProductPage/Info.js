/**
 *
 * ProductItem
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {VerticalLayout} from "../../components/Layout";

/**
 * 产品详情内容
 * @param image
 * @param title
 * @returns {*}
 * @constructor
 */
const Info = ({image,title}) => {
  return (
    <VerticalLayout>
      <img src={image} width='70%' alt={title}/>
      <h2>产品信息表</h2>
    </VerticalLayout>
  );
};

Info.propTypes = {};

export default Info;

