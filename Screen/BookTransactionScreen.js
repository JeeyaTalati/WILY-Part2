import React from 'react';
import {Text,View, StyleSheet, TouchableOpacity, TextInput, Image} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import Permissions from 'expo-permissions';
export default class TransactionScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermission:null,
            scanned:false,
            scannedData:"",
            buttonState:"normal",
            scannedBookId:"",
              scannedStudentId:"",
         }
    }
    getPermissionsAsync = async (Id) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted', buttonState:Id, scanned:false });
      };
      handleBarCodeScan = async ({type,data}) => {
          const {buttonState}=this.state
          if (buttonState==="BookId"){

          
          this.setState({
              scanned:true,
              scannedData:data,
              buttonState:"normal",
              
          })}
          else if (buttonState==="StudentId"){
            this.setState({
                scanned:true,
                scannedData:data,
                buttonState:"normal",  

          })}
      }
    
    render (){
        const hasCameraPermission=this.state.hasCameraPermission;
        const scanned=this.state.scanned;
        const buttonState=this.state.buttonState;
        if(buttonState!=="normal" && hasCameraPermission){
        return(<BarCodeScanner onBarcodeScanned={scanned ? undefined:this.handleBarCodeScan} style={StyleSheet.absoluteFillObject}></BarCodeScanner>);
        }
        else if(buttonState==="normal"){
            return(
                <View style={styles.container}>
                    <View>
                    <Image source={require("../assets/booklogo.jpg")} style={{width:200,height:200}}/>
                    <Text style={{textAlign:'center',fontSize:30}}>
                         WILY
                    </Text>
                    </View>
                    <View style={styles.inputView}>
                     <TextInput style={styles.inputBox} placeholder="BookId" value={this.state.scannedBookId}>
                       
                     </TextInput>
                     <TouchableOpacity style={styles.scanButton} onPress={()=>{this.getPermissionsAsync("BookId")}}>
                         <Text style={styles.buttonText}>
                             SCAN
                         </Text>
                     </TouchableOpacity>
                    </View>
                    <View style={styles.inputView}>
                     <TextInput style={styles.inputBox} placeholder="StudentId" value={this.state.scannedStudentId}>
                       
                     </TextInput>
                     <TouchableOpacity style={styles.scanButton} onPress={()=>{this.getPermissionsAsync("StudentId")}}>
                         <Text style={styles.buttonText}>
                             SCAN
                         </Text>
                     </TouchableOpacity>
                    </View>
                
                </View>
            )
        }
        
    }
}
const styles=StyleSheet.create({
  container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
  },
  displayText:{
      fontSize:15,
      

  },
  scanButton:{
      backgroundColor:"red",
      padding:10,
      margin:10,
  },
  buttonText:{
      fontSize:20,
     textAlign:'center',
     marginTop:10,
},
inputView:{
     flexDirection:"row",
     margin:20,
},
inputBox:{
    width:200,
    height:40,
    borderWidth:1.5,
    borderRightWidth:0,
    fontSize:20,
},
ScanButton:{
    backgroundColor:"#66bb6a",
    width:50,
    borderWidth:1.5,
    borderLeftWidth:0,
}

})
