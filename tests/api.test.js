test('test device array', () => {
    axios.get(`${API_URL}/devices`)
      .then(resp => resp.data)
      .then(resp => {
        console.log(resp[0]);
        expect(resp[0].user).toEqual('mary123');
      });
    });