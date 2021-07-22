import React, { Component } from "react";
import Spinner from "../Spinner";
import "./search.css";

class Search extends Component {
  state = {
    searchValue: "",
    selectedPhotos: [],
    isLoading: false,
  };
  inputHandler = () => (e) => {
    e.preventDefault();
    this.setState({
      searchValue: e.target.value,
    });
  };

  getAlbumPictutes = () => {
    this.setState({ isLoading: true });
    fetch(
      "https://jsonplaceholder.typicode.com/albums/" +
        this.state.searchValue +
        "/photos"
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({ isLoading: false });
        this.setState({
          selectedPhotos: json,
        });
      });
  };

  render() {
    let displayAlbumPhoto = <p>Enter Valid album Id to get Album Photos</p>;
    if (
      this.state.selectedPhotos.length !== 0 &&
      this.state.searchValue !== ""
    ) {
      displayAlbumPhoto = this.state.selectedPhotos.map((photo) => {
        return (
          <div>
            <img src={photo.thumbnailUrl} />
            {photo.title}
          </div>
        );
      });
    }
    if (this.state.isLoading) {
      displayAlbumPhoto = <Spinner />;
    }

    return (
      <React.Fragment>
        <h2>ALBUM Display</h2>
        <div className="AlbumWrapper">
          <div className="SearchGroup">
            <input
              type="number"
              name="search"
              placeholder="Search..."
              value={this.state.searchValue}
              onChange={this.inputHandler()}
            />
            <button onClick={this.getAlbumPictutes}>
              Get Album Photos By Id
            </button>
          </div>
          <div className="ItemDisplay">{displayAlbumPhoto}</div>
        </div>
      </React.Fragment>
    );
  }
}
export default Search;
