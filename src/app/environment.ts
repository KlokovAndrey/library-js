import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
let keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8080/auth',
  realm: 'demo',
  clientId: 'libapp',
  "credentials": {
    "secret": "dd2cfb8a-a423-451c-b6e2-eadb7eeacf43"
  }  
};

export const environment = {

  keycloak: keycloakConfig,

};