import React from 'react';
import {Text,View, StyleSheet, TouchableOpacity, TextInput, Image} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import Permissions from 'expo-permissions';
import firebase from 'firebase';
import db from '../config';

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
              transactionMessage:'',

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
              scannedBookId:data,
              buttonState:"normal",
              
          })}
          else if (buttonState==="StudentId"){
            this.setState({
                scanned:true,
                scannedStudentId:data,
                buttonState:"normal",  

          })}
      }
        intiateBookIssue=async ()=>{
            db.collection("transactions").add({
                'studentId':this.state.scannedStudentId,
                'bookId':this.state.scannedBookId,
                'date':firebase.firestore.Timestamp.now().toDate(),
                'transactionType':Issued,
            })
            db.collection("books").doc(this.state.scannedBookId).update({
                "bookAvailability":false,
            });
            db.collection("students").doc(this.state.scannedStudentId).update({
                "numberOfBooksIssued":firebase.firestore.FieldValue.increment(1),
            });
            this.setState({
                scannedStudentId:"",
                scannedBookId:"",
            });
        }
        intiateBookReturn=async ()=>{
            db.collection("transactions").add({
                'studentId':this.state.scannedStudentId,
                'bookId':this.state.scannedBookId,
                'date':firebase.firestore.Timestamp.now().toDate(),
                'transactionType':Issued,
            })
            db.collection("books").doc(this.state.scannedBookId).update({
                "bookAvailability":true,
            });
            db.collection("students").doc(this.state.scannedStudentId).update({
                "numberOfBooksIssued":firebase.firestore.FieldValue.increment(-1),
            });
            this.setState({
                scannedStudentId:"",
                scannedBookId:"",
            });
        }
      handleTransaction= async ()=>{
          var transactionMessage=nul;
          db.collection("books").doc(this.state.scannedBookId).get().then((doc)=>{
              var book = doc.data();
              if (book.bookAvailability){
                  this.intiateBookIssue();
                  transactionMessage="Book Issued"
              }
              else {
                  this.intiateBookReturn();
                  transactionMessage= " Book Returned "
              }
          });
          this.setState({transactionMessage:transactionMessage})
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
                    <TouchableOpacity style={styles.submitButton} onPress={async()=>{var transactionMessage=await this.handleTransaction()}}>
                        <Text style={styles.submitButtonText}>
                            SUBMIT
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
},
submitButton:{
    backgroundColor:"#fbc02d",
    width:100,
    height:50,
},
submitButtonText:{
  padding:10,
  textAlign:'center',
  fontSize:20,
  fontWeight:'bold',
  color:"white",  
}

})
