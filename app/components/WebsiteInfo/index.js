/**
*
* WebsiteInfo
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { VerticalLayout } from '../Layout';

// import styled from 'styled-components';

function WebsiteInfo(props) {
  // console.log("props.align---->",props.align);
  const align = props.align === 'center' ? 'flex-start' : 'center';
  return (
    <VerticalLayout alignItems={align} justify={align} height="60px" fontSize="12px">
      <span>© 2013-2017 佛山市方圆陶瓷有限公司 版权所有</span>
      <span>粤ICP备12001574号-2</span>
    </VerticalLayout>
  );
}
WebsiteInfo.propTypes = {
  align: PropTypes.oneOf(['left', 'center']),
};
export default WebsiteInfo;
