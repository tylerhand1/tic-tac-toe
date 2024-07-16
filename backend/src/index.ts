import server from './app';
import config from './utils/config';

server.listen(config.PORT, () => {
  console.log(`Server running at http://localhost:${config.PORT}`);
});