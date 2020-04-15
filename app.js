document.querySelector('#zipForm').addEventListener('submit', getLocationInfo);

function getLocationInfo(e) {
    const zip = document.querySelector('.zip').value;

    fetch(`http://api.zippopotam.us/pl/${zip}`)
        .then(response => {
            if (response.status !== 200) {
                document.querySelector('#output').innerHTML =
                    `<article class="message message-body is-danger">Zły kod pocztowy</article>`;
                throw Error(response.statusText);
            } else {
                return response.json();
            }
        })
        .then(data => {
            let output = '';
            data.places.forEach(place => {
                output += `
                <article class="message is-primary">
                  <div class="message-header">
                    <p>Location Info</p>
                  </div>
                  <div class="message-body">
                    <ul>
                      <li><strong>City: </strong>${place["place name"]}</li>
                      <li><strong>State: </strong>${place["state"]}</li>
                      <li><strong>Longitude: </strong>${place["longitude"]}</li>
                      <li><strong>Latitude: </strong>${place["latitude"]}</li>
                    </ul>
                  </div>
                </article>
              `;
            })
            document.querySelector('#output').innerHTML = output;
        })
        .catch(err => console.log(err));
    e.preventDefault();
}