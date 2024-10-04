# Projekt Sterowania LEDami za pomocą interfejsu USB

## Opis projektu
Projekt sterowania LEDami za pomocą interfejsu USB wykorzystuje nowoczesne technologie, które zapewniają zarówno wygodę użytkowania, jak i wysoką efektywność działania systemu. Kluczowe komponenty technologiczne to panel użytkownika oraz integracja z LabVIEW.

## Technologie
- **React** - biblioteka JavaScript do budowania interfejsów użytkownika.
- **Tailwind CSS** - framework do stylizacji interfejsów użytkownika.
- **@uiw/react-color** - komponent do wyboru kolorów w aplikacji React.
- **LabVIEW** - środowisko programistyczne do systemów pomiarowych i sterujących.
- **HTTP/HTTPS** - protokoły komunikacyjne dla API.
### Panel Użytkownika
Panel użytkownika został opracowany z wykorzystaniem biblioteki **React**, co pozwala na tworzenie dynamicznych i responsywnych interfejsów użytkownika. React opiera się na komponentowej architekturze, umożliwiając łatwe zarządzanie stanem aplikacji oraz szybką reakcję na interakcje użytkownika.

Stylizacja panelu została wykonana przy użyciu **Tailwind CSS**, nowoczesnego narzędzia do tworzenia interfejsów użytkownika. Tailwind oferuje szeroki zestaw gotowych klas CSS, co pozwala na szybkie i efektywne tworzenie estetycznych oraz funkcjonalnych interfejsów bez potrzeby pisania dużej ilości własnego kodu CSS.

### Możliwości Panelu Użytkownika
Panel użytkownika w aplikacji sterującej LEDami oferuje szereg funkcji umożliwiających pełne zarządzanie urządzeniem:

1. **Wybór Koloru LED:**
   - Użytkownik może wybrać kolor LED z palety kolorów dostępnej w panelu. Wybór koloru odbywa się za pomocą komponentu `Sketch` z biblioteki `@uiw/react-color`. Wybrany kolor jest przesyłany do API w formacie RGB.
   
2. **Sterowanie Jasnością LED:**
   - Panel umożliwia ustawienie jasności LEDów w zakresie od 1% do 100%. Użytkownik może wprowadzić wartość jasności w odpowiednim polu tekstowym, a następnie wysłać żądanie zmiany jasności do API.
   
3. **Włączanie i Wyłączanie LED:**
   - Użytkownik może włączyć lub wyłączyć LEDy za pomocą dedykowanych przycisków. Stan LEDów (włączone/wyłączone) jest odczytywany z API i wyświetlany w panelu użytkownika.
   
4. **Sterowanie Pojedynczymi LED:**
   - Użytkownik ma możliwość wysyłania poleceń do konkretnej diody LED, poprzez wprowadzenie jej numeru. Możliwe jest wybranie koloru oraz numeru diody, a następnie wysłanie odpowiedniego żądania do API.

## Przesyłanie Danych do LabVIEW
Dane z panelu użytkownika są przesyłane za pomocą interfejsu API do środowiska **LabVIEW**, rozwijanego przez National Instruments. LabVIEW to zaawansowane narzędzie do projektowania systemów pomiarowych i sterujących, które pozwala na wizualne programowanie i integrację z różnorodnymi urządzeniami sprzętowymi.

W ramach projektu, API działa jako most łączący frontend aplikacji z backendem zarządzanym przez LabVIEW. Komunikacja odbywa się za pomocą standardowych protokołów **HTTP/HTTPS**, co zapewnia bezpieczeństwo i niezawodność przesyłu danych. API umożliwia dwukierunkową komunikację – panel użytkownika wysyła polecenia sterujące do LabVIEW, a LabVIEW zwraca dane zwrotne do panelu użytkownika.


![Panel użytkownika](https://i.imgur.com/alUorQy.png)

