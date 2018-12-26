import React, { Component } from 'react';
import Slider from 'react-slick';
import '../../css/admin/Featured.css';

import RobeCard from '../universal/RobeCard';
import FullRobe from '../universal/FullRobe';

class Featured extends Component {
  constructor(props) {
    super(props);

    this.state = {
      featuredItems: []
    };
  }

  componentWillMount() {
    this.props.fetchFeatured();
  }

  componentDidUpdate(prevProps) {
    const { robes, featured } = this.props;
    let featuredItems = [];

    if (prevProps.featured !== featured) {
      for (let robe of robes) {
        if (featured.includes(robe._id)) {
          featuredItems.push(robe);
        }
      }

      this.setState({ featuredItems });
    }
  }

  render() {
    const { featuredItems } = this.state;
    const { removeFromFeatured, history } = this.props;

    const featuredItemsList = featuredItems.map(item => (
      <RobeCard
        robe={item}
        key={"featured-item-" + item._id}
        removeFromFeatured={removeFromFeatured}
        showFeaturedControls={true}
      />
    ));

    const featuredItemsInSlider = featuredItems.map(item => (
      <FullRobe robe={item} key={"slider-item-" + item._id} history={history} />
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

    if (featuredItemsList.length) {
      return (
        <div id="featured">
          <h2>Produse Recomandate:</h2>
          <div className="featured-list">{featuredItemsList}</div>

          <h2>Vizualizare produse:</h2>

          <Slider {...sliderSettings} className="card-slider">
            {featuredItemsInSlider}
          </Slider>
        </div>
      );
    } else {
      return (
        <h3 id="featured" className="no-items-error">
          Nu există produse recomandate.
        </h3>
      );
    }
  }
}

export default Featured;
