import { Component } from "react";
import axios from "axios";
class GetImage extends Component<any, any> {
  state = { source: null };
  componentDidMount() {
    axios
      .get("http://localhost:8080/public/images/" + this.props.ck, {
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
        <img
          src={this.state.source}
          alt="kep"
          width={this.props.width}
          height={this.props.height}
        />
      );
    } else {
      return (
        <img
          src="../src/assets/no_image.jpg"
          alt="kep"
          width={this.props.width}
          height={this.props.height}
        />
      );
    }
  }
}

export default GetImage;
