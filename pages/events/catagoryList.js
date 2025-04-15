// CatagoryList.js (or the file containing your CatagoryList and GoogleMapsProvider)

import React, { useState, useEffect, useRef, useCallback, useContext } from "react";
import Layout from "../../components/global/layout";
import InnerPageLayout from "../../components/inner-page-layout";
import Link from "next/link";
import Card from 'react-bootstrap/Card';
import DOMPurify from 'dompurify';
import { useSearchParams } from 'next/navigation';
import { API_URL } from "../../config";

export const GoogleMapsContext = React.createContext(null);

export const GoogleMapsProvider = ({ children }) => {
  const [google, setGoogle] = useState(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const initMap = useCallback(() => {
    setGoogle(window.google);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!apiKey) {
      setError("Google Maps API key is missing.");
      setLoading(false);
      return;
    }

    if (!window.google) {
      setLoading(true);
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry&callback=initMap`;
      script.defer = true;
      script.async = true;
      window.initMap = initMap;
      script.onerror = () => {
        setError("Failed to load Google Maps API.");
        setLoading(false);
      };
      document.body.appendChild(script);

      return () => {
        const scripts = document.querySelectorAll(`script[src*="maps.googleapis.com/maps/api/js"]`);
        scripts.forEach((s) => document.body.removeChild(s));
        window.initMap = null;
      };
    } else if (!google) {
      initMap();
    }
  }, [apiKey, initMap, google]);

  return (
    <GoogleMapsContext.Provider value={{ google, loading, error }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};

const GPXMap = ({ gpxData }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [results, setResults] = useState('');
  const [mapError, setMapError] = useState(null);
  const { google, loading: googleLoading, error: googleError } = useContext(GoogleMapsContext);

  // Handle Google Maps loading errors from the Provider
  if (googleError) {
    console.error("Google Maps API load error in GPXMap:", googleError);
    return <div className="alert alert-danger">Error loading Google Maps. Please try again later.</div>;
  }

  // Show loading state while Google Maps is loading
  if (!google && googleLoading) {
    return <div>Loading Google Maps...</div>;
  }

  useEffect(() => {
    if (google && mapRef.current && !map && !mapError) {
      try {
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: { lat: 0, lng: 0 },
          zoom: 12,
        });
        setMap(mapInstance);
      } catch (error) {
        console.error("Error initializing Google Map:", error);
        setMapError("Not able to show route map at the moment, please try again later.");
      }
    }
  }, [google, map, mapError]);

  useEffect(() => {
    if (map && gpxData && google && !mapError) {
      try {
        parseGPX(gpxData, google);
      } catch (error) {
        console.error("Error parsing GPX or rendering route:", error);
        setMapError("Not able to show route map at the moment, please try again later.");
        if (map) {
          map.setMap(null);
          setMap(null);
        }
      }
    }
  }, [map, gpxData, google, mapError]);

  const parseGPX = (gpxData, google) => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(gpxData, 'text/xml');
      const trackPoints = xmlDoc.querySelectorAll('trkpt');
      const points = [];
      const elevations = [];
      const bounds = new google.maps.LatLngBounds();
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
            const latLng = new google.maps.LatLng(lat, lon);
            points.push(latLng);
            bounds.extend(latLng);

            if (points.length > 1) {
              totalDistance += google.maps.geometry.spherical.computeDistanceBetween(
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
        const polyline = new google.maps.Polyline({
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
    } catch (error) {
      console.error("Error during GPX parsing:", error);
      throw error; // Re-throw to be caught in the useEffect
    }
  };

  if (mapError) {
    return <div className="alert alert-danger">{mapError}</div>;
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      <div style={{ position: 'absolute', bottom: '0', left: '0', backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '5px', fontSize: '0.8em' }}>{results}</div>
    </div>
  );
};

const CatagoryList = () => {
  const searchParams = useSearchParams();
  const [event_id, setEventId] = useState(null);
  const [event, setEvent] = useState(null);
  const [eventCat, setEventCat] = useState([]);
  const [enrollmentUrl, setEnrollmentUrl] = useState("");

  useEffect(() => {
    const eventId = searchParams.get("event_id");
    if (eventId) {
      setEventId(eventId);
      setEnrollmentUrl(`/enrollment?event_id=${eventId}&event_catagory=`);
      getEvent(eventId).then((eventData) => {
        setEvent(eventData);
        setEventCat(eventData?.data?.attributes?.event_catagories || []);
      });
    }
  }, [searchParams]);

  if (!event) {
    return (
      <div style={{ paddingLeft: "50px", paddingRight: "50px" }}>
        <Layout title={"Catagory"}>
          <InnerPageLayout title={"Select Catagory"} />
          <p>Loading event details...</p>
        </Layout>
      </div>
    );
  }

  return (
    <div style={{ paddingLeft: "50px", paddingRight: "50px" }}>
      <Layout title={"Catagory"}>
        <InnerPageLayout title={"Select Catagory"} />
        {eventCat.map((event_cat) => (
          <div className="singlePage section-padding" key={event_cat.id}>
            <Card className="d-flex flex-row">
              <div style={{ width: '50%', padding: '15px' }}>
                <Card.Header as="h5">{event_cat.event_catagory}</Card.Header>
                <Card.Body>
                  <Card.Title>Rs. {event_cat.price}</Card.Title>
                  <Card.Text
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(event_cat.event_catagory_desc),
                    }}
                  />
                  <Link
                    className="button w-40 mt-4"
                    target="_self"
                    href={`${enrollmentUrl}${event_cat.event_catagory}`}
                  >
                    Book
                  </Link>
                </Card.Body>
              </div>
              <div style={{ width: '50%', height: '300px' }}>
                {event_cat.gpxFile && (
                  <React.StrictMode>
                    <GPXMap gpxData={event_cat.gpxFile} />
                  </React.StrictMode>
                )}
              </div>
            </Card>
          </div>
        ))}
      </Layout>
    </div>
  );
};

const CatagoryListPage = () => (
  <GoogleMapsProvider>
    <CatagoryList />
  </GoogleMapsProvider>
);

export default CatagoryListPage;

async function getEvent(event_id) {
  console.log("calling get event for event_id " + event_id);
  const EVENT_URL = API_URL + "/api/events/" + event_id + "?populate=*";
  console.log("new event URL is " + EVENT_URL);
  const res = await fetch(EVENT_URL);
  return await res.json();
}
