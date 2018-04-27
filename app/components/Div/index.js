/**
*
* Div
*
*/

import styled from 'styled-components';
import { commonPropTypes, Layout } from '../Layout';

/**
 *  扩展的DIV容器 属性参看↑commonPropTypes ↑
 * @returns {*} 容器组件
 * @constructor
 */
const Div = styled(Layout)`
  display: ${(p) => p.display || 'block'};
`;

Div.propTypes = commonPropTypes;

export default Div;
