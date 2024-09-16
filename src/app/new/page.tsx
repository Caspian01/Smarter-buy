'use client'
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Uploader from "@/components/Uploader";
import { useEffect, useState } from "react";
import {UploadResponse} from "imagekit/dist/libs/interfaces"
import UploadArea from "@/components/UploadArea";
import AdTextInputs from "@/components/AdTextInputs";
import LocationPicker from "@/components/LocationPicker";
import { createAd } from "../actions/adActions";
import SubmitButton from "@/components/SubmitButton";
import { redirect } from "next/navigation";


const locationDefault =  {
    lat: 59.432226005726896,
    lng: 18.057839558207103
}

export default function NewProductPage(){
    const [files, setFiles] = useState<UploadResponse[]>([]);
    const [location, setLocation] = useState<Location>(locationDefault);
    const [gpsCoords, setGpsCoords] = useState<Location|null>(null);

    function handleFindMyPositionClick() {
        navigator.geolocation.getCurrentPosition(ev => {
            const location = {lat: ev.coords.latitude, lng: ev.coords.longitude}
            setLocation(location);
            setGpsCoords(location);
        }, console.error)
    }

    async function handleSubmit(formData:FormData){
        formData.set('location', JSON.stringify(location));
        formData.set('files', JSON.stringify(files));
        const result = await createAd(formData);
        redirect('/ad/' + result._id);
    }

    return (
        <form action={handleSubmit} className="max-w-xl mx-auto grid grid-cols-2 gap-12">

            <div className="grow pt-8">

                <UploadArea files={files} setFiles={setFiles}/>
                
                <div className="mt-8">
                    <label htmlFor="">Where is it located:</label>
                    <button type="button" onClick={handleFindMyPositionClick} className="w-full flex items-center gap-1 py-1 justify-center border border-gray-400 text-gray-600 rounded">Share current location</button>
                    <div className="mt-2 bg-gray-200 min-h-12 rounded overflow-hidden text-gray-400">
                        <LocationPicker 
                        defaultLocation = {locationDefault}
                        gpsCoords = {gpsCoords}
                        onChange={location => setLocation(location)}/>
                    </div>
                </div>
            </div>

            <div className="grow pt-2">
                <AdTextInputs/>
                <SubmitButton>Publish</SubmitButton>
            </div>
        </form>
    )
}