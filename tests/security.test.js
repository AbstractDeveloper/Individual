const axios = require('axios');
API_URL="http://localhost:4001/api"

test('test security array', async () => {
  const response = await axios.get(`${API_URL}/device-security`);
  const data = response.data;
  expect(data[0].id).toEqual('352');
});

  test('test post request', async () => {
    const data = {
      level: 'test',
      id: '1',
    };
    const response = await axios.post(`${API_URL}/device-security`, data);
    expect(response.status).toEqual(201);
  });
  
  test('test put request', async () => {
    const data = {
      level: 'test',
      id: '1',
    };
    const id = '1';
    const response = await axios.put(`${API_URL}/device-security/${id}`, data);
    expect(response.status).toEqual(200);
  });
  
  test('test delete request', async () => {
    const deviceId = '1';
    const response = await axios.delete(`${API_URL}/device-security/${deviceId}`);
    expect(response.status).toEqual(200);
  });