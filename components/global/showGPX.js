import React, { useRef, useEffect, useState } from 'react';
import $ from 'jquery'; 

const GPXMap = ({ gpxData }) => {
//console.log( "gpxData is " + gpxData) ; 
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [results, setResults] = useState('');


  useEffect(() => {
    const script = document.createElement('script');
    console.log( "process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is " + process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) ; 
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=geometry&callback=initMap`; // YOUR_API_KEY
    script.defer = true;
    script.async = true;
    window.initMap = () => {
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: { lat: 0, lng: 0 },
        zoom: 2
      });
      setMap(mapInstance);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);


  useEffect(() => {
    if (map && gpxData) {
      parseGPX(gpxData);
    }
  }, [map, gpxData]);


  const parseGPX = (gpxData) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(gpxData, "text/xml");
    const points = [];
    const elevations = [];
    const bounds = new google.maps.LatLngBounds();
    let totalDistance = 0;
    let totalAscent = 0;
    let totalDescent = 0;

    $(xmlDoc).find("trkpt").each(function() {
      const lat = parseFloat($(this).attr("lat"));
      const lon = parseFloat($(this).attr("lon"));
      const ele = parseFloat($(this).find("ele").text());

      if (!isNaN(lat) && !isNaN(lon)) {
        const p = new google.maps.LatLng(lat, lon);
        points.push(p);
        bounds.extend(p);
        elevations.push(ele);

        if (points.length > 1) {
          totalDistance += google.maps.geometry.spherical.computeDistanceBetween(points[points.length - 2], p);
        }
      } else {
        console.error("Invalid coordinates found in GPX file.");
      }
    });

    //Elevation Calculation
    if (elevations.length > 1) {
      for (let i = 1; i < elevations.length; i++) {
        const elevationChange = elevations[i] - elevations[i - 1];
        if (elevationChange > 0) totalAscent += elevationChange;
        else totalDescent -= elevationChange;
      }
    } else if (elevations.length > 0) {
      console.warn("Only one elevation point found. Ascent/Descent cannot be calculated.");
    } else {
      console.warn("No elevation data found. Ascent/Descent cannot be calculated.");
    }

    if (points.length > 0) {
      const polyline = new google.maps.Polyline({
        path: points,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
      polyline.setMap(map);
      map.fitBounds(bounds);

      const distanceInKm = totalDistance / 1000;
      setResults(`Total Distance: ${distanceInKm.toFixed(2)} km
                 Total Ascent: ${totalAscent.toFixed(1)} m 
                 Total Descent: ${totalDescent.toFixed(1)} m`);
    } else {
      console.error("No valid coordinates found in GPX file.");
      setResults("Error: No valid coordinates found in the GPX file.");
    }
  };

  return (
    <div>
      <div ref={mapRef} style={{ width: '600px', height: '400px' }} />
      <div>{results}</div>
    </div>
  );
};

export default GPXMap;

