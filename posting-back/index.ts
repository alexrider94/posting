import service from './src/service';

const PORT = 50002;

service.express.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
