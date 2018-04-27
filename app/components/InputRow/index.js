/* eslint-disable react/prop-types */
/**
*
* InputRow
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Hbox, Vbox } from '../Layout';

// import styled from 'styled-components';

/**
 * 自适应的表单布局
 * @param props
 * @returns {*}
 * @constructor
 */
function InputRow(props) {
  const { must = false, title = '', stretch, children, ...otherProps } = props;
  return (
    <Hbox alignItems="flex-start" margin=" 15px 0 0 0" {...otherProps} >
      <Hbox flex="1" justify="flex-end" margin="6px 15px 0 0" color="#333">
        {title}{must && <Hbox color="red">*</Hbox>}{title && '：'}
      </Hbox>
      <Vbox flex="5" alignItems={stretch ? undefined : 'flex-start'}>
        {children}
      </Vbox>
    </Hbox>);
}

InputRow.propTypes = {
  must: PropTypes.bool,
  title: PropTypes.string,
  stretch: PropTypes.bool,
};

export default InputRow;
