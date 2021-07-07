import { Injectable } from '@angular/core';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { CommunicationsService } from './communications.service';

@Injectable({
  providedIn: 'root'
})
export class InAppBrowserService {

  constructor(private communicationService: CommunicationsService,
              private iab: InAppBrowser) { }


  // External window handling function
  async open(_address, _mstoken, _binding) {
    
    if (_binding == this.communicationService.STR_BINDING_ERROR) {

      // TO-DO: Handle the error if needed

    } else {

        const options = 'location=yes,toolbar=yes,hidden=no';

        // MOCKING
        _binding = this.communicationService.STR_GET;

        if (_binding == this.communicationService.STR_GET) {

          const url = _address + '?msToken=' + _mstoken;
          let browser = this.iab.create(url, '_system', options);
        
        } else if (_binding == this.communicationService.STR_POST) {
    
          let browser = this.iab.create(_address, '_system', options);

          var jsForm = 'let form = document.createElement("form");' + 
                       'form.setAttribute("method","post");' + 
                       'form.setAttribute("enctype","multipart/form-data");' + 
                       'let input = document.createElement("input");' +                        
                       'input.setAttribute("type","hidden");' +
                       'input.setAttribute("name","msToken");' +    
                       'input.setAttribute("value","' + _mstoken + '");' +
                       'form.appendChild(input);' + 
                       'console.log(form);' +
                       'document.body.appendChild(form);' +
                       'form.submit();';      
    
        }
  
    }


  }  // open

}
