/* eslint-disable react/prop-types */
/**
 *
 * 登录表单
 *
 */

import React from 'react';
import styled from 'styled-components';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

const MainDiv = styled.div`
  width: 322px;
  .ant-input{
    height: 42px;
  }
  .login-form-button {
    width: 100%;
    height: 42px;
  }
  .ant-input::-webkit-input-placeholder{
    color: rgba(39,11,11,0.95);
  }
`;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values.username, values.password);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <MainDiv>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('username', {
              // initialValue:'测试客户',
              rules: [{ required: true, message: '* 请输入用户名!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.75)' }} />} placeholder="用户名/手机" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              // initialValue:'123456',
              rules: [{ required: true, message: '* 请输入密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.75)' }} />} type="password" placeholder="密码" />
            )}
          </FormItem>
          <FormItem>
            {/* {getFieldDecorator('remember', {*/}
            {/* valuePropName: 'checked',*/}
            {/* initialValue: true,*/}
            {/* })(*/}
            {/* <Checkbox>自动登录</Checkbox>*/}
            {/* )}*/}
            {/* <a className="login-form-forgot" href="">忘记密码？</a>*/}
            <Button type="primary" loading={this.props.loading} htmlType="submit" className="login-form-button" >
              登录
            </Button>
          </FormItem>
        </Form>
      </MainDiv>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
