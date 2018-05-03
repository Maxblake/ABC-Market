import React from 'react';
import axios, { post } from 'axios'

class UploadForm extends React.Component {
  name = React.createRef();
  price = React.createRef();
  stock = React.createRef();
  file = React.createRef();
  description = React.createRef();

  componentDidMount() {
    axios.get('/product/all').then((result) => {
      console.log(result.data);
    })
  }

  upload = (e) => {
    e.preventDefault();
    var formData = new FormData();
    var { files } = this.file.current;
    for (var i = 0; i < files.length; i++) {
		  var filing = files[i];
		  formData.append('files[]', filing, filing.name);
    }
    formData.append('name', this.name.current.value);
    formData.append('stock', this.stock.current.value);
    formData.append('price', this.price.current.value);
    formData.append('description', this.description.current.value);
    const config = {
     headers: {
         'content-type': 'multipart/form-data'
       }
    }
   return post('/file/upload_product',formData,config).then((result) => {
     console.log(result.data)
   })
  }
  render() {
    return (
      <div className="login-page">
        <h1> Upload </h1>
        <div className="login-form">
          <form className="form" onSubmit={this.upload}>
          <input
            type="text"
            ref={this.name}
            placeholder="Email">
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
            type="text"
            ref={this.description}
            placeholder="Description">
          </input>
          <input
            type="file"
            multiple
            ref={this.file}
            placeholder="File">
          </input>
          <button type="submit">Send</button>
        </form>
        </div>
      </div>
    )
  }
}

export default UploadForm;
