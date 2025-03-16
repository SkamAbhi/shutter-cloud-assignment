import { useEffect, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";

const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface LocationMarkerProps {
  setLatitude: (latitude: string) => void;
  setLongitude: (longitude: string) => void;
}

const LocationMarker = ({ setLatitude, setLongitude }: LocationMarkerProps) => {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setLatitude(e.latlng.lat.toString());
      setLongitude(e.latlng.lng.toString());
    },
  });

  useEffect(() => {
    map.locate().on("locationfound", (e) => {
      setPosition(e.latlng);
      setLatitude(e.latlng.lat.toString());
      setLongitude(e.latlng.lng.toString());
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map, setLatitude, setLongitude]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

export default LocationMarker;
