import { StyleSheet, View, Text, Image } from "react-native";

export default function CardLivro({image, title, update}){
     return(
          <View style={styles.card}>
               <View style={styles.viewImage}>
                    <Image source={require("../../assets/logo.png")} style={styles.image} />
               </View>
               <View style={styles.viewText}>
                    <Text style={styles.boldText}>{title}</Text>
                    <Text>{update} </Text>
               </View>
          </View>
     )
}
const styles = StyleSheet.create({
     container: {
       flex: 1,
       justifyContent: "center",
       alignItems: "center",
     },
     card : {
          width: '300px',
          height: '250px'
     },
     image:{
          width: '250px',
          height: '200px',
          borderRadius: '15px'
          
     },
     boldText: {
       fontWeight: "bold",
       fontSize: "20px"
     },
   });