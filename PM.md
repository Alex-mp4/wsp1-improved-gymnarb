# dr. peppa (Improved Gymnasiearbete) | wsp1+wu1 | Post Mortem 

- titel: dr. peppa
- tagline: Northern Sweden's biggest supply of underground music, shipped globally
- url: https://well-polite-abacus.glitch.me/
- git: https://github.com/Alex-mp4/wsp1-improved-gymnarb

## Vad? (Förbättringar för gymnasiearbete sidan (gjord under wu1))
Det jag blev beordrad att ta en extra titt på var:
* Sluta med statiska sidor
* Enkelt köpsystem
  * Arbete med databas
* Använda en form av HTML/sass för flera olika sidor (produkter)
* Responsivitet
 * Grids

## Inledning
Målet med den här slutuppgiften är att gå tillbaka till hemsidan “dr. peppa” skapat för mitt gymnasiearbete och förbättra den. Det är ett större fokus på sådant gjort under webbserverprogrammeringen då det saknades under vissa tidigare projekt. 

## Bakgrund
Bakgrunden för detta projekt är nog ganska självklart. Grunden kommer från sidan jag gjorde inför mitt gymnasiearbete, där målet var att göra två sidor och jämföra om Conversion Rate Optimization är en giltig metod för att förbättra sidor eller om det borde undvikas. Det var en statisk sida där utseendet var det primära fokuset. Det var helt enkelt bara en koll på HTML och css (sass). För att det skulle bli mer fokus på det vi har gjort under året förklarade Webbserverprogrammeringsläraren (du (hej, Jens)) att jag borde jobba med mer backend (serverrelaterat) för att åtgärda faktumet att jobbet jag gjorde saknade funktioner kursen fokuserade på. 

Jag använde mig av databaser med hjälp av TablePlus och MySQL. På grund av routes kunde jag koppla dessa funktioner med min frontend för att skapa sidor för alla produkterna i databasen samt för att kunna skapa ett konto med en egen varukorg. Mycket av utseendet är taget från den orginella gymnasiearbetesidan, dock med många ändringar för att den skulle vara mindre statisk samt använda sig av det vi gjort under året. Framförallt med införandet av grid. Sedan, sist men... eller ja... det är väl minst. För mindre skärmstorleker behövs det såklart responsivitet. @media i sass:en gör att det finns en mobilversion. Samt ändrar storleken på element beroende på hur smal (eller bred) skärmen är. Den är scaleable, så att säga.

## Negativa erfarenheter
Ärligt talat fanns det ingenting jag skulle påstå var negativt med detta arbete. Majoriteten av det jag gjorde fungerade och det tog inte lång tid innan funktioner som var fel (på grund av utvecklarfel) var fixade och förstådda. Dock, som nästan alltid, var navbar:en det svåraste att jobba med. Tack vare grid-systemet var den lättare att anpassa men upplägget av den blir alltid riktigt perfekt.

## Positiva erfarenheter
Det var kul att sätta förmågorna jag har samlat under året på prov, då arbetsprocessen med dessa funktioner faktiskt börjar kännas bekant. Dessutom faktumet att jag tog någonting gammalt och anpassade det för att passa kursen bättre gjorde allting ännu roligare eftersom det finns någonting jag kan jämföra slutprodukten mer.

## Sammanfattning
Allt som allt har jag förbättrat hur min gymnasiearbetesida fungerade med funktioner tagna från det vi gjort under årets kurs. Med en databas har jag skapat produkter att visa på min fiktiva handelssida. Nu är den inte statiskt längre! Hurra! Nu känns sidan faktiskt som en hemsida någon skulle teoretiskt sätt kunnat använda för att köpa produkter.