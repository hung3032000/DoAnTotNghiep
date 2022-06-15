import {
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';



const TotalCustomers = (props) => (
  
  <Card {...props}>
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h6"
          >
            {props.label}
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            {props.data}
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default TotalCustomers;
