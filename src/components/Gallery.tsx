'use client'
import { UploadResponse } from "imagekit/dist/libs/interfaces";
import UploadView from "./UploadView";
import UploadThumbnail from "./UploadThumbnail";
import { useState } from "react";
import MyImage from "./MyImage";


export default function Gallery({files}:{files:UploadResponse[]}){
    const [activeFile, setActiveFile] = useState<UploadResponse | null>(files?.[0] || null)
    function next() {
        const activeFileIndex = files.findIndex(f => f.fileId === activeFile?.fileId);
        const nextIndex = activeFileIndex === files.length - 1 ? 0 : activeFileIndex + 1;
        const nextFile = files[nextIndex];
        setActiveFile(nextFile);
      }
    function prev() {
    const activeFileIndex = files.findIndex(f => f.fileId === activeFile?.fileId);
    const prevIndex = activeFileIndex === 0 ? files.length - 1 : activeFileIndex - 1;
    const prevFile = files[prevIndex];
    setActiveFile(prevFile);
    }
    return(
        <>
            <div className="grow flex items-center relative">
            {activeFile && (
                <>
                    <div className="absolute inset-0 overflow-hidden">
                    <MyImage
                        src={activeFile.filePath}
                        alt={'bg'}
                        width={2048} height={2048}
                        className="object-cover opacity-20 blur w-full h-full"
                    />
                    </div>
                    <div className="absolute inset-4 flex items-center justify-center">
                        <UploadView file={activeFile}/>
                    </div>

                    <div className="absolute inset-4 flex items-center">
                        <div className="flex justify-between w-full">
                        <button
                        onClick={prev}
                        className="rounded-full size-12 flex justify-center items-center p-2 bg-gray-500/40 hover:bg-gray-500/80"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" /><span className="material-symbols-outlined">arrow_back_ios</span></button>

                        <button 
                        onClick={next}
                        className="rounded-full size-12 flex justify-center items-center p-2 bg-gray-500/40 hover:bg-gray-500/80"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" /><span className="material-symbols-outlined">arrow_forward_ios</span></button>
                        </div>
                    </div>
                </>
                
            )}
            </div>
            <div className="p-4 flex gap-4 justify-center relative z-10">
                {files.map(file => (
                    <div 
                        key={file.fileId}
                        className="size-14 cursor-pointer rounded overflow-hidden">
                        <UploadThumbnail onClick={() => setActiveFile(file)} file={file}/>
                    </div>
                    ))}
            </div>
        </>
    );
};