/**
*
* Modal
*
*/

import React from 'react';
import { Button, Input, Modal, Tag } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Hbox } from '../Layout';
import { HorizontalLayout } from '../../components/Layout/index';

const { TextArea } = Input;
const tagDiv = styled(HorizontalLayout) ``;

class PackModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    textAreaValue: '',
  };
  changeValue = (value) => {
    this.setState({
      textAreaValue: value,
    });
  };
  render() {
    const { textAreaValue } = this.state;
    const { visible, onClose, onConfirm } = this.props;
    return (
      <Modal
        title="审核不通过原因"
        visible={visible}
        onCancel={onClose}
        footer={null}
        destroyOnClose
      >
        <tagDiv style={{ display: 'flex', paddingBottom: 24 }}>
          <Tag style={{ color: 'volcano', flex: 1, textAlign: 'center' }} onClick={() => this.changeValue('不符合图片')}>不符合图片</Tag>
          <Tag style={{ color: 'volcano', flex: 1, textAlign: 'center' }} onClick={() => this.changeValue('图片侵权')}>图片侵权</Tag>
          <Tag style={{ color: 'volcano', flex: 1, textAlign: 'center' }} onClick={() => this.changeValue('涉黄涉爆等违法图片')}>涉黄涉爆等违法图片</Tag>
        </tagDiv>
        其他:
        <TextArea
          onChange={(e) => this.setState({ textAreaValue: e.target.value })}
          rows={4}
          style={{ width: '100%', background: '#E6E6E6', border: 'none', marginTop: 7, marginBottom: 20 }}
          placeholder="详细描述下问题"
          value={textAreaValue}
        />
        <Hbox justify="flex-end">
          <Button
            style={{ width: '188px', background: '#397FFB', borderRadius: 2 }}
            type="primary"
            onClick={() => {
              onConfirm(textAreaValue);
            }}
          >确定 审核不通过</Button>
        </Hbox>
      </Modal>
    );
  }
}

PackModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
PackModal.defaultProps = {// 默认值
  visible: false,
};

export default PackModal;
