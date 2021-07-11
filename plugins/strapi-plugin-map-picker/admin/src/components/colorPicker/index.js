import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker} from '@monsonjeremy/react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet';
import {countries} from '../../utils/countries';
import { useContentManagerEditViewDataManager } from 'strapi-helper-plugin'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'

const ColorPicker = (props) => {
  const markerRef = useRef(null);
  const [map, setMap] = useState(null);

  const position = props.value ? JSON.parse(props.value) : {
    lat: 51.505,
    lng: -0.09,
  };

  const eventHandlers = {
    dragend: () => {
      const marker = markerRef.current
      if (marker != null) {
        props.onChange({
          target: {
            value: JSON.stringify(marker.getLatLng()),
            name: props.name,
            type: props.type
          }
        });
      }
    },
  };

  const {modifiedData} = useContentManagerEditViewDataManager();

  useEffect(() => {
    const country = countries.find(v => v.alpha2 === modifiedData.country);
    if(country && map) {
        map.flyTo([country.latitude, country.longitude]);
        props.onChange({
          target: {
            value: JSON.stringify({lat:country.latitude, lng: country.longitude}),
            name: props.name,
            type: props.type
          }
        });
    }
  }, [modifiedData.country]);

  // useEffect(() => {
  //   if(props.value) {
  //     map.flyTo([position.lat, position.lng]);
  //   }
  // }, [props.value]);

  return (
    <div id="mapid">
      <label>{props.label}</label>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={6}
        scrollWheelZoom={true}
        whenCreated={setMap}
        style={{height: 450, marginBottom: 20}}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={[position.lat, position.lng]}
          draggable
          ref={markerRef}
          eventHandlers={eventHandlers}
          icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}
        />
      </MapContainer>
    </div>
  );
};

export default ColorPicker;
  