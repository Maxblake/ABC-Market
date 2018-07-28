import React from 'react';

class UploadForm extends React.Component {
  name = React.createRef();
  price = React.createRef();
  stock = React.createRef();
  file = React.createRef();
  description = React.createRef();

  upload = (e) => {
    e.preventDefault();
    var body = new FormData();
    var { files } = this.file.current;
    for (var i = 0; i < files.length; i++) {
        var filing = files[i];
        body.append('files[]', filing, filing.name);
    }
    body.append('name', this.name.current.value);
    body.append('stock', this.stock.current.value);
    body.append('price', this.price.current.value);
    body.append('description', this.description.current.value);
    fetch('/product/new', {
        method: 'post',
        body
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
  }

  render() {
    return (
      <div>
        <h1> Upload </h1>
        <div>
          <form onSubmit={this.upload}>
          <input
            type="text"
            ref={this.name}
            placeholder="Name">
          </input>
          <input
            type="text"
            ref={this.description}
            placeholder="Description">
          </input>
          <input
            type="number"
            ref={this.price}
            placeholder="Price">
          </input>
          <input
            type="number"
            ref={this.stock}
            placeholder="Stock">
          </input>
          <input
            type="file"
            multiple
            ref={this.file}>
          </input>
          <button type="submit">Send</button>
        </form>
        </div>
      </div>
    )
  }
}

export default UploadForm;
