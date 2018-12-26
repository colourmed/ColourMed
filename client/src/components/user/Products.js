import React, { Component } from 'react';
import Slider from 'react-slick';
import { PRODUCT_TYPES } from '../../constants/ProductTypes';
import '../../css/user/Products.css';

import Filters from './Filters';
import FullRobe from '../universal/FullRobe';
import Robes from '../universal/Robes';

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      featuredItems: [],
      productsType: PRODUCT_TYPES.UNIVERSAL
    };

    this.changeProductType = this.changeProductType.bind(this);
  }

  componentWillMount() {
    this.props.fetchFeatured();
  }

  componentDidUpdate(prevProps) {
    const { robes, featured } = this.props;
    let featuredItems = [];

    if (prevProps.featured !== featured || prevProps.robes !== robes) {
      if (robes) {
        for (let robe of robes) {
          if (featured.includes(robe._id)) {
            featuredItems.push(robe);
          }
        }
      }

      this.setState({ featuredItems });
    }
  }

  changeProductType(newProductType) {
    this.setState({ productsType: newProductType });
  }

  render() {
    const { featuredItems, productsType } = this.state;
    const { robes, history, featured } = this.props;

    const featuredItemsInSlider = featuredItems.map(item => (
      <FullRobe robe={item} key={'slider-item-' + item._id} history={history} />
    ));

    const sliderSettings = {
      dots: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 5000,
      speed: 700,
      slidesToShow: 1,
      slidesToScroll: 1,
      easing: 'ease-in',
      responsive: [
        {
          breakpoint: 1350,
          settings: {
            arrows: false
          }
        }
      ]
    };

    if (featured.length) {
      return (
        <div id='products'>
          <Filters
            productsType={productsType}
            changeProductType={this.changeProductType}
          />

          <Slider {...sliderSettings} className='card-slider'>
            {featuredItemsInSlider}
          </Slider>

          <Robes
            robes={robes}
            history={history}
            showUserControls={true}
            filter={productsType}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Products;
