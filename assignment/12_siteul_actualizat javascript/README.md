# Adarta Detailing Auto

Acesta este proiectul meu pentru un site de tip magazin online. Site-ul este pentru produse de detailing auto.

Am facut mai multe pagini: pagina principala, catalog, reduceri, detalii produs, cos, checkout, login, inregistrare și comenzi.

Pentru proiect am folosit HTML, CSS, Bootstrap și JavaScript. Fisierele sunt organizate in foldere separate: css, js și images.

## Ce am folosit din JavaScript

In proiect am incercat să folosesc lucrurile învațăte la curs:

- variabile și constante;
- functii;
- if / else;
- bucle for;
- șiruri;
- obiecte;
- clase;
- incapsulare;
- mostenire;
- polimorfism simplu;
- try / catch;
- metode care returneaza valori.

## Integrare assignment OOP

In aceasta versiune am integrat clasele realizate la assignment-ul OOP in site-ul existent.

Produsele afisate pe site sunt produsele reale care existau deja in proiect. Ele sunt gestionate prin clasă Product.

Coșul de cumparaturi folosește clasă Cart. In cos se poate modifica cantitatea, iar totalul este calculat cu metoda din clasă.

Pentru utilizator am folosit clasă User, iar pentru exemplul de mostenire am folosit clasă Admin, care extinde User.

Am scos testele automate cu console.log() din fisierele principale, pentru ca site-ul să fie prezentat ca un proiect mai complet, nu doar ca un exercitiu testat in consola.

Metodele din clase nu afiseaza direct mesaje in consola. Ele returneaza valori, iar paginile folosesc aceste valori pentru afișare și calcul.

Scopul meu a fost să folosesc conceptele OOP învațăte la curs intr-un magazin online simplu și mai apropiat de un site real.

## Observatie

Am incercat să nu folosesc concepte avansate care nu au fost studiate in curs. Codul este scris simplu, ca pentru nivelul meu actual.

## GitHub

Link proiect:
https://github.com/Mtc22702/Adarta_Ecommerce


## Ultimele modificari

Am eliminat comportamentul neplăcut pentru cosul gol. Daca nu exista produse in cos, butonul de checkout nu mai duce utilizatorul spre finalizarea comenzii, ci il trimite inapoi la catalog pentru a alege produse.

Am mai verificat și câmpurile numerice pentru cos: subtotal, livrare, total, cantitate, numar produse și stoc. Am folosit doar JavaScript simplu: clase, obiecte, array-uri, for, if, DOM, evenimente și localStorage.

## Corectie cos

Am eliminat onclick-ul vechi din header pentru cos, ca să nu mai apăra mesaj când utilizatorul apăsă pe Cart.
Am verificat și sălvarea cosului in localStorage. Daca un produs este eliminat din cos, el poate fi adaugat din nou din catalog său din alta pagina unde exista butonul de adaugare.


## Imbunatatiri adaugate

- Produsele existente sunt folosite cu clasă Product.
- Coșul folosește clasă Cart și localStorage.
- Login-ul folosește clasă User.
- Catalogul are cautare, filtrare și sortare simpla.
- Formularul de checkout sălveaza comanda local.
- Pagina Comenzi afiseaza comenzile sălvate local.
- Newsletter-ul sălveaza emailul local.
- Nu au fost folosite framework-uri, backend său tehnici avansate.

## Actualizare paginare catalog

In pagina catalog am facut paginarea functionala cu JavaScript simplu.
Sunt afisate 9 produse pe prima pagina și 3 produse pe pagina a doua, deoarece site-ul are 12 produse in total.
Paginarea functioneaza impreuna cu filtrele din aside, cautarea și sortarea după pret.

## Actualizare header

Am verificat header-ul pe toate paginile site-ului.
Căutarea din header este acum aceeași pe toate paginile și trimite textul cautat catre pagina catalog.html.
In catalog, produsele sunt filtrate după textul cautat, impreuna cu filtrele din aside și paginarea.
Am pastrat implementarea simpla, cu DOM, evenimente, array-uri și localStorage.

## Actualizare preturi și ambalaje

Am adaugat variante de ambalaj pentru produsele care au mai multe litraje. Cand utilizatorul apăsă pe un ambalaj diferit in pagina produsului, pretul și specificatiile se actualizeaza in pagina.

La adaugarea in cos se sălveaza și ambalajul ales, nu doar produsul. Astfel același produs poate avea pret diferit in funcție de varianta aleasa.

Prețurile sunt orientative pentru piata din Romania și au fost ajustate după preturi gasite pe magazine online romanesti. Logica folosita ramane simpla: clase, array, obiecte, evenimente DOM și localStorage.
