const express = require('express');
const bodyParser = require('body-parser');
const pleskApi = require('plesk-api-client');

const app = express();
const router = express.Router();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

app.use(bodyParser.json());

router.post('/request', (request, response) => {
  const login = request.body.login;
  const password = request.body.password;
  const host = request.body.host;
  const apiRequest = request.body.request;

  const apiClient = new pleskApi.Client(host);
  apiClient.setCredentials(login, password);

  apiClient.request(apiRequest, (apiResponse) => {
    response.json({output: apiResponse});
  });
});

app.use('/api', router);

app.set('port', (process.env.PORT || 3001));
app.listen(app.get('port'));