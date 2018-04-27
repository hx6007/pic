/**
 *
 * TopicsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { message } from 'antd';
import { push } from 'react-router-redux';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectTopicsPage from './selectors';
import { makeSelectUsername } from '../../containers/App/selectors';
import reducer from './reducer';
import saga from './saga';

import { loadUploadToken } from '../App/actions';
import { HorizontalLayout, VerticalLayout } from '../../components/Layout';
import PageTitle from '../../components/PageTitle';
import AdminBread from '../../components/AdminBread';
import PackArticle from '../../components/PackEdit/PackArticle';
import { client } from '../../app';

export class TopicsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    article: {},
  }

  componentDidMount() {
    this.props.dispatch(loadUploadToken());
  }

  query = gql`
    query queryArticle($id: ID!){
      article(id: $id) {
        id: _id
        title
        describe
        images
        displayMode
        video
        vr
        packs {
          products {
            id: _id
            sku_id
            no
            series
            brand
            spec
            image
            category
          }
        }
        html
        updatedAt
        createdAt
        recorder
        status
      }
    }`;

  addTopics = ({ title, describe, images, displayMode, video, vr, html, packIds, recorder, status }) => {
    client.mutate({
      mutation: gql`
        mutation add {
          articleAdd(title: "${title}", describe: "${describe}", images: ${images}, displayMode: ${displayMode}, video: "${video}", vr: "${vr}", html: "${html}", packIds: ${packIds}, recorder: "${recorder}", status: ${status}) {
            id: _id
            title
            describe
            images
            video
            vr
            updatedAt
            createdAt
            recorder
            status
          }
        }`,
    }).then((result) => {
      const { data } = result;
      if (data && data.articleAdd && data.articleAdd.id) {
        const { dispatch } = this.props;
        dispatch(push('/admin/topics'));
        message.success('已保存新专题');
      } else {
        message.warn('新专题数据不能保存');
      }
    });
  }

  delete = ({ id }) => {
    client.mutate({
      mutation: gql`
        mutation remove {
          articleRemove(id: "${id}") {
            id: _id
          }
        }`,
    }).then((result) => {
      const { data } = result;
      if (data && data.articleRemove && data.articleRemove.id) {
        const { dispatch } = this.props;
        dispatch(push('/admin/topics'));
        message.success('已删除此专题');
      } else {
        message.warn('目前不能删除此专题');
      }
    });
  }

  edit = ({ id, title, describe, images, displayMode, video, vr, html, packIds, recorder, status }) => {
    client.mutate({
      mutation: gql`
        mutation edit {
          articleEdit(id: "${id}", title: "${title}", describe: "${describe}", images: ${images}, displayMode: ${displayMode}, video: "${video}", vr: "${vr}", html: "${html}", packIds: ${packIds}, recorder: "${recorder}", status: ${status}) {
            id: _id
          }
        }`,
    }).then((result) => {
      const { data } = result;
      if (data && data.articleEdit && data.articleEdit.id) {
        const { dispatch } = this.props;
        dispatch(push('/admin/topics'));
        message.success('已更新专题信息');
      } else {
        message.warn('目前不能更新此专题');
      }
    });
  }

  render() {
    const { topicspage, match, username } = this.props;
    const { token } = topicspage;
    const { id } = match.params;
    return (
      <VerticalLayout alignItems="stretch">
        <HorizontalLayout alignItems="flex-end" margin="0 0 30px 0">
          <VerticalLayout>
            <PageTitle>专题管理</PageTitle>
            <AdminBread list={['首页', '专题管理', (id && id !== 'new') ? '编辑' : '新增']} />
          </VerticalLayout>
        </HorizontalLayout>
        {(id && id !== 'new') &&
          <Query query={this.query} variables={{ id }}>
            {({ loading, error, data }) => {
              if (loading) return <p>正在加载 ... ...</p>;
              if (error) return <p>数据被恐龙吃了 ... ...</p>;
              const { article } = data;
              const { packs } = article;
              const productArray = [];
              packs.map((product) => product.products.map((p) => {
                const pr = {
                  id: p.id,
                  sku_id: p.sku_id,
                  no: p.no,
                  series: p.series,
                  brand: p.brand,
                  spec: p.spec,
                  image: p.image,
                  category: p.category,
                };
                productArray.push(pr);
                return '';
              }));
              const articleData = Object.assign({}, article);
              articleData.products = productArray;
              return (
                <div>
                  <PackArticle
                    serverPack={articleData}
                    onSave={(saveData) => {
                      const { products } = saveData;
                      const ids = [];
                      products.map((v) => ids.push(v.id));
                      const m = Object.assign({}, saveData);
                      m.packIds = ids;
                      const { title, describe, images, displayMode, video, vr, packIds, html, status } = m;
                      this.edit({ id, title, describe, images: JSON.stringify(images), displayMode, video, vr, packIds: JSON.stringify(packIds), html, recorder: username, status });
                    }}
                    uploadToken={token}
                    onDelete={() => {
                      this.delete({ id: this.props.match.params.id });
                    }}
                  />
                </div>
              );
            }}
          </Query>
        }
        {(id && id === 'new') &&
          <PackArticle
            onSave={(saveData) => {
              const { products } = saveData;
              const ids = [];
              products.map((v) => ids.push(v.id));
              const m = Object.assign({}, saveData);
              m.packIds = ids;
              const { title, describe, images, displayMode, video, vr, packIds, html, status } = m;
              this.addTopics({ title, describe, images: JSON.stringify(images), displayMode, video, vr, packIds: JSON.stringify(packIds), html, recorder: username, status });
            }}
            uploadToken={token}
          />
        }
      </VerticalLayout>
    );
  }
}

TopicsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  topicspage: PropTypes.object,
  username: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  topicspage: makeSelectTopicsPage(),
  username: makeSelectUsername(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'topicsPage', reducer });
const withSaga = injectSaga({ key: 'topicsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TopicsPage);
