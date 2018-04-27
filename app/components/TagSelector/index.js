/**
*
* TagSelector
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { AutoComplete, message, Tag } from 'antd';
import { Hbox, Vbox } from '../Layout';
// import styled from 'styled-components';
const { Option } = AutoComplete;


class TagSelector extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state={
    keyword: '',
    tags: [],
  };
  componentWillUpdate(nextProps, nextState) {
    if (nextState.tags !== this.state.tags) {
      this.props.onChange(nextState.tags);
    }
  }
  getRenderTags=(tags) => tags.map((tag, index) => (<Tag
    key={tag.id}
    style={{ marginBottom: 8 }}
    closable
    afterClose={() => {
      const tagsCopy = tags.concat();
      tagsCopy.splice(index, 1);
      this.setState({ tags: tagsCopy });
    }}
  >
    {tag.name}
  </Tag>));

  /**
   * 从标签列表中筛选
   * @param result
   * @param keyword
   */
  filterListByName(result, keyword) {
    return result.filter((item) => item.name.includes(keyword));
  }
  /**
   * 渲染自动提示列表
   * @param result 标签数组
   */
  renderOptions(result) {
    return result.map((item) => (<Option key={item.id}>{item.name}</Option>));
  }
  render() {
    const { serverTags = [], onChange = () => {} } = this.props;
    const { keyword, tags } = this.state;
    const result = this.filterListByName(serverTags, keyword);
    return (
      <Vbox>
        <Hbox margin="0 0 12px 0">
          <AutoComplete
            placeholder="搜索标签"
            allowClear
            value={keyword}
            dataSource={this.renderOptions(result)}
            style={{ width: 435, marginRight: 15 }}
            onSearch={(value) => this.setState({ keyword: value.trim() })}
            onSelect={(id) => {
              // 删除已经存在的标签
              const tagsCopy = tags.concat();
              const currentIndex = tagsCopy.findIndex((item) => item.id === id);
              if (currentIndex < 0) {
                const targetIndex = result.findIndex((item) => item.id === id);
                tagsCopy.push(result[targetIndex]);
                this.setState({ tags: tagsCopy });
                onChange(tagsCopy);
              } else {
                message.error('无法重复添加标签！');
              }
              this.setState({ keyword: '' });
            }}
          />
          { (keyword && result.length === 0) && '无此标签' }
        </Hbox>
        <Hbox flexWrap="wrap">{this.getRenderTags(tags)}</Hbox>
      </Vbox>
    );
  }
}

TagSelector.propTypes = {
  onChange: PropTypes.func.isRequired, // 标签列表变化
  // 标签总列表
  serverTags: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired, // 唯一ID
    name: PropTypes.string.isRequired, // 图片
  })),
};

export default TagSelector;
