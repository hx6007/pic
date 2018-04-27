import React from 'react';
import PropTypes from 'prop-types';
import { AutoComplete, Spin, Table, message, Icon } from 'antd';
import { Vbox, Hbox, Layout } from '../Layout/index';
import parseImgUrl from '../../utils/imgUrlParse';
import { getPackList, getSearchResult } from '../../utils/service';
import { parseExporProducts, parsePacks, parseRcProducts } from './productParser';
import { RC_PRODUCTS, TUKU_PACKS } from './constants';
const { Option } = AutoComplete;

/**
 * 产品选择器
 */
export class ProductSelector extends React.PureComponent {
  constructor(props) {
    super();
    this.state = {
      keyword: '',
      products: props.defultProducts,
      result: [],
      loading: false,
      error: false,
    };
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextState.products !== this.state.products) {
      const products = parseExporProducts(nextState.products);
      this.props.onChange(products);
    }
  }
  /**
   * 产品表格
   * @returns {*[]}
   */
  getColumn=() => [{
    title: '图片',
    dataIndex: 'image',
    width: '60px',
    render: (text) => <img alt="" src={parseImgUrl(text || '', 40, 40)} width="40px" height="40px" />,
  }, {
    title: '产品编号/分类',
    dataIndex: 'no',
    render: (text, record) => (<Vbox>
      <Hbox color="#333">{text}</Hbox>
      <Hbox color="#999">{record.categoryName}</Hbox>
    </Vbox>),
  }, {
    title: '系列', dataIndex: 'series',
  }, {
    title: '品牌', dataIndex: 'brand',
  }, {
    title: '规格', dataIndex: 'spec',
  }, {
    title: '操作',
    key: 'action',
    width: '60px',
    render: (text, record, index) => (<Icon
      type="delete"
      title="删除"
      style={{ cursor: 'pointer', padding: 12 }}
      onClick={() => {
        const { products } = this.state;
        const productsCopy = products.concat();
        productsCopy.splice(index, 1);
        this.setState({ products: productsCopy });
      }}
    />),
  }];
  /**
   * 搜索产品
   * @param keyword
   * @param from 决定使用哪个接口进行搜索产品
   */
  loadResult=(keyword, from) => {
    if (!keyword) {
      this.setState({ result: [] });
      return;
    }

    this.setState({ loading: true, error: false }, () => {
      let reqPromise;
      if (from === TUKU_PACKS) {
        reqPromise = getPackList({ limit: 7, keyword }).then((res) => parsePacks(res.packs));
      } else {
        reqPromise = getSearchResult(keyword).then((res) => parseRcProducts(res.data.result));
      }
      reqPromise.then((list) => this.setState({ result: list }))
        .catch((err) => {
          this.setState({ error: err.toString() });
        })
        .then(() => {
          this.setState({ loading: false });
        });
    });
  };
  /**
   * 渲染自动提示列表
   * @param result 产品数组
   */
  renderOptions(result) {
    function getString(string) {
      return string || '无';
    }
    return result.map((item) => (
      <Option key={item.id}>
        {`${getString(item.no)} - ${getString(item.level)} - ${getString(item.series)} - ${getString(item.brand)}`}
      </Option>));
  }

  render() {
    const { products, keyword, result, loading, error } = this.state;
    const { from } = this.props;
    return (<Vbox>
      <Hbox>
        <AutoComplete
          placeholder="搜索产品名称、产品编号"
          dataSource={this.renderOptions(result)}
          allowClear
          style={{ width: 435, marginRight: 15 }}
          value={keyword}
          onSearch={(value) => {
            this.setState({ keyword: value.trim() });
            this.loadResult(value.trim(), from);
          }}
          onSelect={(id) => {
              // 删除已经存在的产品
            const productsCopy = products.concat();
            {
              const index = productsCopy.findIndex((item) => String(item.id) === String(id));
              if (index >= 0) {
                productsCopy.splice(index, 1);
                message.info('您已添加过该产品！');
              }
            }
              // 添加新产品到列表顶部
            const index = result.findIndex((item) => String(item.id) === String(id));
            productsCopy.unshift(result[index]);
            this.setState({ keyword: '', result: [], products: productsCopy });
          }}
        />
        { loading && <Spin />}
        { error && <Layout color="red" >加载出错</Layout>}
        { (keyword && !loading && !error && result.length === 0) && '无此产品' }
      </Hbox>
      <Table
        dataSource={products || []}
        rowKey="id"
        columns={this.getColumn()}
        bordered
        style={{ marginTop: 10 }}
        pagination={false}
        size="middle"
      />
    </Vbox>
    );
  }
}
ProductSelector.propTypes = {
  defultProducts: PropTypes.arrayOf(PropTypes.shape({// 初始产品列表
    id: PropTypes.any.isRequired, // 唯一ID
    image: PropTypes.any, // 图片
    no: PropTypes.any, // 产品编号
    series: PropTypes.any, // 系列名称
    brand: PropTypes.any, // 品牌
    spec: PropTypes.any, // 规格
  })),
  onChange: PropTypes.func.isRequired, // 产品列表变化
  from: PropTypes.oneOf([TUKU_PACKS, RC_PRODUCTS]), // 决定使用哪个接口进行搜索产品
};
ProductSelector.defaultProps = {// 默认值
  defultProducts: [],
  from: RC_PRODUCTS,
};

export default ProductSelector;
