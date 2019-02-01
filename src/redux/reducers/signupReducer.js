import {
    SET_SIGNUP_CREDENTIALS,
} from '../types/types_signup';

export default function(state = [], action) {

    switch (action.type) {
        case SET_SIGNUP_CREDENTIALS:
            return {
             ...state,
             email: action.payload.email
            }
    }
}
