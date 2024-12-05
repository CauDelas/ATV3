import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    fetch('http://10.0.0.166:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Login bem-sucedido!') {
          authenticateWithBiometrics(navigation);
        } else {
          setErrorMessage('Credenciais inválidas!');
        }
      })
      .catch((error) => {
        console.error('Erro no login:', error);
      });
  };

  const authenticateWithBiometrics = (navigation) => {
    LocalAuthentication.hasHardwareAsync()
      .then((hasHardware) => {
        if (hasHardware) {
          LocalAuthentication.authenticateAsync({
            promptMessage: 'Por favor, autentique-se usando sua digital.',
            fallbackLabel: 'Usar senha', 
          })
            .then((result) => {
              if (result.success) {
                navigation.navigate('Success');
              } else {
                Alert.alert('Falha na autenticação', 'Não foi possível autenticar sua digital.');
              }
            })
            .catch(() => {
              Alert.alert('Erro', 'Erro ao tentar autenticar com biometria.');
            });
        } else {
          Alert.alert('Erro', 'Seu dispositivo não suporta autenticação biométrica.');
        }
      })
      .catch(() => {
        Alert.alert('Erro', 'Erro ao verificar o hardware biométrico.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 48,  
    fontWeight: 'bold',
    marginBottom: 50,  
    textAlign: 'center',
    color: '#4A90E2',  
    position: 'absolute',  
    top: 60,  
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    width: '80%',
    paddingLeft: 8,
    borderRadius: 5,  
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
  successMessage: {
    fontSize: 24,
    color: 'green',
  },
});

export default LoginScreen;
