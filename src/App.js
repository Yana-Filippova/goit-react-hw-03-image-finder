import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './components/Searchbar';
import ImageGalleryInfo from './components/ImageGalleryInfo';
import Container from './components/Container';
import './App.css';

class App extends Component {
  state = {
    imageName: '',
  };

  handleSearchForm = imageName => {
    this.setState({ imageName });
  };

  render() {
    const { imageName } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleSearchForm} />
        <ImageGalleryInfo
          imageName={imageName}
          currentPage={this.props.currentPage}
        />
        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}

export default App;
