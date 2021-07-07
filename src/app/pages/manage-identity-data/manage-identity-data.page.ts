import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommunicationsService } from 'src/app/services/communications.service';
import { InAppBrowserService } from 'src/app/services/in-app-browser.service';

@Component({
  selector: 'app-manage-identity-data',
  templateUrl: './manage-identity-data.page.html',
  styleUrls: ['./manage-identity-data.page.scss'],
})
export class ManageIdentityDataPage implements OnInit {

  private UUID = null;
  private uniqueProviders = null;
  private identitiesList = null;
  
  private strNoIdentites = null;

  constructor(private communicationService: CommunicationsService,
    private iab: InAppBrowserService,
    private route: ActivatedRoute,
    private navController: NavController) { }

  async ngOnInit() {
    console.log('***ngOnInit-manage-identity-data.page.ts: ');

    this.UUID = String(this.route.snapshot.params.UUID);
    console.log(this.route.snapshot.params.UUID);    

    if (this.UUID.length == this.communicationService.INT_UUID_LENGTH) {
      
      // Loaded identities
      let identities = await this.identitiesAllList(this.UUID);

      if (identities) {

        this.uniqueProviders = identities['uniqueProviders'];
        this.identitiesList = identities['identitiesList'];

        if (this.identitiesList == null  || this.identitiesList.length == 0) {

          console.log("No identities loaded yet");
          this.strNoIdentites = 'No identities loaded yet';

        } else {

          console.log("There are dentities loaded");
          this.strNoIdentites = '';    
                
        }


      } else {

        alert("There was an issue trying to retrieve your identities");
        this.navController.navigateBack(["home"]);

      }


    } else {

      alert("There was an issue with the session");
      this.navController.navigateBack(["index"]);

    }

  } // ngOnInit

  async identitiesAllList(_UUID) {

    let response =  await this.communicationService.identityAllListService(_UUID);

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
        
        return response['identities'];

      }
    } else {
      console.log('Response is not an instance of an expected class type');
      return null;
    }    

  } // identitiesAllList


  async submitRequest(_id, _moduleID='autoSEAL') {
    console.log("**** submitRequest Function INI");

    console.log(_moduleID);
    console.log(this.UUID);

    console.log(this.identitiesList);
    console.log("-----------------");

    console.log('***** Id: ');
    console.log(_id);
 
    let response = await this.communicationService.identityLinkResultDataService(this.UUID, _moduleID, _id);

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
        } else if (response['status'] == 400) {         
          alert('Submit request error - The link request is outdated. Please repeat link process and try again.');
        }

      } else {
        
        let address =  response['address'];
        let binding =  response['binding'];
        let mstoken =  response['msToken'];

        this.iab.open(address, mstoken, binding);

        alert('Submit Request - You will see a brand-new linked identity if the pending request has been accepted.');

      }
    } else {
      console.log('Submit Request - Response is not an instance of an expected class type');
    }

  } // submitRequest

}
