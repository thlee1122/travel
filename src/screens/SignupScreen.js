import React, { useContext } from 'react';
import { NavigationEvents } from 'react-navigation';
import { View, StyleSheet } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignupScreen = ({ navigation }) => {
	const { state, signup, clearErrorMessage } = useContext(AuthContext);
	
	return (
		<View style={styles.container}>
			<NavigationEvents 
				onWillBlur={clearErrorMessage}
				onWillFocus={clearErrorMessage} 
			/>
			<AuthForm 
				headerText="Sign up for Tracker"
				errorMessage={state.errorMessage}
				submitButtonText="Sign Up"
				// onSubmit={({ email, password }) => signup({ email, password })}
				onSubmit={signup}
			/>

			<NavLink
				routeName="Signin"
				text="Already have an account? Sign in instead."
			/>
		</View>
	);
}

SignupScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		marginBottom: 200
	}
});

export default SignupScreen;