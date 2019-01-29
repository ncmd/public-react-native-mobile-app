import {
    SET_STYLE,
} from '../actions/types';

export default function(state = [{loading: true}], action) {
    switch (action.type) {
        case SET_STYLE:
            return action.payload;
        default:
            return state;
    }
}