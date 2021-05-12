import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { NEW_PLAYLIST } from '../../routes';
import {
    getAllPlaylists,
    // getPlaylist,
} from '../../redux/Playlists/playlists-actions';
import Carousel from '../../components/Carousel';
// import PlaylistCard from '../../components/PlaylistCard';

function MyLibrary() {
    // rename to playlistsToShow or playlistLandingPage (?)
    // const { PlaylistUpdating, PlaylistUpdatingError } = useSelector(
    //     store => store.playlists,
    // );

    const dispatch = useDispatch();
    const userPlaylists = useSelector(store => store.user.playlists);
    const userSongs = useSelector(store => store.user.songs);
    const userLikesSongs = useSelector(store => store.user.songsLikes);
    const userLikesPlaylists = useSelector(store => store.user.playlistsLikes);
    const publicPlaylists = useSelector(store => store.playlists.ids);
    // TODO: separate songs likes and playlist like on backend and integrate here
    const userFollow = useSelector(store => store.user.following);

    // get user info from redux
    // const AllPlaylists = useSelector(store => store.playlists.byID);
    // const AllPlaylistsIds = useSelector(store => store.playlists.ids);

    useEffect(() => {
        dispatch(getAllPlaylists());
        // dispatch(getUserPlaylists(userID));
    }, [dispatch]);

    if (!userPlaylists) return <p>loading...</p>;

    return (
        <div className="landingPage">
            <h1>My playlists</h1>
            <Link to={NEW_PLAYLIST}>Create playlist</Link>
            <Carousel key="myPlaylist" ids={userPlaylists} type="playlists" />
            <h1>My songs</h1>
            <Carousel key="allPlaylist" ids={userSongs} type="songs" />
            <h1>My liked songs</h1>
            <Carousel
                key="allPlaylist"
                ids={userLikesSongs}
                type="playlists"
            />
            <h1>My liked playlists</h1>
            <Carousel
                key="allPlaylist"
                ids={userLikesPlaylists}
                type="playlists"
            />
            <h1>My follows</h1>
            <Carousel key="PlaylistFollow" ids={userFollow} type="playlists" />
            <h1>Public playlists</h1>
            <Carousel key="PlaylistFollow" ids={publicPlaylists} type="playlists" />
        </div>
    );
}
export default MyLibrary;
