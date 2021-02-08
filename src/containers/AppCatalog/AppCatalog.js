import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import ProductCard from '../../components/ProductCard/ProductCard';
import { fetchProducts } from '../../axios';
import useDebounce from '../../shared/useDebounce';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(3),
  },
  search: {
    width: '100%',
  },
}));

const AppCatalog = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const classes = useStyles();

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    fetchProducts(debouncedQuery).then((data) => {
      setProducts(data);
    });
  }, [debouncedQuery]);

  const productCards = products.map((product) => (
    <Grid item xs={6} sm={3} key={product._id}>
      <ProductCard title={product.name} description={product.description} />
    </Grid>
  ));

  return (
    <div>
      <Container className={classes.container}>
        <Typography variant="h6" gutterBottom>
          App Catalog
        </Typography>
      </Container>
      <Container className={classes.container}>
        <TextField
          label="Search for apps..."
          variant="outlined"
          className={classes.search}
          onChange={(event) => setQuery(event.target.value)}
        />
      </Container>
      <Container className={classes.container}>
        <Grid container spacing={3}>
          {productCards}
        </Grid>
      </Container>
    </div>
  );
};

export default AppCatalog;
