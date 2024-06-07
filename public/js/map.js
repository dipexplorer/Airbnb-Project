// let center = [91.7086, 26.1158];
// const map = tt.map({
//     key: map_key,
//     container: "map",
//     center: center,
//     zoom: 10,
// })
// map.on('load', () => {
//     new tt.Marker().setLngLat(center).addTo(map);
// })

//geolocation
const apiKey = map_key; // Replace with your TomTom API key

const address = add;
async function getCoordinates(address) {
    const url = `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(address)}.json?key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            const { lat, lon } = data.results[0].position;
            return { lat, lon };
        } else {
            console.error('No results found');
            return null;
        }
    } catch (error) {
        console.error('Error fetching geocoding data:', error);
    }
}

async function initializeMap() {
    const coordinates = await getCoordinates(address);
    const center = [coordinates.lon, coordinates.lat];
    if (coordinates) {
        const map = tt.map({
            key: apiKey,
            container: 'map',
            center: center,
            zoom: 10
        });

        new tt.Marker().setLngLat(center).addTo(map);
        new tt.Popup({ offset: 30, closeButton: false }).setLngLat(center).setHTML(`<h4>${address}}</h4><p>Exact location provided after booking</p>`).addTo(map);
    }
}

document.addEventListener('DOMContentLoaded', initializeMap);