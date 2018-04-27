/**
*
* LolaInput
*
*/

import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Layout } from '../Layout';


function LolaInput({ placeholder = '', type = 'text', error, value, addonAfter, onChange, ...otherProps }) {
  return (
    <Layout {...otherProps} >
      <Input placeholder={placeholder} type={type} value={value} onChange={(e) => onChange(e.target.value)} addonAfter={addonAfter} />
      {error && <Layout color="red">{error}</Layout>}
    </Layout>
  );
}

LolaInput.propTypes = {
  placeholder: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
  addonAfter: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default LolaInput;
