/* eslint-disable react/jsx-tag-spacing */
/**
*
* ShareComponent
*
*/

import React from 'react';
// import {Button, Icon} from 'antd';
import styled from 'styled-components';
import { HorizontalLayout, VerticalLayout } from '../Layout';
import like from './like.png';
import collect from './collect.png';
import share from './share.png';

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1em;
  width:90px;
  height:60px; 
  background:rgba(255,255,255,1);
  border-radius: 30px ; 
  border: 1px solid #ccc;
`;

const ClickButton = styled(Button)`
  background:rgba(62,130,247,1);
`;

class ShareComponent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <HorizontalLayout margin="3em auto">
        <Button>
          <VerticalLayout>
            <img src={share} alt="share"/>
            <div>分享</div>
          </VerticalLayout>
        </Button>
        <ClickButton>
          <VerticalLayout>
            <img src={like} alt="like" />
            <div>664</div>
          </VerticalLayout>
        </ClickButton>
        <Button>
          <VerticalLayout>
            <img src={collect} alt="collect" />
            <div>收藏</div>
          </VerticalLayout>
        </Button>
      </HorizontalLayout>
    );
  }
}

ShareComponent.propTypes = {

};

export default ShareComponent;
