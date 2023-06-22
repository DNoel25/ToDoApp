import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import { firebase } from '../config';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
// import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';


const Home = () => {
    //fetch the database from the document called Todo
    const [todos, setTodos] = useState([]);
    const todoRef = firebase.firestore().collection('todos'); 
    const [addData, setAddData] = useState('');
    const navigation = useNavigation();

    //fetch or read the ddata from firestore
    useEffect(() => {
        todoRef
        .orderBy('createdAt', 'desc')
        .onSnapshop(
            querySnapshot => {
                const todos = []
                querySnapshot.forEach((doc) =>{
                    const {heading} = doc.data()
                    todos.push({
                        id: dpc.id,
                        heading,
                    })
                })
            }
        )
    }, [])

    // deletea todo from firestore db
    const deleteTodo = (todos) => {
        todoRef
            .doc(todos.id)
            .delete()
            .then(() =>{
                //show a succesful alert
                alert("deleted successfully")
            }) 
            .catch(error => {
                alert(error) 
            })
    }

    //add a todo
    const addTodo = () =>{
        //check if we have a todo
        if(addData && addData.length > 0){
            //get tje timestamp
            const timestamp = firebase.firestore.fieldValue.serverTimestamp();
            const data = {
                heading:addData,
                createdAt : timestamp
            };
            todoRef
                .add(data)
                .then(() => {
                    setAddData('');
                    //release keyboard
                    Keyboard.dismiss();
                })
        }
    }

    return (
        <View Style={{flex:1}}>
            <View style={styles.formContainer}>
                <TextInput
                    style = {styles.input}
                    placeholder='Add A New Todo'
                    placeholderTextColor= '#aaaaaa'
                    onChangeText={(heading) => setAddData(heading)}
                    value = {addData}
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'

                />
            <TouchableOpacity style={styles.button} onPress={addTodo}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            </View>
            <FlatList
                data={todos}
                numColumns={1}
                renderItems = {({item}) => (
                    <View>
                        <Pressable
                            style= {styles.container}
                            onPress={() => navigation.navigate('Detail', {item})}
                        >
                            <FontAwesome
                                name='trash-o'
                                color='red'
                                onPress={() => deleteTodo(item)}
                                style = {styles.todoIcon}
                            />
                            <View style={styles.innerContainer}>
                                <Text style = {styles.itemHeading}>
                                    {item.heading[0].toUpperCase() + item.heading.slice(1)}
                                </Text>

                            </View>

                        </Pressable>
                    </View>
                )}
            />
        </View>
    )
   
}

export default Home


const styles = StyleSheet.create({
    container:{
        backgroundColor: '#e5e5e5',
        padding:15,
        borderRadius:15,
        margin:5,
        marginHorizontal:10,
        flexDirection: 'row',
        alignItems:'center'
    },
    innerContainer:{
        alignItems:'center',
        flexDirection:'column',
        marginLeft:45,

    },
    itemHeading:{
        fontWeight: 'bold',
        fontSize :18,
        marginRight:22,
    },
    formContainer:{
        flexDirection:'row',
        height:80,
        marginLeft:10,
        marginRight:10,
        marginTop:100,
    },
    input:{
        height:48,
        borderRadius:5,
        overflow:'hidden',
        backgroundColor:'white',
        paddingLeft:16,
        flex:1,
        marginRight:5,
    },
    button:{
        height:47,
        borderRadius:5,
        backgroundColor: '#788eec',
        width:80,
        alightItems:'center',
        justifyContent:'center'
    },
    buttonText:{
        color:'white',
        fontSize:20,
    },
    todoIcon:{
        marginTop:5,
        fontSize:20,
        marginLeft:14,
    }
})