import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommunicationsService } from 'src/app/services/communications.service';
import { InAppBrowserService } from 'src/app/services/in-app-browser.service';

@Component({
  selector: 'app-identity-reconciliation',
  templateUrl: './identity-reconciliation.page.html',
  styleUrls: ['./identity-reconciliation.page.scss'],
})
export class IdentityReconciliationPage implements OnInit {

  private UUID = null;
  private uniqueProviders = null;
  private identitiesList = null;

  identitiesSelected = { identityA: '', identityB: ''};

  constructor(private communicationService: CommunicationsService,
    private iab: InAppBrowserService,
    private route: ActivatedRoute,
    private navController: NavController) { }

  async ngOnInit() {
    console.log('***ngOnInit-identity-reconciliation.page.ts: ');

    this.UUID = String(this.route.snapshot.params.UUID);
    console.log(this.route.snapshot.params.UUID);  

    if (this.UUID.length == this.communicationService.INT_UUID_LENGTH) {
      
      // Loaded identities
      let identities = await this.identitiesAllList(this.UUID);

      if (identities) {

        this.uniqueProviders = identities['uniqueProviders'];
        this.identitiesList = identities['identitiesList'];

      } else {

        alert("Identity Reconciliation - There was an issue trying to retrieve your identities");
        this.navController.navigateBack(["home"]);

      }


    } else {

      alert("Identity Reconciliation - There was an issue with the session");
      this.navController.navigateBack(["index"]);

    }


  } // ngOnInit


  // TO-DO: Similar function like in manage-identity-data. 
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
      console.log('Identity Reconciliation - Response is not an instance of an expected class type');
      return null;
    }    

  } // identitiesAllList


  async identityReconciliation(_moduleID='autoSEAL') {
    console.log("**** identityReconciliation Function INI");

    console.log(_moduleID);
    console.log(this.UUID);

    console.log(this.identitiesList);
    console.log("-----------------");
    
    console.log('***** IdA: ');
    console.log(this.identitiesSelected.identityA);
    console.log('***** IdB: ');
    console.log(this.identitiesSelected.identityB);

    let response = await this.communicationService.identityReconciliationDataService(this.UUID, _moduleID, this.identitiesSelected.identityA, this.identitiesSelected.identityB);

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
      console.log('identityReconciliation - Response is not an instance of an expected class type');
    }    
    
  } //identityReconciliation

}
