/**
*
* AdminBread
*
*/

import React from 'react';
import { HorizontalLayout } from '../Layout';
// import styled from 'styled-components';


// eslint-disable-next-line react/prop-types
function AdminBread({ list }) {
  return (
    <HorizontalLayout color="#888">
      {list.join(' / ')}
    </HorizontalLayout>
  );
}

AdminBread.propTypes = {

};

export default AdminBread;
