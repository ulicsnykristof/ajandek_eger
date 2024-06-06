import { Component } from "react";
import axios from "axios";

class GetImage extends Component<any, any> {
  state = { source: null };

  componentDidMount() {
    axios
      .get("http://localhost:8080/images/" + this.props.ck, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        this.setState({ source: "data:;base64," + base64 });
      });
  }

  render() {
    if (this.state.source != null) {
      return (
        <img src={this.state.source} alt="kep" width="100px" height="100px" />
      );
    } else {
      return <p>Error</p>;
    }
  }
}

export default GetImage;
