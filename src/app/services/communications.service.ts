import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CommunicationsService {

  private VERSION = 'v1/';

  private PRE_ENDPOINT = 'https://seal.uma.es/api/' + this.VERSION;

  private STR_ENDPOINT = this.PRE_ENDPOINT;


  public readonly INT_UUID_LENGTH = 32;
  
  private readonly STR_HTTP_POST_REDIRECT = 'HTTP-POST-REDIRECT';
  private readonly STR_HTTP_GET_REDIRECT = 'HTTP-GET-REDIRECT';

  public readonly STR_POST = 'POST';
  public readonly STR_GET = 'GET';
  public readonly STR_BINDING_ERROR = 'BINDING_ERROR';

  private UUID = null;


  constructor(private http: HttpClient) { }


  public getUUID() {

    return this.UUID;
    
  }


  private errorsHandling(httpError) {

    let error_object = {
      status: httpError.status,
      message: httpError.error['content']['application/json'].Error.schema.value
    }

    return error_object;
  }


  private parseBinding(_binding) {
    
    if (_binding == this.STR_HTTP_POST_REDIRECT) {
      return this.STR_POST
    } else if (_binding == this.STR_HTTP_GET_REDIRECT) {
      return this.STR_GET
    } else {
      return this.STR_BINDING_ERROR      
    }

  }

  async sessionStartService() {

    const path = this.STR_ENDPOINT + 'session/start';

    let res = await this.http.post(path, null).toPromise().then(response => {    

      console.log('**** service:');
      console.log(response);

      if (response['content']['application/json'].UUID.schema.value.length == 32) {

        this.UUID = String(response['content']['application/json'].UUID.schema.value);

      } else {

        this.UUID = null;
        
      }

      return this.UUID;

    }).catch(error => this.errorsHandling(error));

    return res;

  } // sessionStartService


  async datastoreLoadService(_UUID, _moduleID) {

    const path = this.STR_ENDPOINT + 'datastore/' + _moduleID + '/load';    

    let request_body = new FormData();
    request_body.append("UUID", _UUID);

    console.log(request_body)

    let res = await this.http.post(path, request_body).toPromise().then(response => {

      console.log(response);

      let response_content = response['content']['application/json'];

      if (response_content){
        
        let data = {
          address: response_content.address.schema.value,
          msToken: response_content.msToken.schema.value,
          binding: this.parseBinding(response_content.bindingMethod.schema.value)
        };
        
        return data;

      }
    }).catch(error => this.errorsHandling(error));

    return res;
  }  // datastoreLoadService


  async datastoreStoreService(_UUID, _moduleID) {

    const path = this.STR_ENDPOINT + 'datastore/' + _moduleID + '/store';

    let request_body = new FormData();
    request_body.append("UUID", _UUID);

    console.log(request_body)

    let res = await this.http.post(path, request_body).toPromise().then(response => {

      console.log(response);

      let response_content = response['content']['application/json'];

      if (response_content){
        
        let data = {
          address: response_content.address.schema.value,
          msToken: response_content.msToken.schema.value,
          binding: this.parseBinding(response_content.bindingMethod.schema.value)
        };
        
        return data;

      }
    }).catch(error => this.errorsHandling(error));

    return res;
  }  // datastoreStoreService


  async linkSSIService(_UUID, _moduleID) {

    const path = this.STR_ENDPOINT + 'decentralized/authenticate';

    let request_body = new FormData();
    request_body.append("UUID", _UUID);

    console.log(request_body)

    let res = await this.http.post(path, request_body).toPromise().then(response => {

      console.log(response);

      let response_content = response['content']['application/json'];

      if (response_content){
        
        let data = {
          address: response_content.address.schema.value,
          msToken: response_content.msToken.schema.value,
          binding: this.parseBinding(response_content.bindingMethod.schema.value)
        };
        
        return data;

      }
    }).catch(error => this.errorsHandling(error));

    return res;

  } // linkSSIService


  async retrieveIdentityDataService(_UUID, _moduleID) {

    const path = this.STR_ENDPOINT + 'identity/retrieve';

    let request_body = new FormData();
    request_body.append("UUID", _UUID);
    request_body.append("moduleID", _moduleID);

    console.log(request_body)

    let res = await this.http.post(path, request_body).toPromise().then(response => {

      console.log(response);

      let response_content = response['content']['application/json'];

      if (response_content){
        
        let data = {
          address: response_content.address.schema.value,
          msToken: response_content.msToken.schema.value,
          binding: this.parseBinding(response_content.bindingMethod.schema.value)
        };
        
        return data;

      }
    }).catch(error => this.errorsHandling(error));

    return res;
  } // retrieveIdentityDataService


  async identityReconciliationDataService(_UUID, _moduleID, _datasetA, _datasetB) {
    console.log("**** identityReconciliationDataService Function INI");

    const path = this.STR_ENDPOINT + 'identity/link';

    console.log(_UUID);
    console.log(_moduleID);

    let request_body = new FormData();
    request_body.append("UUID", _UUID);
    request_body.append("moduleID", _moduleID);
    request_body.append("identityIDa", _datasetA);
    request_body.append("identityIDb", _datasetB);

    console.log(request_body)

    let res = await this.http.post(path, request_body).toPromise().then(response => {

      console.log(response);

      let response_content = response['content']['application/json'];

      if (response_content){
        
        let data = {
          address: response_content.address.schema.value,
          msToken: response_content.msToken.schema.value,
          binding: this.parseBinding(response_content.bindingMethod.schema.value)
        };
        
        return data;

      }
    }).catch(error => this.errorsHandling(error));

    return res; 

  } // identityReconciliationDataService


  async identityLinkResultDataService(_UUID, _moduleID, _linkRequestId) {

    console.log("**** identityLinkResultDataService Function INI");

    const path = this.STR_ENDPOINT + 'identity/link/result';

    console.log(_UUID);
    console.log(_moduleID);

    let request_body = new FormData();
    request_body.append("UUID", _UUID);
    request_body.append("moduleID", _moduleID);
    request_body.append("identityID", _linkRequestId);

    console.log(request_body)

    let res = await this.http.post(path, request_body).toPromise().then(response => {

      console.log(response);

      let response_content = response['content']['application/json'];

      if (response_content){
        
        let data = {
          address: response_content.address.schema.value,
          msToken: response_content.msToken.schema.value,
          binding: this.parseBinding(response_content.bindingMethod.schema.value)
        };
        
        return data;

      }
    }).catch(error => this.errorsHandling(error));

    return res; 

  } // identityLinkResultDataService


  async issueVCDataService(_UUID, _moduleID) {

    const path = this.STR_ENDPOINT + 'decentralized/vc/issue';

    let request_body = new FormData();
    request_body.append("UUID", _UUID);
    request_body.append("moduleID", _moduleID);

    console.log(request_body)

    let res = await this.http.post(path, request_body).toPromise().then(response => {

      console.log(response);

      let response_content = response['content']['application/json'];

      if (response_content){
        
        let data = {
          address: response_content.address.schema.value,
          msToken: response_content.msToken.schema.value,
          binding: this.parseBinding(response_content.bindingMethod.schema.value)
        };
        
        console.log('***** data vc-issue');
        console.log(data);

        return data;

      }
    }).catch(error => this.errorsHandling(error));

    return res;

  } // issueVCDataService


  async deriveIdentifierService(_UUID, _moduleID) {

    const path = this.STR_ENDPOINT + 'identity/derive';

    let request_body = new FormData();
    request_body.append("UUID", _UUID);
    request_body.append("moduleID", _moduleID);

    console.log(request_body)

    let res = await this.http.post(path, request_body).toPromise().then(response => {

      console.log(response);

      let response_content = response['content']['application/json'];

      if (response_content){
        
        let data = {
          address: response_content.address.schema.value,
          msToken: response_content.msToken.schema.value,
          binding: this.parseBinding(response_content.bindingMethod.schema.value)
        };
        
        return data;

      }
    }).catch(error => this.errorsHandling(error));

    return res;
  } // deriveIdentifierService


  async identityAllListService(_UUID) {

    const path = this.STR_ENDPOINT + 'identity/all/list';

    let request_body = new FormData();
    request_body.append("UUID", _UUID);

    console.log(request_body)

    let res = await this.http.post(path, request_body).toPromise().then(response => {

      let response_content = response['content']['application/json'];

      if (response_content){
        
        let data = {
          identities: response_content.identities.schema.value
        };
        
        return data;

      }
    }).catch(error => this.errorsHandling(error));

    return res;
  } // identityAllListService



  async identitySourceModuleLoadService(_UUID, _moduleID, _param_json) {

    const path = this.STR_ENDPOINT + 'identity/' + _moduleID + '/load';

    let request_body = new FormData();
    request_body.append("UUID", _UUID);
    request_body.append("param_json", _param_json);

    console.log(request_body)

    let res = await this.http.post(path, request_body).toPromise().then(response => {

      return response;

    }).catch(error => this.errorsHandling(error));

    return res;

  } // identitySourceModuleLoadService


}
