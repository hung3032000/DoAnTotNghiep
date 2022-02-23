import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import Budget from 'components/admin/dashboard/Budget';
import LatestOrders from 'components/admin/dashboard/LatestOrders';
import LatestProducts from 'components/admin/dashboard/LatestProducts';
import Sales from 'components/admin/dashboard/Sales';
import TasksProgress from 'components/admin/dashboard/TasksProgress';
import TotalCustomers from 'components/admin/dashboard/TotalCustomers';
import TotalProfit from 'components/admin/dashboard/TotalProfit';
import TrafficByDevice from 'components/admin/dashboard/TrafficByDevice';

import React from 'react';
// import PropTypes from 'prop-types';

// Dashboard.propTypes = {};

function Dashboard(props) {
  return (
    <>
      <Helmet>
        <title>Trang chủ admin</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Budget />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalCustomers />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TasksProgress />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalProfit sx={{ height: '100%' }} />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <Sales />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <TrafficByDevice sx={{ height: '100%' }} />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <LatestProducts sx={{ height: '100%' }} />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <LatestOrders />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default Dashboard;
