import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import axios from "axios";

// Declaração do componente principal da aplicação
export default function App(){
  // usuários como array de estudo
  const [users, setUsers] = useState([]);
  // Definir a URL da API que será consumida
  const API = "http://10.110.12.43:3000/users";

  //Função assíncrona para buscar a linha de usuários da API
  const fetchUsers = async() => {
    try{
    // Faz requisição GET para a URL da API
    const response = await axios.get(API);
    //Atualização da variável de estado users
    setUsers(response.data);
    }catch(error){
      console.error("Error GET: ", error.message);
    }
  };

  //Função assíncrona para excluir um usuário pelo ID
  const deleteUser = async() => {
    try{
      // Faz uma requisição de DELETE para a url da API, incluindo o ID do usuário a ser excluído
      await axios.delete(`${API}/${id}`);
      // Filtra a lista de usuários, removendo o usuário do respectivo id informado.
      setUsers(users.filter((u)=> u.id !== id));
    }catch(error){
      console.error("Error DELETE: ", error.message);
  }
}

  useEffect(() => {
    fetchUsers();
  }, []);

   return (
    <View style={styles.container}>
      <Text style={styles.title}>DELETE - Remover Usuário</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text>
              id:{item.id} {item.name} - {item.email}
            </Text>
            <Button title="Del" onPress={() => deleteUser(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex:1, padding:20, marginTop:40},
  title: {fontSize: 22, fontWeight:"bold", marginBottom:10},
  userItem: {marginVertical:10}
})