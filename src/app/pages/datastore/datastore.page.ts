import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, NavController } from '@ionic/angular';
import { CommunicationsService } from 'src/app/services/communications.service';
import { InAppBrowserService } from 'src/app/services/in-app-browser.service';
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";


@Component({
  selector: 'app-datastore',
  templateUrl: './datastore.page.html',
  styleUrls: ['./datastore.page.scss'],
})
export class DatastorePage implements OnInit {

  private UUID = null;
  private readonly STR_LOCAL_MODULEID = 'Browser';

  //private readonly STR_MOBILE_MODULEID = 'Mobile';

  private readonly STR_GOOGLE_CLOUD_MODULEID = 'googleDrive';
  private readonly STR_MICROSOFT_CLOUD_MODULEID = 'oneDrive'; 

  constructor(private communicationService: CommunicationsService, 
    private iab: InAppBrowserService,
    private route: ActivatedRoute,
    private navController: NavController,
    public actionSheetController: ActionSheetController,
    private barcodeScanner: BarcodeScanner) { }


  ngOnInit() {
    console.log('***ngOnInit-datastore.page.ts: ');
    
    // TO-DO: Check the UUID format is correct
    this.UUID = String(this.route.snapshot.params.UUID);
    console.log(this.route.snapshot.params.UUID);

  }    


  async presentLoadOptions() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Load Options',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Local',
        //role: 'destructive',
        icon: 'push-outline',
        handler: () => {
          this.loadLocal();
          console.log('Load - Local clicked');
        }
      }, {
        text: 'Cloud',
        icon: 'cloud-upload',
        handler: () => {
          this.presentLoadCloudOptions();
          console.log('Load - Cloud clicked');
        }
      }, {
        text: 'Scan QR code',
        icon: 'qr-code',
        handler: () => {
          this.loadQR();
          console.log('Load - Scan QR code clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Load - Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

  } // presentLoadOptions


  async presentLoadCloudOptions() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Load Options',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Google Drive',
        //role: 'destructive',
        icon: 'logo-google',
        handler: () => {
          this.loadCloud(this.STR_GOOGLE_CLOUD_MODULEID);
          console.log('Load Cloud - Google Drive clicked');
        }
      }, {
        text: 'One Drive',
        icon: 'logo-microsoft',
        handler: () => {
          this.loadCloud(this.STR_MICROSOFT_CLOUD_MODULEID);
          console.log('Load Cloud - One Drive clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Load Cloud - Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

  } // presentLoadCloudOptions


  async presentStoreOptions() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Store Options',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Local',
        //role: 'destructive',
        icon: 'download-outline',
        handler: () => {
          this.storeLocal();    
          console.log('Store - Local clicked');
        }
      }, {
        text: 'Cloud',
        icon: 'cloud-download',
        handler: () => {
          this.presentStoreCloudOptions();
          console.log('Store - Cloud clicked');
        }
      }, {
        text: 'Scan QR code',
        icon: 'qr-code',
        handler: () => {
          this.storeQR();
          console.log('Store - Scan QR code clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Store - Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

  } // presentCloudOptions


  async presentStoreCloudOptions() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Store Options',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Google Drive',
        //role: 'destructive',
        icon: 'logo-google',
        handler: () => {
          console.log('Store Cloud - Google Drive clicked');
          this.storeCloud(this.STR_GOOGLE_CLOUD_MODULEID);
        }
      }, {
        text: 'One Drive',
        icon: 'logo-microsoft',
        handler: () => {
          console.log('Store Cloud - One Drive clicked');
          this.storeCloud(this.STR_MICROSOFT_CLOUD_MODULEID);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Store Cloud - Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

  } // presentStoreCloudOptions

  
  loadPDS() {

    this.presentLoadOptions();

  }

  storePDS() {

    this.presentStoreOptions();

  }


  async loadLocal() {
    console.log("**** datastore.page.ts loadLocal Function INI");

    let response = await this.communicationService.datastoreLoadService(this.UUID,this.STR_LOCAL_MODULEID);
  
    let isObject = typeof(response) === 'object';
    let hasStatus = response.hasOwnProperty('status');

    console.log(response);

    if (isObject) {
      if (hasStatus) {

        //TO-DO: Show error -> AlertService
        let alert_message = response['message'];
        alert(alert_message);

        if(response['status'] == 401) {
          this.navController.navigateBack(["index"]);
        }

      } else {
        
        let address =  response['address'];
        let binding =  response['binding'];
        let mstoken =  response['msToken'];

        this.iab.open(address, mstoken, binding);

      }
    } else {
      console.log('Response is not an instance of an expected class type');
    }

  }   // loadLocal


  async loadCloud(_moduleID) {
    console.log("**** datastore.page.ts loadCloud Function INI");

    let response = await this.communicationService.datastoreLoadService(this.UUID,_moduleID);

    let isObject = typeof(response) === 'object';
    let hasStatus = response.hasOwnProperty('status');

    console.log(response);

    if (isObject) {
      if (hasStatus) {

        //TO-DO: Show error -> AlertService        
        let alert_message = response['message'];
        alert(alert_message);

        if(response['status'] == 401) {
          this.navController.navigateBack(["index"]);
        }

      } else {
        
        let address =  response['address'];
        let binding =  response['binding'];
        let mstoken =  response['msToken'];

        this.iab.open(address, mstoken, binding);

      }
    } else {
      console.log('Response is not an instance of an expected class type');
    }

  } // loadCloud  

  
  async storeLocal() {
    console.log("**** datastore.page.ts storeLocal Function INI");

    let response = await this.communicationService.datastoreStoreService(this.UUID,this.STR_LOCAL_MODULEID); 

    let isObject = typeof(response) === 'object';
    let hasStatus = response.hasOwnProperty('status');

    console.log(response);

    if (isObject) {
      if (hasStatus) {

        //TO-DO: Show error -> AlertService
        let alert_message = response['message'];
        alert(alert_message);

        if(response['status'] == 401) {
          this.navController.navigateBack(["index"]);
        }

      } else {
        
        let address =  response['address'];
        let binding =  response['binding'];
        let mstoken =  response['msToken'];

        this.iab.open(address, mstoken, binding);

      }
    } else {
      console.log('Response is not an instance of an expected class type');
    }

  }   // storeLocal


  async storeCloud(_moduleID) {
    console.log("**** datastore.page.ts storeCloud Function INI");

    let response = await this.communicationService.datastoreStoreService(this.UUID,_moduleID);

    let isObject = typeof(response) === 'object';
    let hasStatus = response.hasOwnProperty('status');

    console.log(response);

    if (isObject) {
      if (hasStatus) {

        //TO-DO: Show error -> AlertService
        let alert_message = response['message'];
        alert(alert_message);

        if(response['status'] == 401) {
          this.navController.navigateBack(["index"]);
        }

      } else {
        
        let address =  response['address'];
        let binding =  response['binding'];
        let mstoken =  response['msToken'];

        this.iab.open(address, mstoken, binding);

      }
    } else {
      console.log('Response is not an instance of an expected class type');
    }

  } // storeCloud


  async loadQR() {

    alert("This functionalily has not been implemented yet");

  } // loadQR


  async storeQR() {

    alert("This functionalily has not been implemented yet");

  } // storeQR  

}
