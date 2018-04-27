/**
*
* Image
*
*/

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Img from 'react-image';
import noImg from '../../images/notfound.jpg';
import parseImgUrl from '../../utils/imgUrlParse';

const ImgBox = styled.div`
    display:flex;
    ${(p) => p.width && `width:${p.width}`};
    ${(p) => p.height && `height:${p.height}`};
    ${(p) => p.margin && `margin:${p.margin}`};
    align-items: center;
    justify-content: center;
    img{
      overflow: hidden;
      width: 100%;
    }
`;

export default class Image extends React.PureComponent {
  render() {
    const { src, width, height, maxWidth, margin, alt } = this.props;
    let ImgUrl = parseImgUrl(src, width, height);
    if (width === '100%') {
      ImgUrl = parseImgUrl(src, maxWidth, height);
    }
    return (
      <ImgBox width={width} height={height} margin={margin}>
        <Img
          alt={alt}
          src={ImgUrl}
          loader={<img src={noImg} alt={alt} />}
          unloader={<img src={noImg} alt={alt} />}
        />
      </ImgBox>
    );
  }
}
Image.propTypes = {
  src: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  maxWidth: PropTypes.string,
  alt: PropTypes.any,
  margin: PropTypes.any,
};
