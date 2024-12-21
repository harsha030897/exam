import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, addToWishlist, removeFromWishlist } from './components/Listslice';
import { ThemeContext } from './components/Theme';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background-color: ${(props) => (props.theme === 'light' ? '#fff' : '#333')};
  color: ${(props) => (props.theme === 'light' ? '#000' : '#fff')};
  min-height: 100vh;
`;

const Button = styled.button`
  background-color: ${(props) => (props.primary ? '#007bff' : '#dc3545')};
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.primary ? '#0056b3' : '#c82333')};
  }
`;

const ProductWrapper = styled.div`
  border: 1px solid ${(props) => (props.theme === 'light' ? '#ddd' : '#444')};
  padding: 20px;
  margin: 10px 0;
  border-radius: 5px;
  background-color: ${(props) => (props.theme === 'light' ? '#f9f9f9' : '#555')};
`;

const WishlistWrapper = styled.div`
  margin-top: 40px;
`;

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.wishlist.products);
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  useEffect(() => {
    axios.get('http://localhost:3000/products').then((response) => {
      dispatch(setProducts(response.data));
    });
  }, [dispatch]);

  const toggleWishlist = (product) => {
    if (wishlist.find((item) => item.id === product.id)) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div>
      {products.length > 0 ? (
        products.map((product) => (
          <ProductWrapper key={product.id}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <Button
              primary={wishlist.find((item) => item.id === product.id)}
              onClick={() => toggleWishlist(product)}
            >
              {wishlist.find((item) => item.id === product.id)
                ? 'Remove from Wishlist'
                : 'Add to Wishlist'}
            </Button>
          </ProductWrapper>
        ))
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
};

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  if (wishlist.length === 0) {
    return <p>No Items Found</p>;
  }

  return (
    <WishlistWrapper>
      <h2>Your Wishlist</h2>
      {wishlist.map((product) => (
        <ProductWrapper key={product.id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </ProductWrapper>
      ))}
    </WishlistWrapper>
  );
};

const WishlistWithNoItemsMessage = (WrappedComponent) => {
  return (props) => {
    const wishlist = useSelector((state) => state.wishlist.wishlist);
    if (wishlist.length === 0) {
      return <p>No Items Found</p>;
    }
    return <WrappedComponent {...props} />;
  };
};

const EnhancedWishlist = WishlistWithNoItemsMessage(Wishlist);

const App = () => {
  const [theme, setTheme] = useState('light');
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <Container theme={theme}>
      <Button onClick={toggleTheme}>Toggle Theme</Button>
      <ProductList />
      <EnhancedWishlist />
    </Container>
  );
};

export default App;
