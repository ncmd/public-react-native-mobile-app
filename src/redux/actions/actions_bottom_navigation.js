
import {
    SET_BOTTOM_NAVIGATION
} from '../types/types_bottom_navigation';

export const setBottomNavigation = (tabname) => dispatch => {
    dispatch({ type: SET_BOTTOM_NAVIGATION, payload: tabname })
}