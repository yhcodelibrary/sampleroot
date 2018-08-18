
/*
var AWS = require('aws-sdk');
var awsRegion = "us-east-2";
var cognitoParams = {
    AccountId: "286506990999 ",
    RoleArn: "arn:aws:cognito-idp:us-east-2:286506990999:userpool/us-east-2_DH4fZd9Kd",
    IdentityPoolId: "us-east-2_DH4fZd9Kd"
};

AWS.config.region = awsRegion;
AWS.config.credentials = new AWS.CognitoIdentityCredentials(cognitoParams);
AWS.config.credentials.get(function(err) {
        if (!err) {
            console.log("Cognito Identity Id: " + AWS.config.credentials.identityId);
        }
});
*/
var region = 'us-east-2'; // リージョン

var IdentityPoolId = {
  AWS: 'us-east-2:445118d8-8b4b-4b6e-8ae1-07f8c43f7939', // <YOUR_IDENTITY_POOL_ID>
  AWSCognito: 'us-east-2_xqLzsFVmg' // <YOUR_USER_POOL_ID>
};

var ClientId = '54ms6oo9gud0userls97vh8nhq'; // アプリID

///////////////////

var idp = ['cognito-idp', region, 'amazonaws', 'com'].join(".");
var endpoint = [idp, IdentityPoolId.AWSCognito].join("/");

// Initialize the Amazon Cognito credentials provider
AWS.config.region = region; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: IdentityPoolId.AWS
});

// Initialize the Amazon Cognito credentials provider
AWSCognito.config.region = region; // Region
AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: IdentityPoolId.AWSCognito
});

var data = {
  UserPoolId: IdentityPoolId.AWSCognito,
  ClientId: ClientId
};
var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(data);

var cognitoUser;

function message(div, message_text, message_class) {
  div.text(message_text);
  div.addClass(message_class);
  div.show();
  setTimeout(function () {
    div.fadeOut();
    div.removeClass(message_class);
  }, 5000);
}

// Use case 1. Registering a user with the application.
$('#user_add_btn').click(function () {
  var username = $("#inputUsername").val();
  var password = $("#inputPassword").val();

  var email = $("#inputEmail").val();
  var locale = $("#inputLocale").val();

  var attributeList = [];
  attributeList.push({Name: "email", Value: email});
  attributeList.push({Name: "locale", Value: locale});

  if (!username || !password) {
    return false;
  }

  userPool.signUp(username, password, attributeList, null, function (err, result) {
    if (err) {
      console.log(err);
      message($('#message'), err, "alert-danger");
    } else {
      cognitoUser = result.user;
      console.log('user name is ' + cognitoUser.getUsername());
      var message_text = cognitoUser.getUsername() + "が作成されました";
      message($('#message'), message_text, "alert-success");
    }
  });
});