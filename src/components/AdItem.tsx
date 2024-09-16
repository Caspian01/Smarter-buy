'use client';
import UploadThumbnail from "@/components/UploadThumbnail";
import {Ad} from "@/models/Ad";
import Link from "next/link";

export default function AdItem({ad}:{ad:Ad}) {
  return (
    <div className="border-red-500 min-h-24 flex flex-col justify-start">
      {ad.files?.length >0 && (
        <div className="rounded-xl overflow-hidden relative">
          <UploadThumbnail onClick={() => {}} file={ad.files[0]}/>
            <Link href={`/ad/${ad._id}`} className="absolute inset-0"></Link>
        </div>
      )}
      <div>
        <p className="mt-1 font-bold">${ad.price}.00</p>
        <Link href={`/ad/${ad._id}`}>{ad.title}</Link>
      </div>
    </div>
  );
}