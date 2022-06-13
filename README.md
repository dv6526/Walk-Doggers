# Lastni projekt pri predmetu TPO
Lastni projekt pri predmetu **Tehnologija programske opreme** v študijskem letu **2020/2021**.

## Status delovnih tokov

![](https://github.com/tpo-2020-2021/LP234-21/workflows/Neprekinjena%20integracija/badge.svg)<br>
![](https://github.com/tpo-2020-2021/LP234-21/workflows/Neprekinjena%20dostava/badge.svg)

Vsaka skupina, ki je sestavljena iz 4 oz. 5 članov, mora razviti lastni projekt (LP) na izbrani problemski domeni, in sicer od **predloga projekta** do **implementacije**, kjer je podrobna razdelitev naslednja:

* **1. LP** - [Predlog projekta](docs/predlog-projekta),
* **2. LP** - [Zajem zahtev](docs/zajem-zahtev),
* **3. LP** - [Načrt rešitve](docs/nacrt) in
* **4. LP** - [Implementacija](src).

<br>

## Expo testiranje aplikacije na android napravah

Za namestitev aplikacije potrebujete nameščeno [**EXPO aplikacijo**](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US) iz Google Play. V Expo lahko skenirate spodnjo QR kodo, ki vam bo naložil našo aplikacijo [Walk Doggers](https://expo.io/@walk-doggers).


![alt text](https://cdn.discordapp.com/attachments/811599453785686016/846165152494518272/unknown.png)

<br>

### Posnetki zaslona

<p float="left"> 
  <img src="/docs/zajem-zahtev/images/zaslonske-maske/explore-listing.png" width="300" />
  <img src="/docs/zajem-zahtev/images/zaslonske-maske/listings-applied-short.png" width="300" />
  <img src="/docs/zajem-zahtev/images/zaslonske-maske/inbox-chat-completed.png" width="300" />
</p>

[Več posnetkov zaslona najdete s klikom na ta naslov](https://github.com/tpo-2020-2021/LP234-21/tree/master/docs/zajem-zahtev#7-osnutki-zaslonskih-mask)

<br>

## Navodila v angleščini za namestitev in testiranje na lokalnem okolju:

*prerequisites: Installed node, npm, docker, docker-compose, ubuntu linux recommended*

1. in ***src/walk-doggers-api*** folder run `docker-compose up --build` to start **api server** and dev **databases**,
1. **api documentation** should now be accessable on: [http://localhost/docs](http://localhost/docs)
1. run **api coverage test** with the following command (docker-compose from 1. point should be running): `docker exec -it -w /app/app/tests walk-doggers-api_server_1 pytest --cov app --cov-report html`
1. in **src/walk-doggers-app** folder. Run `npm install`. Then run expo with one of the following commands:
    - run `expo start:web`
    - or start dockerized expo web version for testing with the following command:
      ```bash
      # ! change REACT_NATIVE_PACKAGER_HOSTNAME to your (local) ip addr of the pc !
      docker run -it --rm \
          -p 19000-19010:19000-19010 -v "$PWD:/app" \
          -e REACT_NATIVE_PACKAGER_HOSTNAME=192.168.0.120 \
          -e EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0 \
          --name=walk-doggers-expo kerbe/expo start
      ```
1. You can scan the the QR code with the [Expo](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US) app and ***test the app on your android phone***
1. To run cypress ***frontend tests*** move in folder **test/cypress_tests** and run: `docker run --rm -v $PWD:/e2e -w /e2e --network=host cypress/included:7.3.0`
1. The results will be visible in terminal (command from the 4th point above) and in the map (video and possibly screenshots).
