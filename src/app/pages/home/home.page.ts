import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController, NavController, Platform } from '@ionic/angular';
import { InAppBrowserService } from 'src/app/services/in-app-browser.service';
import { CommunicationsService } from '../../services/communications.service';
import { Plugins, AppState } from '@capacitor/core';

import { Location } from '@angular/common';

const { App } = Plugins;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  
  private UUID = null;
  
  private readonly STR_UPORT_MODULEID = 'uPort';

  private readonly STR_MODULE_EIDAS= 'eIDAS';
  private readonly STR_MODULE_EDUGAIN= 'eduGAIN';
  private readonly STR_MODULE_EMRTD= 'eMRTD';

  private readonly STR_IDENTITY_RECON_AUTO = 'autoSEAL';
  private readonly STR_IDENTITY_RECON_MANUAL = 'manualXYZ';

  private readonly STR_VC_ISSUE_MODULE_EIDAS_EDUGAIN = 'eIDAS-eduGAIN';

  private readonly STR_DERIVE_MODULEID = 'UUID';  

    constructor(private communicationService: CommunicationsService, 
      private iab: InAppBrowserService,
      private route: ActivatedRoute, 
      private navController: NavController,
      public actionSheetController: ActionSheetController,
      private platform: Platform, 
      public alertController: AlertController,
      private _location: Location) {

        this.platform.backButton.subscribeWithPriority(10, () => {
          console.log('Back press handler');

          if (this._location.path().slice(0,5) == '/home') {
            
            console.log('Confirm exit app');
            this.confirmExitApp();

          } else {
    
            console.log('Navigate to back page');
            this._location.back();
    
          }
    
        });        

      } // constructor


  ngOnInit() {
    console.log('***ngOnInit-home.page.ts: ');

    this.UUID = String(this.route.snapshot.params.UUID);
    console.log(this.route.snapshot.params.UUID);
    console.log(this.UUID);
  }


  async  confirmExitApp() {

    this.alertController.create({
      header: 'SEAL App termination',
      message: 'Do you want to close the app?',
      backdropDismiss: false,
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Application not exit');
        }
      }, {
        text: 'Ok',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    })
      .then(alert => {
        alert.present();
      });

  } // confirmExitApp


  async presentRetrieveIdentityOptions() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Identity Sources',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'eIDAS',
        icon: 'card',
        handler: () => {
          this.retrieveIdentity(this.STR_MODULE_EIDAS);
          console.log('RetrieveId - eIDAS clicked');
        }
      }, {
        text: 'eduGAIN',
        icon: 'book',
        handler: () => {
          this.retrieveIdentity(this.STR_MODULE_EDUGAIN);
          console.log('RetrieveId - eduGAIN clicked');
        }
      }, {
        text: 'eMRTD',
        icon: 'wallet',
        handler: () => {
          this.eMRTD();
          console.log('RetrieveId - eMRTD clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('RetrieveId - Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

  } // presentRetrieveIdentityOptions



  retrieveIdentitySources() {
    console.log("***** home.page.ts retrieveIdentitySources INI");
    
    this.presentRetrieveIdentityOptions();

  } // retrieveIdentitySources


  // TO-DO: Change reconciliation to link name (refactor)
  async presentIdentityReconciliationOptions() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Linking methods',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Auto',
        icon: 'card',
        handler: () => {         
          this.navController.navigateForward(["identity-reconciliation", this.UUID]);
          console.log('IdRecon - Auto clicked');
        }
      }, {
        text: 'Manual',
        icon: 'book',
        handler: () => {
          alert("Manual linking - This functionalily has not been implemented yet");
          console.log('IdRecon - Manual clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('IdRecon - Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

  } // presentIdentityReconciliationOptions


  async presentIssueVCOptions() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Verifiable Credential sources',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'eIDAS',
        icon: 'card',
        handler: () => {      
          this.issueVerifiableCredentials(this.STR_MODULE_EIDAS);  
          console.log('IssueVC - eIDAS clicked');        
        }
      }, {
        text: 'eduGAIN',
        icon: 'book',
        handler: () => {
          this.issueVerifiableCredentials(this.STR_MODULE_EDUGAIN); 
          console.log('IssueVC - eduGAIN clicked');
        }
      }, {
        text: 'eMRTD',
        icon: 'wallet',
        handler: () => {
          this.issueVerifiableCredentials(this.STR_MODULE_EMRTD); 
          console.log('IssueVC - eMRTD clicked');
        }
      }, {
        text: 'eIDAS-eduGAIN',
        icon: 'shapes',
        handler: () => {
          this.issueVerifiableCredentials(this.STR_VC_ISSUE_MODULE_EIDAS_EDUGAIN);
          console.log('IssueVC - eIDAS-eduGAIN clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('IssueVC - Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

  } // presentIssueVCOptions


  async datastoreAction() {
    console.log("***** home.page.ts datastoreAction INI");

    this.navController.navigateForward(["datastore", this.UUID]);

  } // datastoreAction


  async linkSSI() {
    console.log("**** linkSSI Function INI");

    let response = await this.communicationService.linkSSIService(this.UUID, this.STR_DERIVE_MODULEID);

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
      console.log('linkSSI - Response is not an instance of an expected class type');
    }

  } // linkSSI


  async manageIdentityData() {
    console.log("**** manageIdentityData Function INI");

    this.navController.navigateForward(["manage-identity-data", this.UUID]);

  } // manageIdentityData


  async retrieveIdentity(_moduleID) {
    console.log("**** retrieveIdentity Function INI");

    let response = await this.communicationService.retrieveIdentityDataService(this.UUID, _moduleID);

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
      console.log('retrieveIdentity - Response is not an instance of an expected class type');
    }

  } // retrieveIdentity


  async eMRTD() {
    console.log("**** eMRTD Function INI");

    var ret = await App.canOpenUrl({ url: 'eu.atos.atosreader' }); 

    if (ret.value) {
      
      var retx = await App.openUrl({ url: 'eu.atos.atosreader' });
      console.log('Open url response: ', retx); 

    } else {

      alert("SEAL eMRTD reader App needs to be installed to use this functionality");

    }

  } // eMRTD


  async identityReconciliationMethods() {
    console.log("**** identityReconciliationMethods Function INI"); 
    
    this.presentIdentityReconciliationOptions();

  } // identityReconciliation


  async VCissuer() {
    console.log("**** VCissuer Function INI");    

    this.presentIssueVCOptions();

  } // VCissuer


  async issueVerifiableCredentials(_moduleID) {
    console.log("**** issueVerifiableCredentials Function INI");

    let response = await this.communicationService.issueVCDataService(this.UUID, _moduleID);

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
      console.log('issueVerifiableCredentials - Response is not an instance of an expected class type');
    }


  } // issueVerifiableCredentials


  async deriveIdentifier() {
    console.log("**** deriveIdentifier Function INI");

    let response = await this.communicationService.deriveIdentifierService(this.UUID, this.STR_DERIVE_MODULEID);

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
      console.log('deriveIdentifier - Response is not an instance of an expected class type');
    }

  } // deriveIdentifier  


}
