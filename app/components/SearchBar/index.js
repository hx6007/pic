/**
*
* SearchBar
*
*/

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { message, AutoComplete } from 'antd';
import { HorizontalLayout } from '../Layout';
import icosearch from './search.png';
import reducer from './reducer';
import saga from './saga';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import { goList, loadSearch } from './actions';
import makeSelectSearchBar from './selectors';
import { makeSelectUrlParam } from '../../containers/App/selectors';

const InputSpan = styled.span`
  width:340px;
  height:42px;
  padding: 6px 0px;
  font-size: 14px;
  color: #555;
  outline: none;
  border-radius: 2px;
  outline: none;
  .ant-input{
    height: 32px;
    border: none;
    padding: 4px 4px;
  } 
  .ant-select-selection{
    background: none;
    border: none;
    border-color: none;
    outline: none;
  }
  .ant-select-selection:active{
    border-color: none;
  }
  .ant-select-selection .ant-select-selection__clear{
    background: none;
  }
  .ant-select-focused{
    border:none;
  }
  .ant-select-selection__rendered ul{
    text-decoration: none;
  }
  .ant-select-auto-complete.ant-select .ant-input{
    text-indent: 0.6em;
  }
  @media (max-width: 980px) {
     width: 270px;
    }
`;

const SearchBox = styled.div`
  height:42px;
  padding-right: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 3px;
  background: #eeeeee;
  .ant-select {
    font-family: "Helvetica Neue For Number", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.65);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
    display: inline-block;
    position: relative;
  }
  .ant-select-auto-complete.ant-select .ant-select-selection__rendered {
    margin-left: 0;
    margin-right: 0;
    height: 100%;
    line-height: 32px;
}
.ant-select-selection__rendered {
    display: block;
    margin-left: 11px;
    margin-right: 11px;
    position: relative;
    line-height: 30px;
}
.ant-select-auto-complete.ant-select .ant-select-selection__placeholder {
    margin-left: 12px;
    margin-right: 12px;
}
.ant-select-selection__placeholder, .ant-select-search__field__placeholder {
    position: absolute;
    top: 50%;
    left: 0;
    right: 9px;
    color: #bfbfbf;
    line-height: 20px;
    height: 20px;
    max-width: 100%;
    margin-top: -10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
}
ant-select-combobox .ant-select-search--inline {
    height: 100%;
    width: 100%;
    float: none;
}
.ant-select-search--inline {
    position: static;
    height: 100%;
    width: 100%;
}
.ant-select-combobox .ant-select-search__field__wrap {
    width: 100%;
    height: 100%;
}
.ant-select-search--inline .ant-select-search__field__wrap {
    width: 100%;
    height: 100%;
}
.ant-select-search__field__wrap {
    display: inline-block;
    position: relative;
}
.SXVsa .ant-select-auto-complete.ant-select .ant-input {
    -webkit-text-indent: 0.6em;
    text-indent: 0.6em;
}
.ant-select-auto-complete.ant-select .ant-input {
    background: transparent;
    border-width: 1px;
    line-height: 1.5;
    height: 32px;
}
.ant-select-search__field__mirror {
    position: absolute;
    top: 0;
    left: -9999px;
    white-space: pre;
    pointer-events: none;
}
.SXVsa .ant-input {
    height: 32px;
    border: none;
    padding: 4px 4px;
}
.ant-select-combobox .ant-select-search__field {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
    -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    -webkit-box-shadow: none;
    box-shadow: none;
}
.ant-select-search--inline .ant-select-search__field {
    border-width: 0;
    font-size: 100%;
    height: 100%;
    width: 100%;
    background: transparent;
    outline: 0;
    border-radius: 4px;
    line-height: 1;
}
.ant-select-combobox .ant-select-arrow {
    display: none;
}
.ant-select-arrow {
    display: inline-block;
    font-style: normal;
    vertical-align: baseline;
    text-align: center;
    text-transform: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: absolute;
    top: 50%;
    right: 11px;
    line-height: 1;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    -webkit-transform-origin: 50% 50%;
    -ms-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    color: rgba(0, 0, 0, 0.25);
    font-size: 12px;
    }
    .gYLheL .ant-select-selection__rendered ul {
    -webkit-text-decoration: none;
    text-decoration: none;
    }
    .ant-select ul, .ant-select ol {
        margin: 0;
        padding: 0;
        list-style: none;
    }
`;

const SearchSpan = styled.span`
  width: 18px;
  height: 18px;
  cursor: pointer;
  margin-left: 5px;
`;
const SHorizontalLayout = styled(HorizontalLayout)`
    margin: 0 0 0 5em;
  @media (max-width: 980px) {
     margin: 0 0 0 1em;
    }
`;

class SearchBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { keyword: props.keyword };
  }

  render() {
    const { searchBarData, dispatch } = this.props;
    const { searchList } = searchBarData;
    const { keyword } = this.state;
    return (
      <SHorizontalLayout >
        <SearchBox>
          <InputSpan>
            <AutoComplete
              allowClear
              style={{ width: 340, border: 0 }}
              placeholder={'搜索产品编号、产品系列'}
              dataSource={searchList}
              value={keyword}
              autoFocus={false}
              onChange={(value) => {
                this.setState({ keyword: value });
                dispatch(loadSearch(value));
                if (!value) {
                  dispatch(goList(value));
                }
              }}
              onSelect={(value) => dispatch(goList(value))}
            />
          </InputSpan>
          <SearchSpan
            title="搜索"
            onClick={() => {
              if (keyword) {
                dispatch(goList(keyword));
              } else {
                message.error('请输入搜索关键字');
              }
            }}
          ><img src={icosearch} alt={'搜索'} /></SearchSpan>
        </SearchBox>
      </SHorizontalLayout>
    );
  }


}

SearchBar.propTypes = {
  dispatch: PropTypes.func,
  searchBarData: PropTypes.object,
  keyword: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  searchBarData: makeSelectSearchBar(),
  keyword: makeSelectUrlParam('keyword'),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'searchBar', reducer });
const withSaga = injectSaga({ key: 'searchBar', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SearchBar);
