import {
    HAS_PIN,
} from '../types/types_pin';

export const yes_pin = () => dispatch => {
    dispatch({ type: HAS_PIN, payload: true });
}
export const no_pin = () => dispatch => {
    dispatch({ type: HAS_PIN, payload: false });
}

// export const get_pin = () => dispatch => {
//     dispatch({ type: HAS_PIN, payload: true });
// }

// export const create_pin = () => dispatch => {
//     dispatch({ type: create_pin, payload: false });
// }

// export const delete_pin = () => dispatch => {
//     dispatch({ type: DELETE_PIN, payload: false });
// }