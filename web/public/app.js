// $('#navbar').load('navbar.html');
// $('#foot').load('footer.html');

const API_URL = 'http://localhost:4000/api';
$.get(`${API_URL}/devices_light`)
.then(response => {
  response.forEach(device => {
    $('#light tbody').append(`
      <tr>
        <td>${device.device_name}</td>
        <td>${device.quantity}</td>
      </tr>`
    );
  });
})
.catch(error => {
  console.error(`Error: ${error}`);
});

$.get(`${API_URL}/devices_ac`)
.then(response => {
  response.forEach(device => {
    $('#ac tbody').append(`
      <tr>
        <td>${device.device_name}</td>
        <td>${device.quantity}</td>
      </tr>`
    );
  });
})
.catch(error => {
  console.error(`Error: ${error}`);
});

$.get(`${API_URL}/devices_security`)
.then(response => {
  response.forEach(device => {
    $('#security tbody').append(`
      <tr>
        <td>${device.device_name}</td>
        <td>${device.quantity}</td>
      </tr>`
    );
  });
})
.catch(error => {
  console.error(`Error: ${error}`);
});

$('#add-device').on('click', () => {
  const device_name = $('#name').val();
  const quantity = $('#user').val();

  const body = {
    device_name,
    quantity
  };

  $.post(`${API_URL}/devices_light`, body)
  .then(response => {
    location.href = '/';
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });
});

$('#add-device1').on('click', () => {
  const device_name = $('#name').val();
  const quantity = $('#user').val();

  const body = {
    device_name,
    quantity
  };

  $.post(`${API_URL}/devices_ac`, body)
  .then(response => {
    location.href = '/';
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });
});

$('#add-device2').on('click', () => {
  const device_name = $('#name').val();
  const quantity = $('#user').val();

  const body = {
    device_name,
    quantity
  };

  $.post(`${API_URL}/devices_security`, body)
  .then(response => {
    location.href = '/';
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });
});