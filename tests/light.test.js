const axios = require('axios');
API_URL = "http://localhost:4001/api"

test('test light array', async () => {
    const response = await axios.get(`${API_URL}/device-light`);
    const data = response.data;
    expect(data[0].id).toEqual('142');
});

test('test post request', async () => {
    const data = {
        state: 'test',
        id: '1',
    };
    const response = await axios.post(`${API_URL}/device-light`, data);
    expect(response.status).toEqual(201);
});

test('test put request', async () => {
    const data = {
        state: 'test',
        id: '1',
    };
    const ip = '1';
    const response = await axios.put(`${API_URL}/device-light/${ip}`, data);
    expect(response.status).toEqual(200);
});


test('test delete request', async () => {
    const deviceId = '1'; // Replace with the ID of the resource you want to delete
    const response = await axios.delete(`${API_URL}/device-light/${deviceId}`);
    expect(response.status).toEqual(200);
});