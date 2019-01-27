import {
    SET_STYLE,
} from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case SET_STYLE:
            return action.payload;
        default:
            return state;
    }
}