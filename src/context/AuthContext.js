import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
	switch(action.type) {
		case 'add_error':
			return { ...state, errorMessage: action.payload };

		// case 'signup':
		// 	return { errorMessage: '', token: action.payload };

		case 'signin': 
			return { errorMessage: '', token: action.payload };

		case 'signout':
			return { token: null, errorMessage: '' };

		case 'clear_error_message':
			return { ...state, errorMessage: '' }

		default:
			return state;
	}
};

const tryLocalSignin = dispatch => async () => {
	const token = await AsyncStorage.getItem('token');

	if(token) {
		dispatch({type: 'signin', payload: token });
		navigate('TrackList');
	} else {
		navigate('loginFlow');
	}
};

const clearErrorMessage = dispatch => () => {
	dispatch({ type: 'clear_error_message' });
};

const signup = (dispatch) => {
	return async ({ email, password }) => {
		// make api request to sign up with that email and password

		// if we sign up, modify our state, and say that we are authenticated. 

		// if signing up fails, we probably need to reflect an error message. 

		try {
			const response = await trackerApi.post('/signup', { email, password });
			await AsyncStorage.setItem('token', response.data.token);

			dispatch({ type: 'signin', payload: response.data.token });

			navigate('TrackList');

		} catch (err) {
			dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' })
		}
	}
}

const signin = (dispatch) => async ({ email, password }) => {
	// try to sign in
	// Handle success by updating state
	// Handle failure by showing error message (somehow)

	try {
		const response = await trackerApi.post('/signin', { email, password });
		await AsyncStorage.setItem('token', response.data.token);

		dispatch({ type: 'signin', payload: response.data.token });

		navigate('TrackList');

	} catch(err) {
		dispatch({ 
			type: 'add_error', 
			payload: 'Something went wrong with sign in' 
		});
	}
};

const signout = (dispatch) => async () => {
	await AsyncStorage.removeItem('token');
	dispatch({ type: 'signout' });
	navigate('loginFlow')
}

export const { Provider, Context } = createDataContext(
	authReducer,
	{ signin, signout, signup, clearErrorMessage, tryLocalSignin },
	{ token: null, errorMessage: '' }
);