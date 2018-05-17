import React from 'react';
import axios from 'axios'

class PhotoGrid extends React.Component {
  componentDidMount() {
    axios.get('/product/all').then((result) => {
      console.log(result.data);
    })
  }
  render() {
    return (
      <div className="photo-grid">
        ALL PHOTOS
      </div>
    )
  }
};

export default PhotoGrid;
