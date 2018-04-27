/* eslint-disable react/prop-types,react/jsx-max-props-per-line */
/**
 *
 * Logo
 *
 */

import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const TuLink = styled(NavLink)`
display: flex;
margin-bottom:15px;
justify-content: center;
color: #737373;
text-decoration: none;
height: 36px;
font-size:14px;
border-left:5px solid #fff;
box-sizing: border-box;
align-items: center;
text-decoration: none;
   i{
   font-size: 16px;
   margin-right: 5px;
   }
   &:hover,&:focus,&:active,&:visited {
      text-decoration: none;
  }
`;


function MenuLink(props) {
  const to = props.to || '#';
  return (
    <TuLink
      exact to={to} activeStyle={{
        fontWeight: 'bold',
        color: 'rgb(62,130,247)',
        borderLeft: '5px solid rgb(62,130,247)',
      }}
    >
      {props.children}
    </TuLink>
  );
}

MenuLink.propTypes = {};

export default MenuLink;

