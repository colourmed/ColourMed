import React, { Component } from 'react';
import '../../css/admin/Featured.css';

import RobeCard from '../universal/RobeCard';

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
    const { removeFromFeatured } = this.props;

    const featuredItemsList = featuredItems.map(item => (
      <RobeCard
        robe={item}
        key={item._id}
        removeFromFeatured={removeFromFeatured}
        showFeaturedControls={true}
      />
    ));

    return (
      <div id="featured">
        <h2>Produse Recomandate:</h2>

        <div className="featured-list">{featuredItemsList}</div>
      </div>
    );
  }
}

export default Featured;
