/* eslint-disable no-console,indent */
/**
 *
 * LabelPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { message } from 'antd';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode.react';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLabel from './selectors';
import reducer from './reducer';
import saga from './saga';
// import { Qrcode } from './Qrcode';
import { FlexBody, HorizontalLayout, VerticalLayout } from '../../components/Layout/index';
import { getLableList, getTagList } from '../../utils/service';
import HtmlTitle from '../../components/HtmlTitle';

const LabelDiv = styled(Link)`
  display: block;
   font-size: 14px;
   list-style: none;
   border: 1px solid rgba(229, 229, 229, 1);
   padding: 0 15px;
   border-radius: 3px;
   height: 32px;
   color: #101010;
   text-align: center;
   line-height: 30px;
   margin: 8px 10px; 
   position: relative;
   &:hover{
     background-color: #eeeeee;
   }
   canvas{
     display: none;
     position: absolute;
     z-index: 1;
     box-shadow: 0px 0px 4px 0px rgba(170, 170, 170, 1);
     padding: 10px;
     background: #FFFFFF;
     left: 1px;
     top: 31px;
   }
   &:hover canvas{
     display: block !important;
   }
`;
const MyLayout = styled(HorizontalLayout)`
  align-content: flex-start;
`;
export class Label extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state={
    list: [], // { id: 1, name: '横长签1' },
  }
  componentDidMount() {
    this.loadList();
  }
  /**
   * 加载标签数据
   */
  loadList=() => {
    getTagList(0).then((result) => {
      this.setState({ list: result });
    }).catch((error) => {
      message.error('加载错误');
        console.error(error);
    });
  }


  render() {
    const { list } = this.state;
    const labels = list.map((item) => (<LabelDiv to={`/tags/${item._id}`} key={item._id}>{item.name}<QRCode value={`http://www.51etuku.com/tags/${item._id}`} size={140} /></LabelDiv>));
    return (
      <VerticalLayout display="block" margin="20px 0 0px 0" >
        <HtmlTitle
          title="标签库-"
          description="标签库-"
          keywords="标签库-"
        ></HtmlTitle>
        <FlexBody>
          <MyLayout flexWrap="wrap" background="#FFF" minHeight="78vh" margin="0 0 30px 0" alignItems="flex-start" padding="20px">
            {labels}
          </MyLayout>
        </FlexBody>
      </VerticalLayout>
    );
  }
}

Label.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  label: makeSelectLabel(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'label', reducer });
const withSaga = injectSaga({ key: 'label', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Label);
