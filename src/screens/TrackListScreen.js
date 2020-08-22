import React, { useContext } from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { Context as TrackContext } from '../context/TrackContext';

const TrackListScreen = ({ navigation }) => {
	const { state, fetchTracks } = useContext(TrackContext);

	console.log(state);

	return (
		<React.Fragment>
			<NavigationEvents onWillFocus={fetchTracks} />
			<FlatList
				data={state}
				keyExtractor={item => item._id}
				renderItem={({ item }) => {
					return <TouchableOpacity onPress={() => {
						navigation.navigate('TrackDetail', { _id: item._id })
					}}>
						<ListItem chevron={true} title={item.name} />
					</TouchableOpacity>
				}}
			/>
			
		</React.Fragment>
	);
}

TrackListScreen.navigationOptions = {
	title: 'Tracks'
}

const styles = StyleSheet.create({});

export default TrackListScreen;