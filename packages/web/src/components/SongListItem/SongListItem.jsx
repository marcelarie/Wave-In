import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './styles.scss';

import { play } from '../../redux/audioPlayer/audioPlayer-actions';

import SongListItemStyle from './styles';

function SongListItem({ song, handleAddToPlaylist, handleRemoveToPlaylist }) {
    const [itemSelected, setItemSelected] = useState(false);
    const dispatch = useDispatch();

    function reproduceSong() {
        dispatch(play(song.url));
    }

    return (
        <SongListItemStyle key={song._id} image={song.imageUrl}>
            <section
                className={
                    itemSelected ? 'songListItem selected' : 'songListItem'
                }
                role="button"
                tabIndex={0}
                onMouseDown={e => {
                    if (
                        !e.target.parentNode.className.includes('selected') &&
                        e.target.parentNode.className === 'songListItem'
                    ) {
                        setItemSelected(!itemSelected);
                        handleAddToPlaylist(song._id);
                    } else if (
                        e.target.parentNode.className ===
                        'songListItem selected'
                    ) {
                        setItemSelected(!itemSelected);
                        handleRemoveToPlaylist(song._id);
                    }
                }}
            >
                <div className="songListItem__img">
                    <img
                        src={
                            song.imageUrl ||
                            'https://picsum.photos/seed/picsum/500'
                        }
                        alt="songimg"
                    />
                </div>
                <div className="songListItem__content">
                    <p className="songListItem__content__title">{song.name}</p>
                    <button
                        className="songListItem__content__playButton"
                        type="button"
                        onClick={() => reproduceSong(song._id)}
                    >
                        <svg
                            version="1.1"
                            id="Capa_1"
                            x="0px"
                            y="0px"
                            width="23.861px"
                            height="23.861px"
                            viewBox="0 0 163.861 163.861"
                        >
                            <g>
                                <path
                                    d="M34.857,3.613C20.084-4.861,8.107,2.081,8.107,19.106v125.637c0,17.042,11.977,23.975,26.75,15.509L144.67,97.275
		c14.778-8.477,14.778-22.211,0-30.686L34.857,3.613z"
                                />
                            </g>
                        </svg>
                    </button>
                    {/* <div className="songListItem__addSongButton__container">
                    <label htmlFor="addSongButton">Add song</label>
                    <input
                        id="addSongButton"
                        className="songListItem__addSongButton"
                        type="checkbox"
                        onChange={() => setItemSelected(!itemSelected)}
                        onClick={e => {
                            if (e.target.checked) {
                                handleClick();
                            }
                        }}
                    />
                </div> */}
                </div>
            </section>
        </SongListItemStyle>
    );
}

export default SongListItem;
