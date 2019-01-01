import React, { Component } from 'react';
import Slider from 'react-slick';
import '../../css/user/DetailedProduct.css';

import Color from '../universal/Color';
import Overlay from '../universal/Overlay';
import GenderLabel from '../universal/GenderLabel';
import AddToCartOverlay from './AddToCartOverlay';

class DetailedProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {
        colors: [],
        sizes: [],
        images: [],
        patterns: []
      },
      showAddToCartOverlay: false
    };

    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  componentDidMount() {
    const { robes } = this.props;
    const productId = this.props.match.params.product_id;

    // Fetch the right product.
    for (const robe of robes) {
      if (robe._id === productId) {
        this.setState({ product: robe });
      }
    }
  }

  componentDidUpdate() {
    const { product } = this.state;
    const { robes } = this.props;
    const productId = this.props.match.params.product_id;

    // If product has no keys (hasn't been fetched yet), fetch it.
    if (!product.title) {
      for (const robe of robes) {
        if (robe._id === productId) {
          this.setState({ product: robe });
        }
      }
    }
  }

  handleAddToCart(product) {
    this.props.addItemToCart(product);
  }

  render() {
    const { product, showAddToCartOverlay } = this.state;

    const productImages = product.images.map(image => (
      <img src={image} alt={product.title} key={image} className='slider-image' />
    ));

    const productPatterns = product.patterns.map(pattern => (
      <img src={pattern} alt={product.title} key={pattern} className='slider-pattern' />
    ));

    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 700,
      slidesToShow: 1,
      slidesToScroll: 1,
      easing: 'ease-in',
      responsive: [
        {
          breakpoint: 680,
          settings: {
            arrows: false
          }
        }
      ]
    };

    return (
      <div id='detailed-product'>
        <h2 className='product-title'>{product.title}</h2>
        <div className='flex-container'>
          <div className='left-side'>
            <h2>Culori:</h2>
            <Slider {...sliderSettings} className='card-slider'>
              {productImages}
            </Slider>
          </div>

          <div className='right-side'>
            <h2>Modele:</h2>
            <Slider {...sliderSettings} className='card-slider'>
              {productPatterns}
            </Slider>
          </div>
        </div>

        <div className='product-info'>
          <h4>Descriere Produs:</h4>
            <GenderLabel forMen={product.forMen} />
          <p className='product-description'>{product.description}</p>
          <h4 className='product-sizes'>Mărimi: {product.sizes.join(', ')}</h4>
          <h3 className='product-price'>{product.price} RON</h3>
          <button
            className='add-to-cart'
            onClick={() => {
              this.setState({ showAddToCartOverlay: true });
            }}>
            Adaugă in coș
          </button>
        </div>

        {showAddToCartOverlay ? (
          <Overlay
            content={<AddToCartOverlay robe={product} handleAddToCart={this.handleAddToCart} />}
            closeOverlay={() => this.setState({ showAddToCartOverlay: false })}
            maxWidth='300px'
          />
        ) : null}
      </div>
    );
  }
}

export default DetailedProduct;
