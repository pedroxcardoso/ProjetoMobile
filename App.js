import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-web';
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
   
   <SafeAreaView style={styles.content}>
    {filmes.length > 0 ? (
      filmes.map((filme) => (
        <View key={filme._id} style={styles.filmCont}>
              <View style={styles.imgCont}>
                
            <Image style={styles.poster} source={{uri: imageURL+filme.attributes.poster.data.attributes.formats.small.url}} ></Image>
              </View> 
          <Text style={styles.titulo}>{filme.attributes.titulo}</Text>
          <Text style={styles.subtitulo}>{filme.attributes.subtitulo}</Text>
          <Text style={styles.sinopse}>{filme.attributes.sinopse}</Text>
          <TouchableOpacity style={styles.but}>
            <Text style={styles.butText}>Horários</Text>
          </TouchableOpacity>
        </View>
      ))
    ) : (
      <Text style={styles.loading}>Carregando catálogo...</Text>
    )}
    <StatusBar style="auto" />
    </SafeAreaView> 

  </View>
);

}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
   },

  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  imgCont: {
    padding: 3,
    margin: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    height: '50%',
  },

  filmCont: {
    alignItems: "center",
    justifyContent: "center",
    width: 500,
    maxHeight: 720,
    margin: 15,
    paddingBottom: 20,
    borderRadius: 15,
    backgroundColor: '#4C4E52',
    border: '1px solid red'
  },
  
  titulo: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center'
  },
  
  subtitulo: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center'
  },
  
  sinopse: {
    color: 'white',
    padding: 10,
    maxWidth: 400
  },

  poster: {
    borderRadius: '10%',
    width: '100%',
    height: 400
  },

  loading: {
    fontSize: 15
  },

  but: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'red',
    color: 'white'
  },

  butText: {
    color: 'white',
    fontWeight: 'bold'
  }
});
