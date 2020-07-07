import React from 'react';
import {Text,View, StyleSheet, TouchableOpacity} from 'react-native';
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
         }
    }
    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted', buttonState:"clicked", scanned:false });
      };
      handleBarCodeScan = async ({type,data}) => {
          this.setState({
              scanned:true,
              scannedData:data,
              buttonState:normal,
          })
      }
    
    render (){
        const hasCameraPermission=this.state.hasCameraPermission;
        const scanned=this.state.scanned;
        const buttonState=this.state.buttonState;
        if(buttonState==="clicked" && hasCameraPermission){
        return(<BarCodeScanner onBarcodeScanned={scanned ? undefined:this.handleBarCodeScan} style={StyleSheet.absoluteFillObject}></BarCodeScanner>);
        }
        else if(buttonState==="normal"){
            return(
                <View style={styles.container}>
                <Text style={styles.displayText}>
                    {hasCameraPermission===true ? this.state.scannedData:"requestCameraPermisson"}

                </Text>
                <TouchableOpacity style={styles.scanButton} onPress={this.getPermissionsAsync}>
                    <Text style={styles.buttonText}>
                        Scan QR Code
                    </Text>
                </TouchableOpacity>
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

  }
})
