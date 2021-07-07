import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommunicationsService } from 'src/app/services/communications.service';

@Component({
  selector: 'app-emrtd',
  templateUrl: './emrtd.page.html',
  styleUrls: ['./emrtd.page.scss'],
})
export class EmrtdPage implements OnInit {

  private param = null;
  private UUID = null;

  private json_string = null;
  private json_param = null;

  private response_emrtd = null;
  private readonly STR_EMRTD_MODULE = 'eMRTD';

  private process_success = null;


  constructor(private communicationService: CommunicationsService,
              private navController: NavController,
              private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('***** ngOnInit-emrtd.page.ts INI');

    this.UUID = this.communicationService.getUUID();

    if (this.UUID == null) {

      alert('You have no active session yet, please repeat the process as soon as you are redirected');
      this.navController.navigateBack(["index"]);

    } 

    console.log('UUID: ');
    console.log(this.UUID);

    this.param = String(this.route.snapshot.params.param);

      // TO-DO: Add regex check for the parameter
    if (this.param == null) {

      alert('The parameter provided is not correct, please repeat the process as soon as you are redirected');
      this.navController.navigateBack(["home", this.UUID]);

    }

    console.log('this.param (base64): ');
    console.log(this.param);

    // base64 to String
    this.json_string = atob(this.param);
    
    if (this.json_string != '') {

      console.log('this.json_string: ');
      console.log(this.json_string);

      // String to JSON
      this.json_param = JSON.parse(this.json_string);
      console.log('this.json_param: ');
      console.log(this.json_param);

      this.identitySourceEMRTDLoad();

    } else {

      console.log('this.json_string is void string... ');
      console.log(this.json_string);

    }

  } // ngOnInit

  
  async identitySourceEMRTDLoad() {
    console.log("**** identitySourceEMRTDLoad Function INI");

    // It is not needed to check for the UUID and json_string because is checked in the caller function
    this.response_emrtd = await this.communicationService.identitySourceModuleLoadService(this.UUID, this.STR_EMRTD_MODULE, this.json_string);

    console.log('***** response_emrtd');
    console.log(this.response_emrtd);

    let isObject = typeof(this.response_emrtd) === 'object';
    let hasStatus = this.response_emrtd.hasOwnProperty('status');

    if (isObject) {
      if (hasStatus) {

        //TO-DO: Show error -> AlertService
        this.process_success = 'The process has not been completed, please retry again';
        
        let alert_message = this.response_emrtd['message'];
        alert(alert_message);

        if(this.response_emrtd['status'] == 401) {
          this.navController.navigateBack(["index"]);
        }

      } else {
        
        this.process_success = 'The process has been completed successfully. You can now see your identity in the Manage Identity Data option'

      }
    } else {
      console.log('identitySourceEMRTDLoad - Response is not an instance of an expected class type');
    }

  } // identitySourceEMRTDLoad

}
