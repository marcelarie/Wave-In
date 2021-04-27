import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Dropzone from '../Dropzone';

import { uploadSong } from '../../redux/uploader/uploader-actions';
import { fileTypes } from '../../services/cloudinary';

function UploadSong() {
    const dispatch = useDispatch();
    const { isUploadingSong, uploadSongSuccess, uploadSongError } = useSelector(
        store => store.uploader,
    );

    const [title, setTitle] = useState('');
    const [file, setFile] = useState();

    function handleSubmit(e) {
        e.preventDefault();

        dispatch(
            uploadSong({
                track: file,
                title: title,
            }),
        );
    }

    function handleSetTitle(e) {
        setTitle(e.target.value);
    }

    function handleSetFile(uploadFile) {
        setFile(uploadFile);
    }

    return (
        <div className="h-full p-4">
            <div className="h-full w-full flex flex-col justify-center items-center">
                <div className="p-4 bg-light rounded-md flex flex-col justify-center items-center">
                    <h1 className="text-2xl text-dark font-bold mb-4">
                        Upload Song
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="title" className="form-label text-dark">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="form-input"
                            value={title}
                            onChange={handleSetTitle}
                        />
                        <Dropzone
                            fileType={fileTypes.AUDIO}
                            onFileSelected={files => {
                                handleSetFile(files[0]);
                            }}
                        />

                        <button
                            className="btn btn-primary w-full"
                            type="submit"
                            // disabled={isUploadingSong}
                        >
                            Upload
                        </button>
                    </form>

                    {isUploadingSong && (
                        <p className="text-dark">Uploading song...</p>
                    )}
                    {uploadSongSuccess && file && (
                        <p className="text-dark">Upload successful!</p>
                    )}
                    {uploadSongError && (
                        <p className="text-dark">Upload error!</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UploadSong;
