
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import PropTypes from 'prop-types';

export default function PrayersCards(props) {
  return (
    <Card sx={{ maxWidth: 345 }} style={{margin:"20px"}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="160"
          image={props.img}
          alt={props.salat}
        />
        <CardContent>
          <h3 >
          {props.salat}
          </h3>
          <Typography variant="h3" color="text.secondary">
          {props.time}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
 
PrayersCards.prototype = {
  props : PropTypes.node
}