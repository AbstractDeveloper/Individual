$('#navbar').load('navbar.html');
$('#foot').load('footer.html');

const API_URL = 'http://localhost:4000/api';
const SENSOR_URL = 'http://localhost:7000';


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

$.get(`${SENSOR_URL}/sensor`)
.then(response => {
  response.forEach(device => {
    $('#sdata').append(`
      <tr>
        <td>${device.time}</td>
        <td>${device.value}</td>
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


$('#delete-device').on('click', () => {
  const id = $('#name').val();

  const body = {
    id
  };

  $.ajax({
    type: 'DELETE',
    url: `${API_URL}/del_devices_light`,
    data: body,
    success: function(response) {
      location.href = '/';
    },
    error: function(error) {
      console.error(`Error: ${error}`);
    }
  });
});


$('#delete-device1').on('click', () => {
  const id = $('#name').val();

  const body = {
    id
  };

  $.ajax({
    type: 'DELETE',
    url: `${API_URL}/del_devices_ac`,
    data: body,
    success: function(response) {
      location.href = '/';
    },
    error: function(error) {
      console.error(`Error: ${error}`);
    }
  });
});


$('#delete-device2').on('click', () => {
  const id = $('#name').val();

  const body = {
    id
  };

  $.ajax({
    type: 'DELETE',
    url: `${API_URL}/del_devices_security`,
    data: body,
    success: function(response) {
      location.href = '/';
    },
    error: function(error) {
      console.error(`Error: ${error}`);
    }
  });
});

