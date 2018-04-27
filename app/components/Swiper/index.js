/**
*
* Swiper
*
*/

import React from 'react';
import { Carousel } from 'antd-mobile';
import HOmePage0 from './HomePhoto.png';
import HOmePage1 from './HomePhoto1.png';

// import styled from 'styled-components';

class Swiper extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    data: [0, 1],
    imgHeight: 176,
    slideIndex: 0,
  };
  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: [HOmePage0, HOmePage1],
      });
    }, 100);
  }
  render() {
    return (
      <Carousel
        infinite
        selectedIndex={1}
        autoplay={3000}
      >
        {this.state.data.map((val) => (
          <a
            key={val}
            style={{ display: 'inline-block', width: '100%' }}
          >
            <img
              src={`${val}`}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
                this.setState({ imgHeight: 'auto' });
              }}
            />
          </a>
        ))}
      </Carousel>);
  }
}

Swiper.propTypes = {

};

export default Swiper;
