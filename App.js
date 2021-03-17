import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Slider from '@react-native-community/slider'
import Clipboard from 'expo-clipboard';

let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'


export default function App(){
  
  const [password, setPassword] = useState('');
  const [size, setSize] = useState(5);

  function generatePass(){
    let pass = '';
    for (let i=0, n = charset.length; i < size; i++){
      pass += charset.charAt(Math.floor(Math.random() * n))
    }
    setPassword(pass);
  }

  function clearPass(){
    let pass = '';
    setPassword(pass);
    setSize(5);
  }

  function copyPass(){
    Clipboard.setString(password);
    alert('Senha copiada');
  }
  
  return(
    <View style={styles.container}>
      
      <Image
        source={require('./src/assets/cadeado.png')}
        style={styles.logo}
      />

      <Text style={styles.title}> {size} caracteres</Text>

      <View style={styles.area}>
        <Slider
          style={{height: 50}}
          minimumValue={5}
          maximumValue={15}
          minimumTrackTintColor='#FF0000'
          maximumTrackTintColor='#D3D3D3'
          value = {size}
          onValueChange = { (valor) => setSize(valor.toFixed(0)) }
        />
        </View>

      <TouchableOpacity style={styles.button} onPress={generatePass}>
        <Text style={styles.buttonText}>Gerar Senha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={clearPass}>
        <Text style={styles.buttonText}>Limpar</Text>
      </TouchableOpacity>

      {password !== '' && (
      <View style={styles.area}>
        <Text style={styles.password} onLongPress={copyPass}> {password} </Text>
      </View>
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0FFFF'
  },
  logo:{
    marginBottom: 60
  },
  title:{
    fontSize: 30,
    fontWeight: 'bold'
  },
  area:{
    marginTop: 15,
    marginBottom: 25,
    backgroundColor: '#FFF',
    width: '90%',
    borderRadius: 8
  },
  button:{
    backgroundColor: '#FFA500',
    width: '90%',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25
  },
  buttonText:{
    fontSize: 20,
    color:'#FFF',
    fontWeight: 'bold'
  },
  password:{
    fontSize: 20,
    padding: 10,
    textAlign: 'center'
  }
})