import {
    SET_BOTTOM_NAVIGATION,
} from '../types/types_bottom_navigation';

export default function(state = {bottomnavigation:'portfolio',loading: true}, action) {
    switch (action.type) {
        case SET_BOTTOM_NAVIGATION:
            return action.payload;
        default:
            return state;
    }
}