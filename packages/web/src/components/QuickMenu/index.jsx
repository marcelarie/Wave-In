import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addToQueue,
    deleteInAudioplayer,
} from '../../redux/audioPlayer/audioPlayer-actions';
import { openModal } from '../../redux/quickMenu/quickMenu-actions';
import { deleteSongByID } from '../../redux/songs/songs-actions';
import QuickMenuStyle from './styles';

import {
    UseQuickPlaylistMenu,
    useQuickPlaylistMenuListener,
} from '../../custom-hooks/quickPlaylistMenu';

const QuickMenu = () => {
    const dispatch = useDispatch();
    const { positionX, positionY, id } = useSelector(
        ({ quickMenu }) => quickMenu,
    );
    const audioPlayer = useSelector(state => state.audioPlayer);

    const [openPlaylistMenu] = UseQuickPlaylistMenu();

    const handleClick = () => {
        dispatch(openModal(false));
    };

    const addSongToQueue = () => {
        dispatch(addToQueue(id));
        dispatch(openModal(false));
    };

    const deleteSong = () => {
        dispatch(deleteSongByID(id));
        dispatch(deleteInAudioplayer(id, audioPlayer));
        dispatch(openModal(false));
    };

    const callOpenPlaylistMenu = e => openPlaylistMenu(e, id);

    useQuickPlaylistMenuListener();
    return (
        <QuickMenuStyle x={positionX} y={positionY}>
            <ul>
                <li>
                    <button
                        className="quickMenu"
                        type="button"
                        onClick={callOpenPlaylistMenu}
                    >
                        Add to playlist
                    </button>
                </li>
                <li>
                    <button
                        className="quickMenu"
                        type="button"
                        onClick={addSongToQueue}
                    >
                        Add to queue
                    </button>
                </li>
                {true && (
                    <li>
                        <button
                            className="quickMenu"
                            type="button"
                            onClick={handleClick}
                        >
                            Edit
                        </button>
                    </li>
                )}
                {true && (
                    <li>
                        <button
                            className="quickMenu"
                            type="button"
                            onClick={deleteSong}
                        >
                            Delete
                        </button>
                    </li>
                )}
            </ul>
        </QuickMenuStyle>
    );
};

export default QuickMenu;
