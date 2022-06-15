import { Box, Card, CardHeader, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';

function LatestProducts(props) {
  const { data,label } = props;
  return (
    <Card {...props}>
      <CardHeader title={label} />
      <Divider />
      <List>
        {data?.map((product, i) => {
          return (
            <ListItem divider={i < data.length - 1} key={product.productId}>
              <ListItemAvatar>
                <img
                  alt="Lỗi"
                  src={product.product.imageMain}
                  style={{
                    height: 48,
                    width: 48,
                  }}
                />
              </ListItemAvatar>
              <ListItemText primary={product.product.name} secondary={`Bán được ${product.totalQuantity}` }/>
            </ListItem>
            
          );
        })}
      </List>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2,
        }}
      >
        <a href='/productsA'>
          Xem tất cả sản phẩm
        </a>
      </Box>
    </Card>
  );
}

export default LatestProducts;
