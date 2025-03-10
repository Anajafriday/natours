export const renderMap = (locations) => {
  var map = L.map("map", { zoomControl: false });

  L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const defaultIcon = new L.icon({
    iconUrl: "/img/pin.png",
    iconSize: [32, 40],
    popupAnchor: [0, -10],
  });

  const points = [];
  locations.forEach((loc) => {
    // in the location coordinate we have lng first before lat and in leaflet we need lat first befor lng
    points.push([loc.coordinates[1], loc.coordinates[0]]);
    L.marker([loc.coordinates[1], loc.coordinates[0]], {
      icon: defaultIcon,
    })
      .addTo(map)
      .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, {
        autoClose: false,
        closeOnClick: false,
      });
  });

  const bounds = L.latLngBounds(points).pad(0.5);
  map.fitBounds(bounds);

  map.scrollWheelZoom.disable();
};
