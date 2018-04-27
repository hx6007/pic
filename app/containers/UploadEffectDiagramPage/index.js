/**
 *
 * UploadEffectDiagramPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Button, Spin, message } from 'antd';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectUploadEffectDiagramPage from './selectors';

import { makeSelectUserid, makeSelectTUsername } from '../../containers/App/selectors';
import reducer from './reducer';
import saga from './saga';

import { HorizontalLayout, Layout, VerticalLayout, Vbox } from '../../components/Layout/index';
import PackUserRaw from '../../components/PackEdit/PackUserRaw';

import { loadPack, loadUploadToken } from '../../containers/App/actions';
import { uploadEffectDiagram, editEffectDiagram } from '../../utils/service';


export class UploadEffectDiagramPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    pack: {
      uid: '',
      type: 101, // 默认 待分配(101)
      status: 3, // 待一审
      images: [],
      cover: '',
      note: '',
      designer: '',
      department: '',
      address: '',
      area: 0,
      decorateDate: 0,
    },
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const id = match.params.id;
    dispatch(loadUploadToken());
    if (id !== 'new') {
      dispatch(loadPack(id));
    }
  }

  /**
   * 保存数据
   * @param {data} Object
   */
  saveFun({ data2 }) {
    const { uid, match, tusername, dispatch } = this.props;
    const { id } = match.params;
    const data = Object.assign({}, data2);
    data.uid = uid;
    data.type = 101;
    data.status = 3;
    data.founder = tusername;
    data.location = {
      detail: data2.address,
    };
    if (id === 'new') {
      uploadEffectDiagram(data).then(() => {
        dispatch(push('/user/uploadlist'));
        message.success('已新增效果图, 待审核');
      }).catch((error) => {
        message.error(error.data.message);
      });
    } else {
      editEffectDiagram({ id, data }).then(() => {
        dispatch(push('/user/uploadlist'));
        message.success('已修改效果图, 待审核');
      }).catch((error) => {
        message.error(error.data.message);
      });
    }
  }

  render() {
    const { match } = this.props;
    const { id } = match.params;
    let { pack } = this.state;
    const { effectDiagram, uploadToken } = this.props.uploadeffectdiagrampage;
    if (id !== 'new') {
      if (!effectDiagram) {
        return <Spin />;
      }
      pack = {
        images: effectDiagram.images || '',
        cover: effectDiagram.cover || effectDiagram.images[0] || '',
        note: effectDiagram.note || '',
        designer: effectDiagram.designer || '',
        department: effectDiagram.department || '',
        address: effectDiagram.location ? (effectDiagram.location.detail || '') : '',
        area: effectDiagram.area || 0,
        decorateDate: effectDiagram.decorateDate || 0,
        shop: effectDiagram.shop || '',
        brand: effectDiagram.brand || '',

      };
    }
    return (
      <VerticalLayout flex="1">
        <Layout width="100%" background="#fff">
          <VerticalLayout flex="1">
            <Layout background="#ffffff" height="120px" width="93%" margin="0 auto">
              <HorizontalLayout width="100%" justify="space-between" alignItems="flex-end" margin="0 0 30px 0" borderBottom="1px solid #cccccc" padding="50px 0 20px 0" color="black">
                <Layout>
                  上传效果图
                </Layout>
                <Layout>
                  <Link to={{ pathname: '/user/uploadlist' }}><Button size="small" type="primary">返回效果图列表</Button></Link>
                </Layout>
              </HorizontalLayout>
            </Layout>
            <Layout background="#ffffff" width="93%" margin="0 auto">
              <Vbox width="100%" margin="0 0 30px 0">
                <PackUserRaw
                  serverPack={pack}
                  uploadToken={uploadToken || ''}
                  onSave={(data2) => {
                    if (data2.images.length === 0) {
                      message.warning('图片必须上传');
                    } else {
                      this.saveFun({ data2 });
                    }
                  }}
                />
              </Vbox>
            </Layout>
          </VerticalLayout>
        </Layout>
      </VerticalLayout>
    );
  }
}

UploadEffectDiagramPage.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.any,
  match: PropTypes.object,
  uploadeffectdiagrampage: PropTypes.object,
  uid: PropTypes.string,
  tusername: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  uploadeffectdiagrampage: makeSelectUploadEffectDiagramPage(),
  uid: makeSelectUserid(),
  tusername: makeSelectTUsername(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'uploadEffectDiagramPage', reducer });
const withSaga = injectSaga({ key: 'uploadEffectDiagramPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UploadEffectDiagramPage);
