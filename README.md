## Dokumentáció

### Követelményanalízis

1. Követelmények összegyűjtése: 
  1. Funkcionális elvárások
    - Vendégként szeretnék regisztrálni az oldalra.
    - Vendégként szeretnék tudni bejelentkezni az oldalra.
    - Családfőként szeretnék új csoportot létrehozni a családnak.
    - Családfőként szeretnék hierarhiát felállítani a családban.
    - Családfőként szeretnék új tagokat hozzáadni a csoporthoz.
    - Családfőként szeretnék kivenni / betenni pénzt bárki kasszájából/ba.
    - Családtagként szeretnék feladatokat delegálni az alám rendelt személyeknek.
    - Családtagként szeretném jelölni, hogy végrehajtottam a feladatot.
    - Családtagként szeretném nyomon követni az általam kiszabott feladatokat.
    - Családtagként szeretnék kivenni / betenni pénzt a saját kasszámból/ba.
  2. Nem funkcionális követelmények
    - Felhasználóbarát, ergonomikus elrendezés és kinézet.
    - Gyors működés.
    - Biztonságos működés: jelszavak tárolása,funkciókhoz való hozzáférés.
2. Szakterületi fogalomjegyzék: ha vannak speciális fogalmak, akkor ezeket itt lehet összegyűjteni és magyarázni.
  - Alárendelt személy: Egy vezető hatáskörébe helyezett személy, aki felett irányítást gyakorolnak (feladatokat adnak neki).
  - ToDo: Angol kifejezés. A kiszabott feladat.
3. Használatieset-modell
  1. Szerepkörök:
    - Vendég: Lehetősége van regisztrálni és bejelentkezni az oldalra.
    - Családtag: A vendég szerepkörén túl lehetősége van feladatokat delegálni az alárendelt családtagoknak, jelölni, hogy végrehajtotta a feladatot, nyomonkövetni az általa kiszabott feladatokat, menedzselni a saját kasszáját.
    - Családfő: A családtag szerepkürén túl lehetősége van új csoportot létrehozni a családnak (max 1), hierarhiát felállítani a családban, új tagokat hozzáadni a csoporthoz, bárki kasszáját menedzselni.
    2. Használati eset diagramok: 
    ![](https://dl.dropboxusercontent.com/u/203114437/AlkFejl/usecase.png)
    3. Folyamatok pontos menete:
    ![](https://dl.dropboxusercontent.com/u/203114437/AlkFejl/ToDo-k%20list%C3%A1z%C3%A1sa.png)
    ![](https://dl.dropboxusercontent.com/u/203114437/AlkFejl/%C3%BAj%20csal%C3%A1dtag%20hozz%C3%A1ad%C3%A1sa.png)
    

### Tervezés

1. Architektúra terv
    1. komponensdiagram
    2. Oldaltérkép
    	- Vendég:
	      - Főoldal
	      - Regisztráció
	      - Bejelentkezés

	    - Családtag:
	      - Kilépés
	      - Kasszák listázása
		       + Kassza módosítás
	      - Saját ToDo listázás
		       + ToDo módosítás (végrehajtás jelzése)
	      - Kiadott ToDo-k listázása
		       + Új felvétele

	   - Családfő
	      - Családtagok listázása
		      + Új családtag felvétele
		      + Családtag alárendelése
	
    3. Végpontok
    	- GET /: főoldal
	    - GET /register: regisztráló oldal
	    - POST /register: regisztrálási adatok felküldése
	    - GET /login: bejelentkező oldal
	    - POST /login: bejelentkezési adatok felküldése
	    - GET /vault: kassza adatok megtekintése
	    - POST /vault: kassza módosítás felküldése
      - GET /todoes: kiszabott feladatok listázása	
      - POST /todoes/: id: todo módosítás felküldése
      - GET /todoes/byme: általam kiadott feladatok listázása
      - GET /todoes/create: új feladat kiadása
      - POST /todoes/create: új feladat felküldése

2. Felhasználóifelület-modell
    1. Oldalvázlatok
    ![Főoldal](https://dl.dropboxusercontent.com/u/203114437/AlkFejl/Fooldal.PNG)
    ![Regisztráció](https://dl.dropboxusercontent.com/u/203114437/AlkFejl/Regisztr%C3%A1ci%C3%B3.PNG)
    ![Bejelentkezés](https://dl.dropboxusercontent.com/u/203114437/AlkFejl/bejelentkezes.PNG)
    ![Feladatok](https://dl.dropboxusercontent.com/u/203114437/AlkFejl/feladatok.PNG)
    ![Feladatok kiadása](https://dl.dropboxusercontent.com/u/203114437/AlkFejl/feladat_kiadasa.PNG)
    ![Kiadott feladatok](https://dl.dropboxusercontent.com/u/203114437/AlkFejl/Kiadott%20feladatok.PNG)
    ![Kassza](https://dl.dropboxusercontent.com/u/203114437/AlkFejl/Kassz%C3%A1k.PNG)
    
3. Osztálymodell
    1. Adatmodell  
      ![](https://dl.dropboxusercontent.com/u/203114437/AlkFejl/adatmodell2.png)
    2. Adatbázisterv
      * Relációs adatmodell alkalmazása
    3. Állapotdiagram
      * ToDo állapotátmenete  
      ![](https://dl.dropboxusercontent.com/u/203114437/AlkFejl/state-machine.PNG)
	 

### Megvalósítás

1. Fejlesztői környezet
    - Visual Studio Code
		Ingyenes Microsoft fejlesztői környezet, beépített parancssorral, ezzel könnyűvé téve parancsok kiadását.
	- GitHub
		Ingyenes verziókezelő rendszer, segítségével a fejlesztés folyama ütemezhető és átlátható.
		
2. Könyvtárstruktúra
	- app/Model  
		Ez tartalmazza az alkalmazás különböző modelljei. A fájlok neve tükrözi a bennük lévő osztályt.
	- app/Http/Controllers  
		Az összes kontroller itt található, a különböző végpontok megnyitásakor hívódnak meg a függvényeik.
	- app/Http/routes  
		A különböző végpontok és különböző Controllerek összekapcsolására szolgál.
	- database/development.sqlite  
		Az adatbázis fájl, melyet az sqlite használ.
	- public  
		Az oldalak által használt js és css fájlokat tartalmazza.
		A különböző javascript funkciók itt lettek implementálva.
	- resources/views  
		A különböző nézeteket tartalmazza, dinamikusan tölthetőek fel adatokkal.
	- tests/Selenium
		A Selenium IDE által futtatható teszteket tartalmazza.		
		
3. Javascript funkcionalitások
	- Ajax login  
		A kevesebb navigáció érdekében egy felugró ablak segítségével történik a beléptetés.
	- Ajax család készítés  
		Szintén a kevesebb navigáció érdekében a család regisztrálás is felugró ablak segítségével történik.
	- Ajax ToDo készítés  
		Dupla ellenőrzés érdekében ajax segítségével egy köztes lépés lett beiktatva.
	- Szűrés  
		A kényelem kedvéért van lehetőség szűrni a emberek nevét felvételkor.
	- Módosítások elvetése  
		Az emberek hierarchiájának változtatásokor a nem mentett módosításokat jelzi.

### Tesztelés

1. Környezet  
	A Selenium IDE egy plugin a Firefox böngészőhöz. Segítségével a grafikus felületen van lehetőség tesztelni az alkalmazást.  
	A Firefox pluginok között található és itt is telepíthető fel.  
	Ezután a fejlesztői alkalmazások között található meg az IDE.  
	Indítás után lehetőség van importálni már meglévő teszteket.  
	
		
