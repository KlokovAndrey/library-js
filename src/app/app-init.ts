import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';


export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      const { keycloakConfig } = environment;
      try {
        await keycloak.init({
          config: keycloakConfig,
          initOptions: {
            onLoad: 'login-required',
            checkLoginIframe: false
          },
          bearerExcludedUrls: ['https://search-elasticsearch-lib-fgzjpurnqqwi4pdizkk7ogcfue.us-east-2.es.amazonaws.com']
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}

