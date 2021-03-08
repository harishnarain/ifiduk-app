import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    maxWidth: 345,
    height: 190,
    backgroundColor: '#495057',
  },
  media: {
    height: 140,
  },
  cardActions: {
    position: 'absolute',
    bottom: 5,
  },
});

const ProductCard = ({ id, title, description }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" href={`/admin/subscriptions/${id}?name=${title}`}>
          Deploy
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
