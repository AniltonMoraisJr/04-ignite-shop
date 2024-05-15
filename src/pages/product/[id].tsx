import { useRouter } from 'next/router';
import React from 'react';

// import { Container } from './styles';

const Product: React.FC = () => {
    const { query: {id} } =useRouter()

  return (
    <p><strong>Product:</strong>{id}</p>
  );
}

export default Product;