# Helene Volle Portfolio

## Endre prosjekter:

Prosjekter og bilder legges til i info.json filen som ligger i scripts/fakeAPI/info.json.

<b>Struktur i json filen:</b>
- Krøllparanteser { } samler informasjon som skal ligge sammen. Vi bruker disse til å samle prosjektinformasjon og bildeinformasjon.
- <b>VIKTIG!</b> Alle krøllparanteser separeres med komma { info } , { info } , { info } . Dvs alle krøllparanteser skal ha komma etter seg (med unntak av det siste). <b>Ikke føkk med komma ellers føkker de med deg.</b> Sindre og jeg har "spellchecker" for kode som viser hvor feilen er hvis det blir kommakrise :)
- Innrykk og mellomrom har ingen invirking på koden
- Første bilde i hvert prosjekt er hovedbilde på work siden og vises ikke på prosjektsiden. Dette bildet trenger derfor ikke width.

## Legge til bilder
- Bildet burde være under 500KB . Det kan gjøres ved å sette width til 2560px og lagre bildet som .webp
- Dersom du har oppretter prosjektet fra før kan du finne mappa bildet skal legges i her: assets/images/prosjektnavn. Deretter må du endre inn i json filen (/scripts/fakeAPI/info.json), finne stedet prosjektet er listet og legge til koden under der du vil plassere bildet:
```
{
    "link": "/assets/images/colours_on_micro_level/01.webp",
    "title": "Title",
    "width": "100%",
    "sub_image_description": "-"
    
}
```
- sub_image_description legges kun til om amount_img_part_of_sub er satt til et nummer som inkluderer bildet ditt:)

## Legge til prosjekter 
- Du får ikke opprettet nye mapper uten kodeeditor, send en mld så skal vi opprette en ny mappe med navn med små bokstaver der ordene er skilt med _
- Bildene burde være under 500KB (se legge til bilder)
- Gå inn i json filen og legg til koden under der du vil ha prosjektet:

### Kopier og endre denne koden
```
    ,{
        "name": "Us",
        "description": "This is a long and fulfilling description that explains everything about the project in it's fullness!",
        "short_description": "This is the short description",
        "sub_title": "-",
        "sub_description": "-",
        "amount_img_part_of_sub": 0,
        "images": [
            {
                "link": "/assets/images/us/02.webp",
                "title": "Title",
                "width": "-",
                "sub_image_description": "-"
            },
            {
                "link": "/assets/images/us/02.webp",
                "title": "Title",
                "width": "100%",
                "sub_image_description": "-"
            },
            {
                "link": "/assets/images/us/01.webp",
                "title": "Title",
                "width": "100%",
                "sub_image_description": "-"
            }
        ]
    }

```
Forklaringer til koden: 
- name: overskrift på prosjekt
- description: teksten rett under overskriften
- short_description: det som vises i kort beskrivelse på work siden
- sub_title: overskrift til delen under alle hovedbildene. Her kan du skrive - og overskriften forsvinner
- sub_description: teksten under sub title
- amount_img_part_of_sub: antall bilder (telt fra bunnen) som skal ligge i sub delen
 - Width: Første bilde har ikke width fordi det er "forsidebilde" til prosjektene, den vises ikke på prosjektsiden. 
 - Titel: er ikke nødvendig men er der for din egen del hvis du navngir noen av bildene. Det vises ikke på siden med mindre nettsiden ikke klarer å hente bildene.
 - Width: bilder som skal ligge på samme linje må ha til sammen prosentandel som tilsvarer 99% (dette uansett hvor mange bilder du skal ha på en linje). Dersom du kun skal ha ett bilde så skriv 100%
- sub_image_description: tekst som vil stå ved siden av bildet i sub section. skriver du - så vil du kunne plassere flere bilder på samme rad og teksten forsvinner.


Ellers: hvis det er noe så bare snap meg, vi har litt bedre programmer til å fikse koden på enn du har så hvis det er noe som ikke funker bare gi beskjed. Hvis det er stress å sette opp prosjekter kan jeg og gjøre det for deg, men nå har du hvertfall mulighet til å endre på ting