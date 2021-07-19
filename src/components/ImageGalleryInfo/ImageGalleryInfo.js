import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoaderComponent from '../Loader';
import ImageGallery from '../ImageGallery';
import pixabayAPI from '../../services/pixabay-api';
import Button from '../Button';
import { toast } from 'react-toastify';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGalleryInfo extends Component {
  state = {
    images: [],
    status: Status.IDLE,
    error: null,
    currentPage: 1,
  };

  static propTypes = {
    imageName: PropTypes.string.isRequired,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;
    const prevPage = prevState.currentPage;
    const nextPage = this.state.currentPage;

    if (prevName !== nextName) {
      this.setState({ images: [], currentPage: 1 });
    }

    if (prevName !== nextName || prevPage !== nextPage) {
      this.searchMoreImages(nextName, nextPage);
    }
  }

  searchMoreImages(nextName, nextPage) {
    this.setState({ status: Status.PENDING });

    pixabayAPI
      .fetchImage(nextName, nextPage)
      .then(images => {
        if (images.total === 0) {
          toast.dark('No images found. Please submit another query!');
          this.setState({ status: Status.REJECTED });

          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          status: Status.RESOLVED,
        }));
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }))
      .finally(() => {
        setTimeout(() => {
          window.scrollBy({
            top: 500,
            behavior: 'smooth',
          });
        }, 500);
      });
  }

  onClickLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  render() {
    const { images, status } = this.state;

    return (
      <>
        {status === Status.IDLE && (
          <div
            style={{
              margin: '15px auto',
              textAlign: 'center',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '25px',
              fontStyle: 'italic',
            }}
          >
            Please enter a query!
          </div>
        )}
        {images.length > 0 && (
          <>
            <ImageGallery images={images} />
            <Button onClickLoadMore={this.onClickLoadMore} />
          </>
        )}

        {status === Status.PENDING && (
          <>
            <LoaderComponent />
          </>
        )}
        {status === Status.REJECTED && null}
      </>
    );
  }
}

export default ImageGalleryInfo;
