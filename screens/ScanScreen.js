import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";


export default class TransactionScreen extends React.Component {
    constructor() {
      super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
        scannedCode:'',
        buttonState: "normal",
      };
    }

    getCameraPermissions = async id => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
    
        this.setState({
          /*status === "granted" is true when user has granted permission
              status === "granted" is false when user has not granted the permission
            */
          hasCameraPermissions: status === "granted",
          buttonState: id,
          scanned: false
        });
      };
      handleBarCodeScanned = async ({ type, data }) => {
        const { buttonState } = this.state;
        if (buttonState === id) {
            this.setState({
              scanned: true,
              scannedId: data,
              buttonState: "clicked"
            });
          } {
            this.setState({
              scanned: false,
              scannedId:'',
              buttonState: "normal"
            });
          }
        };
      
      render(){
          return(
              <View>
            <TouchableOpacity
            style={styles.scanButton}
            onPress={() => {
              this.getCameraPermissions();
            }}
            title="BAR CODE SCANNER"
          >
               <Image source={require ("../assets/Barcode-scanner.jpg")}/>
              <Text style={styles.buttonText}>Scan QR Code</Text>
    </TouchableOpacity>
    </View>
          )
      }
}

const styles= StyleSheet.create({
    scanButton: {
        backgroundColor: "#2196F3",
        padding: 10,
        margin: 10
      },
      buttonText: {
        fontSize: 15,
        textAlign: "center",
        marginTop: 10
      }
})