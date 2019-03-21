import React, { Component } from "react";
import Slider from "react-slick";
import { PRODUCT_TYPES } from "../../constants/ProductTypes";
import "../../css/user/Products.css";

import Filters from "./Filters";
import FullRobe from "../universal/FullRobe";
import Robes from "../universal/Robes";

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      featuredItems: [],
      productsType: PRODUCT_TYPES.ALL
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
    var featuredItemsInSlider;

    if (productsType === PRODUCT_TYPES.MEN) {
      featuredItemsInSlider = featuredItems.map(item => {
        if (item.forMen) {
          return (
            <FullRobe
              robe={item}
              key={"slider-item-" + item._id}
              history={history}
            />
          );
        } else return null;
      });
    } else if (productsType === PRODUCT_TYPES.WOMEN) {
      featuredItemsInSlider = featuredItems.map(item => {
        if (!item.forMen) {
          return (
            <FullRobe
              robe={item}
              key={"slider-item-" + item._id}
              history={history}
            />
          );
        } else return null;
      });
    } else {
      featuredItemsInSlider = featuredItems.map(item => {
        return (
          <FullRobe
            robe={item}
            key={"slider-item-" + item._id}
            history={history}
          />
        );
      });
    }

    const sliderSettings = {
      dots: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 5000,
      speed: 700,
      slidesToShow: 1,
      slidesToScroll: 1,
      easing: "ease-in",
      responsive: [
        {
          breakpoint: 1350,
          settings: {
            arrows: false
          }
        }
      ]
    };

    if (robes.length) {
      return (
        <div id="products">
          <Filters
            productsType={productsType}
            changeProductType={this.changeProductType}
          />

          {featured.length ? (
            <Slider {...sliderSettings} className="card-slider">
              {featuredItemsInSlider}
            </Slider>
          ) : null}

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
