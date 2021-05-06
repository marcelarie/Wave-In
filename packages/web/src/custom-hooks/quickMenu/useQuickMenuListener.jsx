import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../redux/quickMenu/quickMenu-actions';
import { openPlaylistModal } from '../../redux/quickPlaylsitMenu/quickPlaylistMenu-actions';

// close quickMenu on any click outside the menu
function useQuickMenuListener() {
    const dispatch = useDispatch();
    const { open } = useSelector(({ quickMenu }) => quickMenu);

    useEffect(() => {
        const quickMenuListener = e => {
            if (open) {
                try {
                    if (
                        !(
                            e.target.classList.contains('quickMenu') ||
                            e.target.classList.contains('quickPlaylistMenu')
                        )
                    ) {
                        dispatch(openModal(false));
                        dispatch(openPlaylistModal(false));
                    }
                } catch (error) {
                    dispatch(openModal(false));
                    dispatch(openPlaylistModal(false));
                }
            }
        };
        window.addEventListener('mousedown', quickMenuListener);
        return () => window.removeEventListener('mousedown', quickMenuListener);
    }, [open, dispatch]);
}

export default useQuickMenuListener;
