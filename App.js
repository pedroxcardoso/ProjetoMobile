import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
export default function App() {

  let [filmes, setFilmes] = useState([]);

  const baseURL = 'https://api.otaviolube.com/api/filmes?populate=*';
  const imageURL = 'https://api.otaviolube.com';

  useEffect(function(){
    fetch(baseURL)
    .then(data => data.json())
    .then(objeto => {
      console.log(objeto);
      setFilmes(objeto.data);
    })
  }, []);

  return (

  <View style={styles.container}>
    
    {filmes.length > 0 ? (
      filmes.map((filme) => (
        <View key={filme._id} style={styles.filmeCont}>
                    <View style={styles.viewImg}>
          <Image style={styles.poster} source={{uri: imageURL+filme.attributes.poster.data.attributes.formats.small.url}} ></Image>
            </View> 
          <Text style={styles.titulo}>{filme.attributes.titulo}</Text>
          <Text style={styles.subtitulo}>{filme.attributes.subtitulo}</Text>
          <Text style={styles.sinopse}>{filme.attributes.sinopse}</Text>

        </View>
      ))
      
    ) : (
      <Text style={styles.loading}>Carregando...</Text>
    )}
    <StatusBar style="auto" />
  </View>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  viewImg: {
    padding: 3,
    margin: '15%',
    width: '70%',
    height: '50%',
  },

  filmeCont: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '90%',
    fontSize: 18,
    margin: 10,
    border: 'thick double #699',
  },
  
  titulo: {
    marginTop: '8%',
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center'
  },
  
  subtitulo: {
    fontSize: 15,
    color: 'gray',
    textAlign: 'center'
  },
  
  sinopse: {
    color: 'white',
    padding: 10
  },

  poster: {
    borderRadius: '10%',
    width: '100%',
    height: 500
  }
});
