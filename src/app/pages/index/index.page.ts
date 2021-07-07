import { AfterContentChecked, AfterViewChecked, Component, OnInit } from '@angular/core';
import { NavController, Platform, AlertController } from '@ionic/angular';
import { CommunicationsService } from 'src/app/services/communications.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
 
  private service_uuid = null;  
  
  private checkingService = 'Checking the service...';
  
  constructor(private communicationService: CommunicationsService, private navController: NavController) {}  
  
 
  ngOnInit() {
    console.log('***ngOnInit-index.page.ts: ');
    this.getSessionStart();
  }


  async getSessionStart() {

    let service_uuid = await this.communicationService.sessionStartService();

    console.log('***index: ');
    console.log(service_uuid);
        
    if (service_uuid != null) {
      this.navController.navigateForward(["home", service_uuid]);
            
    } else {

      this.checkingService = 'The service is not available at this moment, please try again later';

    }    
    
  }  // getSessionStart

}
