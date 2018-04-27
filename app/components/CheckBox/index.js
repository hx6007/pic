/**
*
* CheckBox
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import { Vbox, Hbox } from '../Layout/index';
const { Group } = Checkbox;

/**
 * 带错误提示的复选框列表 可定制最大和最小选中项数量
 */
class CheckBox extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super();
    this.state = { checkedList: props.defaultValue };
  }
  render() {
    const { array = [], onChanged = () => {}, min = 0, max = array.length } = this.props;
    const { checkedList } = this.state;
    return (
      <Vbox>
        <Group
          options={array}
          value={checkedList}
          onChange={(value) => {
            this.setState({ checkedList: value });
            onChanged(value);
          }}
          style={{ marginTop: 5 }}
        />
        {checkedList.length > max && <Hbox color="red">最多选{max}项</Hbox>}
        {checkedList.length < min && <Hbox color="red">至少选{min}项</Hbox>}
      </Vbox>
    );
  }
}

CheckBox.propTypes = {
  array: PropTypes.arrayOf(PropTypes.string.isRequired),
  onChanged: PropTypes.func,
  defaultValue: PropTypes.array,
  min: PropTypes.number,
  max: PropTypes.number,
};
CheckBox.defaultProps = {
  defaultValue: [],
};

export default CheckBox;
