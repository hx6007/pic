/**
*
* HtmlTitle
*
*/

import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
// import styled from 'styled-components';


class HtmlTitle extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const Titleindex = '楼兰图库系统';
    const descriptionindex = '楼兰E图库(51etuku.com)是楼兰陶瓷品牌旗下网站,汇聚楼兰陶瓷所以产品图及效果图,帮助客户全面详细的了解楼兰产品细节及效果展示。';
    const keywordsindex = 'E图库,千图万图,图库,瓷砖,楼兰,楼兰陶瓷,效果图,室内效果图,样板间,实景图,整屋图,店面图';
    const { title, description, keywords } = this.props;
    return (
      <Helmet>
        <title>{title ?  title + Titleindex : Titleindex}</title>
        <meta name="keywords" content={keywords ?  keywords + keywordsindex : keywordsindex} />
        <meta name="description" content={description ?  description + descriptionindex : descriptionindex} />
      </Helmet>
    );
  }
}

HtmlTitle.propTypes = {
  title: PropTypes.any,
  description: PropTypes.any,
  keywords: PropTypes.any,
};

export default HtmlTitle;
