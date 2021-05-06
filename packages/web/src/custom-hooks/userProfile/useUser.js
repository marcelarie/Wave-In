import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { getOtherUserInfo } from '../../redux/otherUser/otherUser-actions';

function useUser() {
    const path = useLocation();
    const pathUsername = path.pathname.split('/');
    const currentUser = useSelector(store => store.user);
    const otherUser = useSelector(store => store.otherUser);
    const dispatch = useDispatch();

    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (currentUser) {
            if (currentUser.username === pathUsername[1]) {
                setUser(currentUser);
                setIsLoading(false);
            } else {
                dispatch(getOtherUserInfo(pathUsername[1]));
                setUser(otherUser);
                setIsLoading(false);
            }
        }
    }, [path, dispatch]);

    return { user, isLoading, pathUsername };
}

export default useUser;
