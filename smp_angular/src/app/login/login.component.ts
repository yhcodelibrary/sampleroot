import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedValueService } from '../service/sharedValue.service';
import { BasicPageBase } from '../common/basicPageBase';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpAccessService } from '../service/httpAccess.service';

//https://stackoverflow.com/questions/48011849/angular-5-spring-boot-spring-security-login

/**
 * ログイン画面クラス
 *
 * @export
 * @class LoginComponent
 * @extends {BasicPageBase}
 */
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css',
      ]
      
})

export class LoginComponent extends BasicPageBase{
    
  userName:string;
  password:string;
  sampleCheck:boolean;

  /**
   *Creates an instance of LoginComponent.
   * @param {Router} router
   * @param {HttpAccessService} httpAccess
   * @param {SharedValueService} sharedValueService
   * @memberof LoginComponent
   */
  constructor(
    router:Router,
    private httpAccess:HttpAccessService,
    private sharedValueService:SharedValueService) 
  {
    super(router);
  }

  /**
   * 初期ロード
   *
   * @memberof LoginComponent
   */
  onInitLoad()
  {
    this.sampleCheck = false;
  }

  /**
   * ログインクリック
   *
   * @memberof LoginComponent
   */
  onClickLogin()
  {
    
    const body = {
      userName : this.userName,
      password : this.password
    };

    const self = this;

    const func=(function(response) {
      
      let result = self.getPostResult(response);

      //バリデーションエラーがない場合
      if(self.isValid)
      {
        self.sharedValueService.onSharedDataChanged('pageupd','before');
        self.router.navigate(['/calendar']);
      }
    });

    this.httpAccess.postAuthApp(func,body,'api/account/login');

  }

  /**
   * サンプルユーザーログインの設定
   *
   * @memberof LoginComponent
   */
  onChangeSample()
  {
    if(this.sampleCheck)
    {
      this.userName = "sample";
      this.password = "sample1";
    }
    else
    {
      this.userName = "";
      this.password = "";
    }
  }
}

//-------------------------------------------------OLD

// import { Component } from '@angular/core';
// import AWS = require('aws-sdk');
// //import AWSCognito = require('amazon-cognito-js');
// //import AWSCognito = any;

// @Component({
//     selector: 'login',
//     templateUrl: './login.component.html',
//     styleUrls: ['./login.component.css',
//       ]
// })


// export class LoginComponent{
//     region:string = 'us-east-2'; // 東京リージョン
    
//     IdentityPoolId = {
//       AWS: 'us-east-2:445118d8-8b4b-4b6e-8ae1-07f8c43f7939', // <YOUR_IDENTITY_POOL_ID>
//       AWSCognito: 'us-east-2_xqLzsFVmg' // <YOUR_USER_POOL_ID>
//     };
    
//     ClientId:string = '54ms6oo9gud0userls97vh8nhq'; // アプリID

//     idp = ['cognito-idp', this.region, 'amazonaws', 'com'].join(".");
    
//     endpoint = [this.idp, this.IdentityPoolId.AWSCognito].join("/");

//     //CognitoSDK = require('amazon-cognito-identity-js-node');
//     AWSCognito = require('amazon-cognito-js');
//     /*

//     data = {
//         UserPoolId: this.IdentityPoolId.AWSCognito,
//         ClientId: this.ClientId
//     };
//     userPool = new this.AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(this.data);

//     //画面項目
//     username:string;
//     password:string;

//     constructor(){

//         // Initialize the Amazon Cognito credentials provider
//         AWS.config.region = this.region; // Region
//         AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//             IdentityPoolId: this.IdentityPoolId.AWS
//         });

//         // Initialize the Amazon Cognito credentials provider
//         this.AWSCognito.config.region = this.region; // Region
//         this.AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
//             IdentityPoolId: this.IdentityPoolId.AWSCognito
//         });

//     }

//     onLogin(){

//         var authenticationData = {
//             Username: this.username,
//             Password: this.password
//         };

//         var authenticationDetails = new this.AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

//         var userData = {
//             Username: this.username,
//             Pool: this.userPool
//         };
//         var cognitoUser = new this.AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
//         cognitoUser.authenticateUser(authenticationDetails, {
//             onSuccess: function (result:any) {

//             var message_text = "[SUCCESS] " + cognitoUser.username + " が認証されました";
//             //message($('#message3'), message_text, "alert-success");

//             var acToken = result.getAccessToken().getJwtToken();
//             var idToken = result.getIdToken().getJwtToken();
//             console.log('access token + ' + acToken);

//             var Logins = {};
//             Logins[this.endpoint] = idToken;

//             AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//                 IdentityPoolId: this.IdentityPoolId.AWS, // your identity pool id here
//                 Logins: Logins
//             });

//         // Instantiate aws sdk service objects now that the credentials have been updated.
//         // example: var s3 = new AWS.S3();
//             },

//             onFailure: function (err:any) {
//             alert(err);
//             //message($('#message3'), err, "alert-danger");
//             }
//         });
//     }
//     */
// }    
