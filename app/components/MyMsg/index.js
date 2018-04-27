/**
*
* MyMsg
*
*/

import React from 'react';
import { compose } from 'redux';
import styled from 'styled-components';
import Layout from 'antd/es/layout/layout';
import connect from 'react-redux/es/connect/connect';
import { Input, Radio, Button, message } from 'antd';
import { HorizontalLayout, VerticalLayout } from '../Layout/index';
const RadioGroup = Radio.Group;

const FootprintList = styled(HorizontalLayout)`
  
  justify-content: flex-start;
  flex-wrap:wrap;
  flex-direction:column;
`;
const InputBox = styled(HorizontalLayout)`
  width:100%;
  height:42px;
  margin-bottom:20px;
  font-size:0;
  input{
    width:280px;
    height: 42px;
    font-size:14px;
    color:#000;
    margin-right:10px;
  }
  &.has-error input{
    border-color: #f5222d;
  }
  
`;
const Label = styled.div`
  width:100px;
  height:42px;
  line-height:42px;
  margin-right:10px;
  font-size:14px;
  color:#000;
  text-align:right;
`;
const Tip = styled.div`
  height:42px;
  line-height:42px;
  font-size:13px;
  color:#999;
`;

const success = (msg) => {
  message.success(msg);
};
export class MyMsg extends React.Component {
  constructor() {
    super();
    this.state = {
      gender: 1,
      oldPsd: '',
      newPsd: '',
      newPsd2: '',
    };
  }
  onChangeGender = (e) => {
    this.setState({
      gender: e.target.value,
    });
  };
  getOldP(pw) {
    this.setState({ oldPsd: pw });
  }
  getNewP(pw) {
    this.setState({ newPsd: pw });
  }
  getNewPw(pw) {
    this.setState({ newPsd2: pw });
  }
  save = () => {
    success('修改成功');
    // if (this.state.oldPsd.length !== 0) {
    //   console.log('需要修改密码');
    //   console.log(this.state.newPsd);
    //   console.log(this.state.newPsd2);
    // }
    // console.log(this.state.gender);
    // console.log(this.state.oldPsd);
  };

  render() {
    return (
      <VerticalLayout background="#fff" flex="1" minHeight="575px" padding="20px 0">
        <VerticalLayout width="93%" margin="0 auto">
          <HorizontalLayout width="100%" padding="10px 0" fontSize="14px" color="#000" justify="space-between">
            <Layout>我的资料</Layout>
          </HorizontalLayout>
          <FootprintList width="100%" borderTop="1px solid #f5f5f5" padding="20px 0 0 0">
            <InputBox >
              <Label>昵称</Label>
              <Input placeholder="请输入昵称" />
              <Tip>设置后可使用昵称做为账户登录</Tip>
            </InputBox>
            <InputBox>
              <Label>性别</Label>
              <RadioGroup onChange={this.onChangeGender} value={this.state.gender}>
                <Radio value={1}>先生</Radio>
                <Radio value={2}>女士</Radio>
              </RadioGroup>
            </InputBox>
            <InputBox>
              <Label>手机</Label>
              <Input placeholder="请输入手机号码" />
            </InputBox>
          </FootprintList>
          <FootprintList width="100%" borderTop="1px solid #f5f5f5" padding="20px 0 0 0">
            <InputBox>
              <Label>旧密码</Label>
              <Input placeholder="请输入昵称" value={this.state.oldPsd} onChange={(e) => { this.getOldP(e.target.value); }} />
              <Tip>如不修改密码,请勿填写下列项</Tip>
            </InputBox>
            <InputBox>
              <Label>新密码</Label>
              <Input type="password" placeholder="请输入昵称" value={this.state.newPsd} onChange={(e) => { this.getNewP(e.target.value); }} />
              <Tip>新密码长度必须大于6</Tip>
            </InputBox>
            <InputBox>
              <Label>确认密码</Label>
              <Input type="password" placeholder="请输入昵称" value={this.state.newPsd2} onChange={(e) => { this.getNewPw(e.target.value); }} />
            </InputBox>
            <InputBox>
              <Label></Label>
              <Button type="primary" onClick={() => { this.save(); }}>保存</Button>
            </InputBox>
          </FootprintList>
        </VerticalLayout>
      </VerticalLayout>
    );
  }
}

MyMsg.propTypes = {

};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(MyMsg);
