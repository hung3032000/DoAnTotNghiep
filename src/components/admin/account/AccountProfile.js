import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  // AvatarGroup,
  Typography
} from '@material-ui/core';
import moment from 'moment';

function AccountProfile() {
  const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    city: 'Los Angeles',
    country: 'USA',
    jobTitle: 'Senior Developer',
    name: 'Katarina Smith',
    timezone: 'GTM-7',
  };



  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography color="textPrimary" gutterBottom variant="h3">
            {user.name}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`${user.city} ${user.country}`}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`${moment().format('hh:mm A')} ${user.timezone}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <input type="file" accept=".jpg,.png"  />
        <Button variant="text" component="label" color="primary" fullWidth={true} >
          Upload File
        </Button>
      </CardActions>
    </Card>
  );
}
export default AccountProfile;
