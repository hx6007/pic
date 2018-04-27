/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import styled from 'styled-components';

const MyDiv = styled.div`
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #F8F8F8;
`

const BodyDiv = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  color: #FF6666;
  align-self: center;
  font-weight: bold;
  font-size: 2em;
  margin-top: 60px;
`


const NotH = styled.h1`
  width: 150px;
  height: 150px;
  border: #FF6666 solid 3px;
  border-radius: 50%;
  padding: 20px;
  text-shadow: 2px 20px 15px #CCCCCC;
`

const SorrySpan = styled.span`
  align-self: flex-end;
`

const BigText = styled.div`
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
`

const Ul = styled.ul`
  color: darkgrey;
  font-size: 20px;
`

const Li = styled.li`
  color: #CCCCCC;
  font-size: 20px;
  font-weight: lighter;
`

const BackButton = styled.button`
  margin: 0 auto;
  color: #0099CC;
  outline: none;
  cursor: pointer;
`

const CheckDiv = styled.div`
  border: darkgrey solid 1px;
  box-shadow: 2px 20px 15px #CCCCCC;
`

export default class NotFound extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  toHomePage() {
    this.props.history.push('/')
  }

  render() {
    return (
      <MyDiv>
        <BodyDiv>
          <BigText>
            <NotH>404</NotH>
            <SorrySpan>很抱歉,你所查看的页面已删除或不存在！</SorrySpan>
          </BigText>
          <CheckDiv>
            <Ul>
              这种错误可能因为：
              <Li>
                您输入的网址不正确
              </Li>
              <Li>
                您要查找的内容可能已被转移、更新或删除
              </Li>
              <Li>
                过期的书签或搜索链接
              </Li>
              <span>--------------------------------------------------------------------------------------------------<br /></span>
              我们建议您：
              <Li>
                <BackButton onClick={e => { this.toHomePage() }}>返回首页</BackButton>
              </Li>
            </Ul>
          </CheckDiv>
        </BodyDiv>
      </MyDiv>
    );
  }
}
