/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
//URL="";
/*if (window.location.hostname == 'localhost'){
    URL= 'http://'+window.location.hostname+':3000';
}else {
    URL= 'http://'+window.location.hostname;
}*/

var URL='';
if (window.location.hostname == 'localhost')
{
     URL="http://localhost:3000";
}
else{ URL= 'http://ibo.enterpriseesolutions.com';}
export const environment =
    {
        production: false,
//	'http://'+window.location.hostname+':4200',

    API_URL: URL,
    Upload_Url: URL+'/repertoires/upload'
};