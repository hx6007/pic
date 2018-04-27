/**
 *
 * PackEditPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Lightbox from 'react-images';
import {
  AutoComplete,
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Icon,
  Table,
  Switch,
  Upload,
  Radio, Spin, Tag, message,
} from 'antd';
import moment from 'moment';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectPackEditPage, {
  makeSelectSearchList, makeSelectType,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  Layout,
  VerticalLayout,
  HorizontalLayout,
  Hbox,
} from '../../components/Layout';
import InputRow from '../../components/InputRow';
import PageTitle from '../../components/PageTitle';
import LolaInput from '../../components/LolaInput';
import {
  savePack, loadSearch, loadUploadToken, loadPack,
  addProduct, delProduct, updateCover, updateDesigner, updateDepartment,
  updateShop, updateBrand, updateAddress, updateArea, updateDecorateDate,
  updateStatus, updateType, updateSpaces, updateStyles, updateSites, resetPack,
  updateTags,
} from './actions';
import { SPACES, STYLES, SITES, SERVER } from '../../utils/universalConst';
import AdminBread from '../../components/AdminBread';
import Container from './Drag/Container';
import TableData from './tableDataSource';
import { getTypeName } from '../../utils/typeParser';
import { loadTags } from '../TagListPage/actions';

const { Group: CheckboxGroup } = Checkbox;
const { Group: RadioGroup } = Radio;
const { MonthPicker } = DatePicker;

export class PackEditPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoImage = this.gotoImage.bind(this);
  }

  state = {
    search: '', // 产品搜索关键字
    tagSearch: '', // 标签搜索关键字
    uploadList: [], // 上传列表
    lightboxIsOpen: false, // 控制大图是否显示
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(loadUploadToken());// 加载上传凭证
    dispatch(loadTags(0));// 加载全部标签
    if (this.isEdit()) {
      const packId = match.params.id;
      dispatch(loadPack(packId));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.packEditPage.images !== this.props.packEditPage.images) {
      const uploadList = this.parseToUploadList(nextProps.packEditPage.images);
      this.setState({ uploadList });
    }
  }

  componentWillUnmount() {
    // 重置页面
    this.props.dispatch(resetPack());
  }

  /**
   * 上传监听
   * @param fileList
   */
  onUploaderChanged = ({ fileList }) => {
    const uploadList = fileList.map((item) => {
      if (!item.originFileObj || item.url) return item;
      const url = item.status === 'done' && SERVER.QND + item.response.hash;
      return {
        ...item,
        url,
      };
    });
    this.setState({ uploadList });
  }
  /** 删除某项产品* */
  onRemoveClick = (index) => {
    this.props.dispatch(delProduct(index));
  }
  /**
   * 空间 风格 场所属性选择框
   * @returns {*}
   */
  getCheckBox = (dispatch, type, spaces, styles, sites) => (
    <VerticalLayout alignItems="stretch">
      {![9, 10].includes(type) &&
        <InputRow title="空间属性" must>
          <VerticalLayout>
            <CheckboxGroup
              options={SPACES}
              value={spaces || []}
              onChange={(value) => dispatch(updateSpaces(value))}
              style={{ marginTop: 5 }}
            />
            {styles && spaces.length > 1 &&
              <HorizontalLayout color="red">空间属性最多勾选1项</HorizontalLayout>}
          </VerticalLayout>
        </InputRow>
      }
      <InputRow title="风格属性" must>
        <VerticalLayout>
          <CheckboxGroup
            options={STYLES}
            value={styles || []}
            onChange={(value) => dispatch(updateStyles(value))}
            style={{ marginTop: 5 }}
          />
          {styles && styles.length > 3 &&
            <HorizontalLayout color="red">风格属性最多勾选3项</HorizontalLayout>}
        </VerticalLayout>

      </InputRow>
      <InputRow title="场所属性" must>
        <VerticalLayout>
          <CheckboxGroup
            options={SITES}
            value={sites || []}
            onChange={(value) => dispatch(updateSites(value))}
            style={{ marginTop: 5 }}
          />
          {sites && sites.length > 2 &&
            <HorizontalLayout color="red">场所属性最多允许勾选2项</HorizontalLayout>}
        </VerticalLayout>
      </InputRow>
    </VerticalLayout>
  )
  /**
   * 产品选择器
   * @param type
   * @param search
   * @param searchList
   * @param products
   * @param columns
   * @returns {*}
   */
  getProductSelector = (type, search, searchList, products, columns, searchLoading, searchError) => (
    // 1 产品  4 样板间 5 直板图  6 地面图  必选产品
    <InputRow title="产品编号" must={[1, 4, 5, 6].includes(type)}>
      <VerticalLayout flex="1" alignItems="stretch">
        <HorizontalLayout>
          <AutoComplete
            placeholder="搜索产品名称、产品编号"
            dataSource={searchList}
            allowClear
            style={{ width: 435, marginRight: 15 }}
            value={search}
            onSearch={(value) => {
              const keyword = value.trim();
              this.setState({ search: keyword });
              this.props.dispatch(loadSearch(keyword));
            }}
            onSelect={(value) => {
              this.props.dispatch(addProduct(searchList.indexOf(value)));
              this.setState({ search: '' });
            }}
          />
          { searchLoading && <Spin />}
          { searchError && <Layout color="red" >加载出错</Layout>}
          { (search && !searchLoading && !searchError && searchList && searchList.length === 0) && '无此产品' }
        </HorizontalLayout>
        <Table
          dataSource={products || []}
          rowKey="sku_id"
          columns={columns}
          bordered
          style={{ marginTop: 20 }}
          pagination={false}
          size="middle"
        />
      </VerticalLayout>
    </InputRow>
  )

  isEdit() { // 是否是编辑模式
    return this.props.match.params.id.length > 4;
  }


  /**
   * 图片转上传列表
   * @param images
   * @returns {{uid: T, name: string, url: T, status: string}[]}
   */
  parseToUploadList(images) {
    return (images || []).map((item) => ({
      uid: item,
      name: '',
      url: item,
      status: 'done',
    }));
  }
  openLightbox(index, event) {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }

  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }

  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  gotoImage(index) {
    this.setState({
      currentImage: index,
    });
  }

  getRenderTags(tags) {
    const { dispatch } = this.props;
    return tags.map((tag, index) => (<Tag
      key={tag.id}
      style={{ marginBottom: 8 }}
      closable
      afterClose={() => {
        const tagsCopy = tags.concat();
        tagsCopy.splice(index, 1);
        dispatch(updateTags(tagsCopy));
      }}
    >
      {tag.name}
    </Tag>));
  }

  render() {
    const { searchList, type, packEditPage, dispatch } = this.props;
    const { uploadToken, cover, products, designer, department, shop, brand, address, area, decorateDate, status, spaces, styles, sites, tags: myTag, tagLoading, tagError, serverTags, searchLoading, searchError } = packEditPage;
    const { search, uploadList, tagSearch } = this.state;
    const tags = myTag || [];
    const tagSearchList = (serverTags || []).filter((item) => item.name.includes(tagSearch)).map((item) => item.name);
    const name = getTypeName(type);
    const columns = new TableData(this.onRemoveClick);
    const checkboxes = this.getCheckBox(dispatch, type, spaces, styles, sites);
    const productSelector = this.getProductSelector(type, search, searchList, products, columns, searchLoading, searchError);
    const qrcodeTags = this.getRenderTags(tags);
    return (
      <VerticalLayout alignItems="stretch">
        <VerticalLayout>
          <PageTitle>{name}管理</PageTitle>
          <AdminBread
            list={[
              '首页',
              `${name}管理`,
              `${this.isEdit() ? '编辑' : '添加'}${name}`]}
          />

        </VerticalLayout>
        {![1, 2, 3].includes(type) &&
          <InputRow title="类型" must margin="30px 0 0 0">
            <RadioGroup
              value={type}
              onChange={(e) => dispatch(updateType(parseInt(e.target.value, 10)))}
              style={{ marginTop: 5 }}
            >
              {[4, 5, 6, 7, 8].includes(type) && <span>
                <Radio value={4}>样板间</Radio>
                <Radio value={5}>直板图</Radio>
                <Radio value={6}>地面图</Radio>
                <Radio value={7}>装修效果图</Radio>
                <Radio value={8}>平面布局图</Radio>
              </span>}
              {[9, 10].includes(type) && <span><Radio value={9}>效果图</Radio><Radio
                value={10}
              >实景图</Radio></span>}
            </RadioGroup>
          </InputRow>}

        {type === 1 && (<VerticalLayout margin="30px 0 0 0" />)}
        {type === 1 && productSelector}

        <InputRow title="图片" must margin="30px 0 0 0">
          <VerticalLayout>
            <HorizontalLayout margin="0 0 15px 0">
              <Upload
                action={SERVER.QNU}
                onChange={this.onUploaderChanged}
                data={{ token: uploadToken }}
                fileList={uploadList}
                showUploadList={false}
                multiple
                accept="image/*"
              >
                <Button><Icon type="upload" />选择文件</Button>
              </Upload>
              <Layout color="#888">（至少上传一张，建议图片宽度大小为1200px，高度不限）</Layout>
            </HorizontalLayout>
            <Container
              uploadList={uploadList}
              onChangeUploadList={(list) => this.setState({ uploadList: list })}
              cover={cover}
              onUpdateCover={(newCover) => dispatch(updateCover(newCover))}
              openLightbox={(i, e) => this.openLightbox(i, e)}
            />

            <Lightbox
              currentImage={this.state.currentImage}
              images={uploadList.map((card) => ({ src: card.url || '' }))}
              isOpen={this.state.lightboxIsOpen}
              onClose={this.closeLightbox}
              onClickImage={this.closeLightbox}
              onClickNext={this.gotoNext}
              onClickPrev={this.gotoPrevious}
              onClickThumbnail={this.gotoImage}
              spinnerColor={'white'}
              showThumbnails
            />
          </VerticalLayout>
        </InputRow>

        {type !== 1 && (
          <VerticalLayout alignItems="stretch">
            {/* 2 实景图 3 效果图 4 样板间  7 装修效果图 8 平面布局图9 整屋空间效果图 10 整屋空间实景图 才有空间 风格 场所属性 */}
            {[2, 3, 4, 7, 8, 9, 10].includes(type) && checkboxes}
            <Divider />
            {productSelector}
            <Divider style={{ marginTop: 50 }} />
          </VerticalLayout>
        )}

        {/* 2 实景图 3 效果图 4 样板间  7 装修效果图 8 平面布局图 9 整屋空间效果图 10 整屋空间实景图 才有不同的填空框 */}
        {[2, 3, 4, 7, 8, 9, 10].includes(type) && (
          <VerticalLayout alignItems="stretch">
            <InputRow title="设计师" margin="20px 0 0 0">
              <LolaInput
                value={designer}
                onChange={(value) => dispatch(updateDesigner(value))}
              />
            </InputRow>
            <InputRow title="所属单位">
              <LolaInput
                value={department}
                onChange={(value) => dispatch(updateDepartment(value))}
              />
            </InputRow>
            {[4, 7, 8, 9, 10].includes(type) && (
              <InputRow title="店面名称">
                <LolaInput
                  value={shop}
                  onChange={(value) => dispatch(updateShop(value))}
                />
              </InputRow>
            )}
            {[7, 8, 9, 10].includes(type) && (
              <InputRow title="品牌">
                <LolaInput
                  value={brand}
                  onChange={(value) => dispatch(updateBrand(value))}
                />
              </InputRow>
            )}
            {[2, 4, 7, 8, 9, 10].includes(type) && (
              <InputRow title="详细地址">
                <LolaInput
                  value={address}
                  onChange={(value) => dispatch(updateAddress(value))}
                  width="435px"
                />
              </InputRow>
            )}
            {[7, 8, 9, 10].includes(type) && (
              <InputRow title="面积">
                <Hbox>
                  <LolaInput
                    type="number"
                    value={area}
                    onChange={(value) => dispatch(updateArea(value))}
                    width="175px"
                    margin="0 15px 0 0"
                    addonAfter="㎡"
                  />
                  装修日期：
                  <MonthPicker
                    allowClear={false}
                    value={decorateDate ? moment(new Date(decorateDate)) : undefined}
                    onChange={(date) => dispatch(updateDecorateDate(date.valueOf()))}
                  />
                </Hbox>
              </InputRow>
            )}
          </VerticalLayout>
        )}
        <InputRow title="是否发布">
          <Switch
            checked={status === 2}
            onChange={(value) => dispatch(updateStatus(value ? 2 : 1))}
          />
        </InputRow>
        {type === 1 &&
        <InputRow title="二维码标签">
          <VerticalLayout>
            <HorizontalLayout margin="0 0 12px 0">
              <AutoComplete
                placeholder="搜索标签"
                allowClear
                value={tagSearch}
                dataSource={tagSearchList}
                style={{ width: 435, marginRight: 15 }}
                onSearch={(value) => {
                  const keyword = value.trim();
                  this.setState({ tagSearch: keyword });
                }}
                onSelect={(value) => {
                  const currentIndex = tags.findIndex((item) => item.name === value);
                  if (currentIndex < 0) {
                    const targetIndex = serverTags.findIndex((item) => item.name === value);
                    const tagsCopy = tags.concat();
                    const selectTag = {
                      id: serverTags[targetIndex]._id,
                      name: serverTags[targetIndex].name,
                    };
                    tagsCopy.push(selectTag);
                    dispatch(updateTags(tagsCopy));
                  } else {
                    message.error('无法重复添加标签！');
                  }
                  this.setState({ tagSearch: '' });
                }}
              />
              { tagLoading && <Spin />}
              { tagError && <Layout color="red" >加载出错</Layout>}
              { (tagSearch && !tagLoading && !tagError && tagSearchList && tagSearchList.length === 0) && '无此标签' }
            </HorizontalLayout>
            <HorizontalLayout flexWrap="wrap">
              {qrcodeTags}
            </HorizontalLayout>
          </VerticalLayout>

        </InputRow>
        }
        <Divider style={{ marginTop: 50 }} />
        <InputRow>
          <Button
            type="primary"
            onClick={() => {
              const images = uploadList.map((item) => item.url);
              dispatch(savePack(images));
            }}
          >　　保 存　　</Button>
        </InputRow>

      </VerticalLayout>
    );
  }

}

PackEditPage.propTypes = {
  packEditPage: PropTypes.object,
  searchList: PropTypes.array,
  dispatch: PropTypes.func,
  match: PropTypes.object,
  type: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  packEditPage: makeSelectPackEditPage(),
  searchList: makeSelectSearchList(),
  type: makeSelectType(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'packEditPage', reducer });
const withSaga = injectSaga({ key: 'packEditPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PackEditPage);
