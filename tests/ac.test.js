const axios = require('axios');
API_URL = "http://localhost:4001/api"

test('test ac array', async () => {
    const response = await axios.get(`${API_URL}/device-ac`);
    const data = response.data;
    expect(data[0].ip).toEqual('123.23.432');
});

test('test post request', async () => {
    const data = {
        model: 'test',
        ip: '1',
    };
    const response = await axios.post(`${API_URL}/device-ac`, data);
    expect(response.status).toEqual(201);
});

test('test put request', async () => {
    const data = {
        model: 'test',
        ip: '1',
    };
    const ip = '1';
    const response = await axios.put(`${API_URL}/device-ac/${ip}`, data);
    expect(response.status).toEqual(200);
});

test('test delete request', async () => {
    const deviceId = '1'; // Replace with the ID of the resource you want to delete
    const response = await axios.delete(`${API_URL}/device-ac/${deviceId}`);
    expect(response.status).toEqual(200);
});



