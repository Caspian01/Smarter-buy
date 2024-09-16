'use client'

import AdItem from "@/components/AdItem";
import { Ad } from "@/models/Ad";
import { useEffect, useState } from "react";

export default function Home(){
  const [ads, setAds] = useState<Ad[]>([]);
  useEffect(() =>{
    fetchAds() 
  },[]);

  function fetchAds(params:URLSearchParams){
    fetch('/api/ads').then(response =>{
      response.json().then(adsDocs =>{
        setAds(adsDocs);
      });
    });
  }

  function handleSearch(formData: FormData){
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      if (typeof value === 'string'){
        params.set(key, value);
      }
    });
    const url = `/api/ads?${params.toString()}` as string;
    console.log({url});
  }

  return(
    <div className="flex w-full">
      <form
        action={handleSearch}
        className="bg-white grow w-1/4 p-4 border-r">
        <input name="phrase" type="text" placeholder="💡Search Smarter..."/>
      </form>
      <div className="p-4 grow bg-gray-200 w-3/4">
        <h2 className="font-bold mt-4 mb-2">Latest Products</h2>
        <div className="grid grid-cols-5 gap-4">
          {ads.map(ad =>(
            <AdItem key={ad._id} ad={ad}/>
          ))}
        </div>
        
      </div>
    </div>
  )
}