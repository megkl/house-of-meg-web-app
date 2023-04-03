import Layout from "../components/layout";
import { useEffect, useState } from "react";
import client from '../utils/client';
import { CircularProgress, Alert, Grid } from "@mui/material";
import ProductItem from "../components/ProductItem";

export default function Home() {
  const [state, setState] = useState({
    products: [],
    error: "",
    loading: true,
  });

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
             <ProductItem product={product}></ProductItem>
            </Grid>
          ))}
        </Grid>
      )}
    </Layout>
  );
}
