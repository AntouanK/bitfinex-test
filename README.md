# Bitfinex test

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


## exercise given

Bitfinex Frontend Developer Programming Challenge
Overview
Create a web application that replicates the Order Book, Trades and Ticker widgets functionality from the Trading page of the Bitfinex website.
https://www.bitfinex.com/trading

![image_1](https://lh4.googleusercontent.com/7ZxBj7VY-JL-Ug---Kgp1YAgp07kQb38MxRSMrQVBy4JBAZcZiuN52ibAzA2-5kMcp2gdljHvHWi6ybZ54mPl18hmdN2xUnpxvv3--zf3LJxr8F_xQyY-0jcJwo1W6gbA9NO_GQ9=w1287-h1460)

Order Book
Similarly to the book from the website, the created Order Book should have the ability to change precision of the price column, and to change scaling of the depth bars. Price alerts management and layout configuration features are not required.
Trades
The trades widget is supposed to show trades executed on the market, showing a user’s own trades via authenticated API access is not required.


Ticker

The ticker is a small widget that shows the current trade pair, 24 hours volume, 24 hours price change in percents, and last price for that pair.

[ticker](https://lh3.googleusercontent.com/w2J_v7540LdaaGsdstgDmF05opJrKK56fzaVl2XacELAzdlDZGFe9fjujbR7mVSXvfro-jefJmV0JnwGShqrgRnqv90Jlyi0hoccsBka2SQ3qHISPctkXF3Plv2DheroxcqOlm9r)

General Requirements

All of the widgets should conceptually be the same as the corresponding widgets on the Bitfinex website. They should show the data in real time, and should have the ability to recover after lost network connection. Add some controls to manage the websocket connection such as “Connect” and “Disconnect” buttons.
Technological Requirements
Use React for rendering and Redux to store the market data. Feel free to create a custom CSS style for the widgets, it can be very simple. Use Bitfinex WebSocket V2 API to obtain the data.
https://docs.bitfinex.com/v2/docs
Suggestions
Use this React template to bootstrap your application quickly
https://github.com/facebook/create-react-app


