/**
*
* PageFooter
*
*/

import React from 'react';
import styled from 'styled-components';
import { HorizontalLayout, Body } from '../Layout';
import WebsiteInfo from '../WebsiteInfo';


const Footer = styled(Body)`
  width: 100%;
  background: #ffffff;
  border-top: 1px solid #eeeeee;
`;


function PageFooter() {
  return (
    <Footer>
      <HorizontalLayout justify="center" alginItems="center">
        <WebsiteInfo />
      </HorizontalLayout>
    </Footer>
  );
}

PageFooter.propTypes = {

};

export default PageFooter;
