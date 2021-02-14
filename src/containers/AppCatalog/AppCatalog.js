import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import ProductCard from '../../components/ProductCard/ProductCard';
import { fetchProducts } from '../../axios';
import useDebounce from '../../shared/useDebounce';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    padding: theme.spacing(4),
  },
  box: {
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    width: '85vw',
    padding: theme.spacing(3),
  },
  search: {
    width: '75%',
    margin: theme.spacing(3),
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
      <ProductCard title={product.name} description={product.description} id={product._id} />
    </Grid>
  ));

  return (
    <div className={classes.container}>
      <Box className={classes.box}>
        <Paper className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            App Catalog
          </Typography>
          <TextField
            label="Search for apps..."
            variant="outlined"
            className={classes.search}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Grid container spacing={3}>
            {productCards}
          </Grid>
        </Paper>
      </Box>
    </div>
  );
};

export default AppCatalog;
