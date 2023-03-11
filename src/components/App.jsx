import { useState, useEffect } from 'react';
import { getImages } from "components/services/getImages";

import { Container } from "./Styles/Styles";
import { Searchbar } from "./Searchbar/Searchbar";
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ButtonLoadMore } from './Button/Button';
import { ImageModal } from './Modal/Modal';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';


export const App = () => { 
  
  const [textSearch, setTextSearch] = useState('');
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [urlLarge, setUrlLarge] = useState('');

  const fetchImages = async (textSearch, page) => {
    try {
      setIsLoading(true);
      const data = await getImages(textSearch, page);
      setImages(images => [...images, ...data.hits]);
      setTotalHits(data.totalHits);

      if (data.total === 0) {
        setError('Sorry, there are no images matching your search query. Please try again.')
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!textSearch) return;

    fetchImages(textSearch, page);
  }, [textSearch, page]);

	const handleSubmit = (textSearchValue) => {
    if (textSearchValue === textSearch && page === 1) {
      alert("Images already showed")
      return;
    }
    setTextSearch(textSearchValue);
    setError('');
    setPage(1);
    setTotalHits(0);
    setImages([]);
	}

  const loadMore = ()=> setPage(page+1)
  
  const onCloseModal = () => {
    setShowModal(false);
    setUrlLarge('');
  }

  const onOpenModal = (url) => {
    setShowModal(true);
    setUrlLarge(url);
  }

    return (
      <Container>
        <Searchbar onSearch={handleSubmit}/>
        
        {isLoading && <Loader/>}

        <ImageGallery data={images} onOpenModal={onOpenModal}/>

        {(page * 12 <= totalHits) &&
            <ButtonLoadMore  onClick={loadMore}/>}

        {Boolean(error.length) && <ErrorMessage message={error}/>}

        {showModal && <ImageModal onCloseModal={onCloseModal} url={urlLarge}/>}
      </Container>
    );
};
