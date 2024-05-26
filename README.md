# PilotLogboek

- Student: Lucca Van Veerdeghem


## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [Yarn](https://yarnpkg.com)

## Opstarten

Om de applicatie te downloaden naar je lokale schijf, kan je de directory clonen aan de hand van volgend commando:
 `git clone https://github.com/Web-IV/2223-frontendweb-LuccaVanVeerdeghem`

Voor de applicatie kan runnen, moet er een environment file `.env` aangemaakt worden in de root folder. 
Volgende informatie moet in het bestand komen te staan voor lokaal te draaien. 
Indien de applicatie online draait, moet de REACT_APP_API_URL verandert worden naar `<domain>/api`

```
REACT_APP_AUTH0_DOMAIN=https://<auth0 application domain>
REACT_APP_AUTH0_CLIENT_ID=<auth0 application client id>
REACT_APP_AUTH0_API_AUDIENCE=<auth0 api identifier>
REACT_APP_API_URL=<url where backend is hosted>/api
```

Eenmaal dit bestand is aangemaakt en de juiste data ingesteld is, kan de applicatie gestart worden.
De applicatie is gebaseerd op de package manager `yarn`. Deze slaat de gebruikte packages op in het [package.json](package.json) bestand.

Voor je de applicatie voor de eerste keer kan starten, moet je het commando `yarn install` uitvoeren in de root folder.
Dit zorgt ervoor dat alle gebruikte packages geïnstalleerd worden in het project.

De applicatie kan nu gestart worden met `yarn start`.

## Testen

De testen worden uitgevoerd via de package `cypress`. Deze maakt gebruik van een andere environment file.
Vooraleer je de testen kan uitvoeren, maak je het nieuwe env bestand aan met bestandsnaam `cypress.env.json`. Volgend JSON object mag in dit bestand geplaatst worden:
```
{
    "auth_audience": "<auth0 api identifier>",
    "auth_url": "https://<auth0 application domain>/oauth/token",
    "auth_client_id": "<auth0 application client id>",
    "auth_client_secret": "<auth0 application client secret>",
    "auth_username": "<auth0 user username>",
    "auth_password": "<auth0 user password>"
  }
```

Met dit bestand aangemaakt, kan je nu de testen runnen met `npx cypress open` of `npx cypress run`. 

Pas op, het is vereist dat zowel de frontend applicatie als de [backend applicatie](https://github.com/LuccaVVBE/PilotLogboekAPI) al aan het draaien is (`yarn start`)