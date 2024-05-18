import { stripe } from '@/lib/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/styles/pages/product'
import { Skeleton } from '@radix-ui/themes'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import Stripe from 'stripe'

// import { Container } from './styles';

interface IProductDetails {
  id: string
  name: string
  imageUrl: string
  price: number
  description: string
}

const Product: React.FC<{ product: IProductDetails }> = ({ product }) => {
  const { isFallback } = useRouter()
  if (isFallback) {
    return (
      <ProductContainer>
        <Skeleton loading width={'576px'} height={'656px'} />
        <ProductDetails>
          <Skeleton loading width={'100px'} height={'32px'} />
          <Skeleton loading width={'100px'} height={'32px'} />
          <Skeleton loading width={'100px'} height={'32px'} />
          <Skeleton
            loading
            style={{ marginTop: 'auto' }}
            width={'100%'}
            height={'62px'}
          />
        </ProductDetails>
      </ProductContainer>
    )
  }
  return (
    <ProductContainer>
      <ImageContainer>
        <Image
          src={product.imageUrl}
          width={520}
          height={480}
          alt={product.name}
        />
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>
        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_Q6lYSj1g0fEbSt' } }],
    fallback: true,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount ? price.unit_amount / 100 : 0),
        description: product.description,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}

export default Product
