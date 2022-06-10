import { Box, Card, CardContent, InputAdornment, SvgIcon, TextField, Button, Grid } from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { Container } from '@material-ui/core';
import { Avatar, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { green } from '@material-ui/core/colors';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
function OrderListToolbar(props) {
  const [active, setActive] = useState(0);
  const { orderComplete } = props;
  let { setStatus, history, size, setOrderList, data } = props;
  const [cancelCOunt, setCancelCount] = useState(0);
  const [doneCOunt, setDoneCount] = useState(0);
  const buttons = [
    { _id: 1, value: 'Đơn đã huỷ', status: 'Cancel', size: cancelCOunt },
    { _id: 2, value: 'Đơn đã xử lý', status: 'Done', size: doneCOunt },
  ];
  useEffect(() => {
    (async () => {
      try {
        if (size.status === 'Cancel') {
          setCancelCount(size.count);
        } else {
          setDoneCount(size.count);
        }
      } catch (error) {
        console.log(error);
      } finally {
        // setLoading(false);
      }
    })();
  }, [size]);
  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    var filterSuggestions;
    if (orderComplete) {
      filterSuggestions = data.filter(function (el) {
        return el.orderId.userId.email.toLowerCase().indexOf(query) > -1;
      });
    } else {
      filterSuggestions = data.filter(function (el) {
        return el.userId.email.toLowerCase().indexOf(query) > -1;
      });
    }
    setOrderList(filterSuggestions);
  };
  const number = history ? 6 : 12;
  return (
    <>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box>
              <Container maxWidth={true}>
                <Grid container spacing={3}>
                  <Grid item lg={number} xs={12}>
                    <CardContent>
                      <Grid sx={{ justifyContent: 'space-between' }}>
                        <Grid item>
                          <TextField
                            onChange={handleChange}
                            fullWidth={true}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SvgIcon fontSize="small" color="action">
                                    <SearchIcon />
                                  </SvgIcon>
                                </InputAdornment>
                              ),
                            }}
                            placeholder="Tìm kiếm"
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Grid>
                  {history &&
                    buttons.map((tc, index) => (
                      <Grid key={index} item lg={3} sm={6} xl={3} xs={12}>
                        <Button
                          className={active === index ? 'active-btn' : ''}
                          key={index}
                          onClick={() => {
                            setActive(index);
                            setStatus(tc.status);
                          }}
                        >
                          <CardContent>
                            <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
                              <Grid item>
                                <Typography color="textSecondary" gutterBottom variant="h6">
                                  {tc.value}
                                </Typography>
                                <Typography color="textPrimary" variant="h3">
                                  {tc.size}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Avatar
                                  sx={{
                                    backgroundColor: green[600],
                                    height: 56,
                                    width: 56,
                                  }}
                                >
                                  <PeopleIcon />
                                </Avatar>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Button>
                      </Grid>
                    ))}
                </Grid>
              </Container>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
export default OrderListToolbar;
