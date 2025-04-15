import React, { useRef, useEffect, useState } from 'react';

const GPXMap = ({ gpxData }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [results, setResults] = useState('');
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Ensure this is in your .env.local file

  useEffect(() => {
    if (!googleMapsApiKey) {
      console.error("Google Maps API key is missing. Ensure NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is set in your .env.local file.");
      setResults("Error: Google Maps API key is missing.");
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=geometry&callback=initMap`;
    script.defer = true;
    script.async = true;

    window.initMap = () => {
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: { lat: 0, lng: 0 },
        zoom: 2,
      });
      setMap(mapInstance);
    };

    document.body.appendChild(script);

    return () => {
      const scripts = document.querySelectorAll(`script[src*="maps.googleapis.com/maps/api/js"]`);
      scripts.forEach((s) => document.body.removeChild(s));
      window.initMap = null;
    };
  }, [googleMapsApiKey]);

  useEffect(() => {
    if (map && gpxData) {
      parseGPX(gpxData);
    }
  }, [map, gpxData]);

  const parseGPX = (gpxData) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(gpxData, 'text/xml');
    const trackPoints = xmlDoc.querySelectorAll('trkpt');
    const points = [];
    const elevations = [];
    const bounds = new window.google.maps.LatLngBounds();
    let totalDistance = 0;
    let totalAscent = 0;
    let totalDescent = 0;
    let previousElevation = null;

    trackPoints.forEach((trkpt) => {
      const latAttr = trkpt.getAttribute('lat');
      const lonAttr = trkpt.getAttribute('lon');
      const eleElement = trkpt.querySelector('ele');

      if (latAttr && lonAttr) {
        const lat = parseFloat(latAttr);
        const lon = parseFloat(lonAttr);

        if (!isNaN(lat) && !isNaN(lon)) {
          const latLng = new window.google.maps.LatLng(lat, lon);
          points.push(latLng);
          bounds.extend(latLng);

          if (points.length > 1) {
            totalDistance += window.google.maps.geometry.spherical.computeDistanceBetween(
              points[points.length - 2],
              latLng
            );
          }

          if (eleElement) {
            const ele = parseFloat(eleElement.textContent);
            if (!isNaN(ele)) {
              elevations.push(ele);
              if (previousElevation !== null) {
                const elevationChange = ele - previousElevation;
                if (elevationChange > 0) {
                  totalAscent += elevationChange;
                } else if (elevationChange < 0) {
                  totalDescent -= elevationChange;
                }
              }
              previousElevation = ele;
            }
          }
        } else {
          console.error('Invalid coordinates found in GPX file.');
        }
      } else {
        console.error('Missing lat or lon attribute in a trkpt element.');
      }
    });

    if (points.length > 0) {
      const polyline = new window.google.maps.Polyline({
        path: points,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      polyline.setMap(map);
      map.fitBounds(bounds);

      const distanceInKm = totalDistance / 1000;
      setResults(
        `Total Distance: ${distanceInKm.toFixed(2)} km, Total Ascent: ${totalAscent.toFixed(1)} m, Total Descent: ${totalDescent.toFixed(1)} m`
      );
    } else {
      console.error('No valid coordinates found in GPX file.');
      setResults('Error: No valid coordinates found in the GPX file.');
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
