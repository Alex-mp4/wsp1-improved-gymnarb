# Planering för dr. peppa (Improved Gymnasiearbete)

Målet med den här slutuppgiften är att gå tillbaka till hemsidan “dr. peppa” skapat för mitt gymnasiearbete och förbättra den. Det är ett större fokus på sådant gjort under webbserverprogrammeringen då det saknades tidigare. Inklusioner jag hoppas skapa är i listan nedan.

* Gör navbaren till en grid för symmetri
* Databas för sortiment (använder det vi gjort under forum projektet)
  * Namn
  * Bild
  * Pris
    * Rabatt
  * Media
  * Produktinformation
    * Release date
    * Status
    * Weight
    * Shipping time
    * Song list
    * Recensioner
* Ytterligare sidor
  * Sortimentsida
    * Filter
  * Produktsida
* Inloggningsdatabas
* Node, npm, mySQL
  * Ta från gamla projekt
* Varukorg
  * Spara i sessions
* Hjälpchat
  * Socket.io
* Sökfunktion
* Mobilanpassat
* Använd procent istället för absolut värden så att olika skärmstorlekar ser okej ut

## Planering

| vecka | tisdag | fredag |
|---|---|---|
| 16 | Planering | Initialize project, make files |
| 17 | Infoga style, grundstruktur, databas | ← |
| 18 | CSS | - |
| 19 | CSS | Varukorg, produktsidor |
| 20 | Varukorg, (sökning, filter,) katalog (feature complete) | - |
| 21 | Gör klart nuvarande features | Mobilanpassning |
| 22 | Finslipning, PM | - |

## Dokumentation

| vecka | tisdag | fredag |
|---|---|---|
| 16 | Planering | Jag har fixat all struktur på projektet, infört alla Node funktioner samt gjort databasen för användare. Nästa gång vill jag göra UI på sidan. |
| 17 | Jag har fixat databas för sortimentet, hämtat alla bilder och ikoner, skapat grundstrukturen på sidan (navbar, footer), stoppat in resterande views | Jag har stoppat in CSS för vissa saker och gjort att databasen faktiskt ger vettig information till servern. Nästa gång vill jag fixa sortiment sidan och göra att jag kan välja ett urval av produkter utifrån id, till exempel ska bestsellers bara ha 3 stycken |
| 18 | Jag har påbörjat grid-systemet samt skapat bilder och undersökt vilka CSS grejer som inte förstör “responsive”. Jag har tillsatt majoriteten av dessa och skapa ändringar vid behov (new code, new me). | - |
| 19 | Jag har gjort det mesta responsivt, navbaren ser okej ut och produktsidorna har fått mycket jobb. Dessutom har jag fyllt databasen med fler produkter. | Jag har jobbat med att koppla user och product med en cart, dessutom har jag fixat responsivitet lite här och där och allmän scss förbättring |
| 20 | Nu kan man lägga in saker in i sin cart och det finns en sida för alla produkter i en användares cart, några utseende förbättringar samt början på att collection ser okej ut (kolla med Jens om nth-child fungerar på node) | - |
| 21 | Collection ser ut som den ska, jag har skapat UI-design under bilden som det var förr, men det behövs finslipning. Fixa den delen nästa gång, skapa en köp knapp (tar bort cart) och mobilanpassning, sedan klar | Kan ta bort saker från vagnen samt köpa den, sidan är responsiv men lite knasig sådan |
| 22 | Länkar är rätt färg, fixade listan på botten av index produkterna, bättre responsivitet, PM | - |
