/**
 *
 * SeriesEditPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Button, Divider, Spin } from 'antd';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSeriesEditPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import {
  VerticalLayout,
} from '../../components/Layout';
import InputRow from '../../components/InputRow';
import PageTitle from '../../components/PageTitle';
import LolaInput from '../../components/LolaInput';
import AdminBread from '../../components/AdminBread';
import { loadTag, saveTag } from './actions';
import ProductSelector from '../../components/ProductSelector';
import { parsePacks } from '../../components/ProductSelector/productParser';
import { TUKU_PACKS } from '../../components/ProductSelector/constants';

export class TagEditPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  state = {
    name: '', // 标签名称
    describe: '', // 标签描述
    parsedPacks: [], // 关联包数据,转换后的,用于表格显示
  };
  componentDidMount() {
    const { dispatch, match } = this.props;
    const tagId = match.params.id;
    dispatch(loadTag(tagId));
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.serieseditpage.serverTag !== this.props.serieseditpage.serverTag) {
      const serverTag = nextProps.serieseditpage.serverTag;
      const parsedPacks = parsePacks(serverTag.packs);
      this.setState({
        name: serverTag.name,
        describe: serverTag.describe,
        parsedPacks,
      });
    }
  }
  isEdit() { // 是否是编辑模式
    return this.props.match.params.id.length > 4;
  }
  render() {
    const { name, describe, parsedPacks } = this.state;
    const { dispatch, match } = this.props;
    const isEdit = this.isEdit();
    const tagId = isEdit ? match.params.id : null;
    if (isEdit && !name) return <Spin />;
    return (
      <VerticalLayout alignItems="stretch">
        <PageTitle>二维码标签库管理</PageTitle>
        <AdminBread
          list={[
            '首页',
            '二维码标签库',
            `${isEdit ? '编辑' : '添加'}标签`,
          ]}
        />
        <VerticalLayout alignItems="stretch" margin="0 0 30px 0">
          <InputRow must title="标签名称">
            <LolaInput value={name} onChange={(value) => this.setState({ name: value })} width="435px" />
          </InputRow>
          <InputRow title="标签说明">
            <LolaInput value={describe} onChange={(value) => this.setState({ describe: value })} width="435px" />
          </InputRow>
        </VerticalLayout>
        <Divider />
        <VerticalLayout alignItems="stretch" margin="0 0 30px 0">
          <InputRow title="产品编号">
            <ProductSelector
              from={TUKU_PACKS}
              defultProducts={parsedPacks}
              onChange={(list) => { this.setState({ parsedPacks: list }); }}
            />
          </InputRow>
        </VerticalLayout>
        <Divider style={{ marginTop: 50 }} />
        <VerticalLayout alignItems="stretch" margin="0 0 30px 0">
          <InputRow>
            <Button
              type="primary"
              onClick={() => {
                const packIds = parsedPacks.map((item) => item.id);
                dispatch(saveTag(tagId, name, describe, packIds));
              }}
            >&nbsp;&nbsp;&nbsp;&nbsp;保 存&nbsp;&nbsp;&nbsp;&nbsp;</Button>
          </InputRow>
        </VerticalLayout>
      </VerticalLayout>
    );
  }

}

TagEditPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  serieseditpage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  serieseditpage: makeSelectSeriesEditPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'seriesEditPage', reducer });
const withSaga = injectSaga({ key: 'seriesEditPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TagEditPage);
