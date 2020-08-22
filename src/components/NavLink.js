import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import Spacer from './Spacer';

const NavLink = ({ navigation, text, routeName }) => {
	return (
		<React.Fragment>
			<TouchableOpacity onPress={() => navigation.navigate(routeName)}>
				<Spacer>
					<Text style={styles.link}>
						{text}
					</Text>
				</Spacer>
			</TouchableOpacity>
		</React.Fragment>
	);
}

const styles = StyleSheet.create({
	link: {
		color: 'blue'
	}
});

export default withNavigation(NavLink);

