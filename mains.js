//get Data
let fetchButton = document.getElementById('buttonInput');
let input = document.getElementById('inputIP');
const containerDetails = document.getElementById('box');
const mapsContainer = document.getElementById('maps');
fetchButton
	.addEventListener('click', () => {
		let searchIP = input.value;
		fetch(
			`
		https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_IqaOVPyAnIrIZCpFR8UP3mLPojM8w&ipAddress=${searchIP}`
		)
			.then((response) => {
				console.log(response);
				if (response.ok) {
					return response.json();
				} else {
					alert("Sorry, We can't find this address, please try again!");
					throw new Error(response.statusText);
				}
			})
			.then((data) => {
				{
					console.log(data);
					containerDetails.innerHTML = '';
					const location = containerDetails.appendChild(
						document.createElement('div')
					);
					const IPAddress = containerDetails.appendChild(
						document.createElement('div')
					);
					const timeZone = containerDetails.appendChild(
						document.createElement('div')
					);
					const isp = containerDetails.appendChild(
						document.createElement('div')
					);
					location.id = 'location';
					IPAddress.id = 'IPAddresslocation';
					timeZone.id = 'timeZonelocation';
					isp.id = 'isplocation';
					const lineFirst = document.createElement('hr');
					const lineSecond = document.createElement('hr');
					const lineThird = document.createElement('hr');
					lineFirst.className = 'line1';
					lineSecond.className = 'line2';
					lineThird.className = 'line3';
					location.innerHTML =
						'<div class = "title">location: </div>' +
						`<span>${data.location.city}, ${data.location.country}, ${data.location.geonameId}</span>`;
					IPAddress.innerHTML =
						'<div class = "title" > IP Address: </div>' +
						`<span>${data.ip}</span>`;
					timeZone.innerHTML =
						'<div class ="title"> Time Zone: </div>' +
						`<span>${data.location.timezone}</span>`;
					isp.innerHTML =
						'<div class = "title">ISP: </div> ' + `<span>${data.isp}</span>`;

					containerDetails.appendChild(location);
					containerDetails.appendChild(lineFirst);
					containerDetails.appendChild(IPAddress);
					containerDetails.appendChild(lineSecond);
					containerDetails.appendChild(timeZone);
					containerDetails.appendChild(lineThird);
					containerDetails.appendChild(isp);
				}
				{
					mapsContainer.innerHTML = '';
					const maps = mapsContainer.appendChild(document.createElement('div'));
					console.log(data);
					maps.id = 'googleMap';
					maps.innerHTML = `<iframe src="https://maps.google.com/maps?q=${data.location.lat},${data.location.lng}&hl=es;z=14&amp;output=embed"  title="my maps"
				width="1000%"
				height="500px"></iframe>`;
				}
			});
	})
	.catch((error) => {
		debugger;
		containerDetails.innerHTML = error.message;
	});
