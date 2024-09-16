'use client';
import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export type Location = {
    lat: number;
    lng: number;
};

export default function LocationPicker({
    defaultLocation,
    onChange,
    gpsCoords,
}: {
    defaultLocation: Location;
    onChange: (location: Location) => void;
    gpsCoords: Location | null;
}) {
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [pin, setPin] = useState<google.maps.Marker | null>(null);
    const divRef = useRef<HTMLDivElement>(null);

    async function loadMap() {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_MAPS_KEY as string,
        });
        const google = await loader.load(); // Load the whole library

        const mapInstance = new google.maps.Map(divRef.current as HTMLDivElement, {
            center: defaultLocation,
            zoom: 8,
            mapTypeControl: false,
            streetViewControl: false,
        });

        const markerInstance = new google.maps.Marker({
            position: defaultLocation,
            map: mapInstance,
        });

        mapInstance.addListener('click', (ev: google.maps.MapMouseEvent) => {
            const position = ev.latLng;
            if (position) {
                const lat = position.lat();
                const lng = position.lng();
                markerInstance.setPosition(position);
                onChange({ lat, lng });
            }
        });

        setMap(mapInstance);
        setPin(markerInstance);
    }

    useEffect(() => {
        loadMap();
    }, []);

    useEffect(() => {
        if (map && pin && gpsCoords) {
            map.setCenter(gpsCoords);
            pin.setPosition(gpsCoords);
        }
    }, [gpsCoords, map, pin]);

    return <div ref={divRef} id="mapElem" className="w-full h-[200px]"></div>;
}
