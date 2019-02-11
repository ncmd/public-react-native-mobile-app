import {
    HAS_PIN,
} from '../types/types_account';

export default function (state = [{ has_pin: false, loading: true }], action) {

    switch (action.type) {
        case HAS_PIN:
            return action.payload;
        default:
            return state
    }
}
