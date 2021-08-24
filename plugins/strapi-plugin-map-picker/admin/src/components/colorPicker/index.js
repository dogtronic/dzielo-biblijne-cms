import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { MapContainer, TileLayer, Marker} from '@monsonjeremy/react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet';
import {countries} from '../../utils/countries';
import { useContentManagerEditViewDataManager } from 'strapi-helper-plugin'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import { prefixFileUrlWithBackendUrl } from "strapi-helper-plugin";

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

  useEffect(() => {
    const navigateToRegion = async () => {
      const response = await fetch(
        prefixFileUrlWithBackendUrl(
          `/regions/${modifiedData.region.id}`
        )
      );
      const responseJSON = await response.json();

      const position = JSON.parse(responseJSON.position);
      map.flyTo([position.lat, position.lng]);
      props.onChange({
        target: {
          value: JSON.stringify({lat:position.lat, lng: position.lng}),
          name: props.name,
          type: props.type
        }
      });
    }
    
    if(modifiedData.region) {
      navigateToRegion();
    }
  
  }, [modifiedData.region]);
  

  useLayoutEffect(() => {
    if(props.value) {
      setTimeout(() => {
        map?.flyTo([position.lat, position.lng], undefined, {animate: false});
      }, 100)
    }
  }, [props.value, map]);

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
  