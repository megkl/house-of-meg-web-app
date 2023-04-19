import Layout from "../components/Layout";
import { useEffect, useState, useContext } from "react";
import client from '../utils/client';
import { CircularProgress, Alert, Grid } from "@mui/material";
import ProductItem from "../components/ProductItem";
import axios from 'axios';
import { urlForThumbnail } from '../utils/image';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { Store } from "@/utils/store";

export default function Home() {
  const [state, setState] = useState({
    products: [],
    error: "",
    loading: true,
  });
  const {
    state: { cart },
    dispatch,
  } = useContext(Store);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { loading, error, products } = state;
  //fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        //query language of sanity
        const products = await client.fetch(`*[_type == "product"]`);
        setState({ products, loading: false });
      } catch (error) {
        setState({ loading: false, error: error.message });
      }
    };
    console.log(products);
    fetchData();
  }, []);
 
  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      enqueueSnackbar('Sorry. Product is out of stock', { variant: 'error' });
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        _key: product._id,
        name: product.name,
        countInStock: product.countInStock,
        slug: product.slug.current,
        price: product.price,
        image: urlForThumbnail(product.image),
        quantity,
      },
    });
    enqueueSnackbar(`${product.name} added to the cart`, {
      variant: 'success',
    });
    router.push('/cart');
  };

  return (
    <Layout>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.slug}>
             <ProductItem product={product} addToCartHandler={addToCartHandler}></ProductItem>
            </Grid>
          ))}
        </Grid>
      )}
    </Layout>
  );
}
