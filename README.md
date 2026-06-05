# link-page

Diese Link-Seite ist eine einfache HTML-Seite, die als Startseite oder Dashboard für häufig besuchte Websites dienen kann. Sie ist in Tabs organisiert, um verschiedene Kategorien von Links zu gruppieren. Jeder Link wird als Karte dargestellt, die Informationen wie Titel, Beschreibung, Icon und Tags enthält.

Mit der Suche-Funktion (Strg+F) können die Links schnell gefunden werden, indem nach Titel, Beschreibung oder Tags gefiltert wird. Die Seite ist vollständig anpassbar, sodass die Farben, Icons und Inhalte der Links leicht geändert werden können.

Hier ist ein Beispiel für die JSON-Struktur, die zur Definition der Tabs und Links verwendet wird:

```json
{
      "tab": "Tab-Name",
      "links": [
        {
          "title": "Google",
          "url": "https://www.google.de",
          "desc": "Die weltweit führende Suchmaschine",
          "image": "images/...",
          "tag": "suche, web",
          "color": "blue"
        },
        {
          "title": "Grundgesetz",
          "url": "https://www.gesetze-im-internet.de/gg",
          "desc": "Verfassung der Bundesrepublik Deutschland",
          "icon": "🏛️",
          "tag": "verfassung, recht",
          "color": "green"
        }
      ]
}
```

Das Favicon-Logo wurde mit [realfavicongenerator](https://realfavicongenerator.net/) erstellt und kann durch Ersetzen der Dateien im `favicon`-Ordner angepasst werden. Die Farben der Karten können durch Ändern der CSS-Variablen in `style.css` angepasst werden.

## Beispiel live

[Hier](https://fabianbloch.github.io/link-page/) kann das Beispiel live angesehen werden. Es enthält zwei Tabs mit jeweils zwei Links, die als Karten dargestellt werden. Die Seite ist responsiv und funktioniert auf verschiedenen Bildschirmgrößen gut.

## Anpassung

Die Seite kann leicht angepasst werden, indem die JSON-Struktur in `index.html` geändert wird. Neue Tabs und Links können hinzugefügt oder bestehende bearbeitet werden. Die Farben der Karten können durch Ändern der CSS-Variablen in `style.css` angepasst werden. Icons können entweder als Emoji oder als Bild-URL hinzugefügt werden.
