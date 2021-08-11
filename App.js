import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';

export default class App extends React.Component  {
  state= {
    item: 'loading'
  }
  async  componentDidMount() {                           // value stay kare fetch ke baad if we reload the stimulator
     this.setState({
       item: await AsyncStorage.getItem('mykey')
     })

   }


  storeData = async () => {
    try {
      await AsyncStorage.setItem('mykey', 'AsynxStorage -- Is Activated');
      this.setState({
        item: await AsyncStorage.getItem('mykey')
      })
    } catch (error) {
      console.log(error)
    }
  }

  deleteData = async () => {
    try {
      AsyncStorage.removeItem('mykey', async () => {
        console.log("delete")
        this.setState({
          item: await AsyncStorage.getItem('mykey')
        })
      });
    } catch (error) {

    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize:40, fontWeight:'bold'}}>ASYNCSTORAGE</Text>
        <Button
          title="Store"
          onPress={this.storeData}
        />
        <Button
          title="Delete"
          onPress={this.deleteData}
        />
        <Text style={{ fontSize: 30 }}>{this.state.item}</Text>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
