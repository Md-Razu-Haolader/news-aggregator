import app from './app';
import scheduler from './scheduler';

const port = process.env.APP_PORT || 8000;

// Boot the server.
app.listen(port, () => {
  scheduler().start();
  console.log(`Listening on port ${port}...`);
});
