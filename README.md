# SuperGenPass Chrome Extension

A simple and straightforward [SuperGenPass](https://chriszarate.github.io/supergenpass/) Chrome Extension for those of us who don't want to use the bookmarklet or for those browsers that don't support bookmarklets (I'm looking at you, Vivaldi !)

## Motivation

Actually, this is the reason why I wrote this extension, since I'm using Vivaldi as my main browser and it has some weird bug that doesn't allow me to run the SuperGenPass bookmarklet.

The extension is built using React (boilerplate generated by `create-react-app`).

## Privacy and other concerns

The only permission that the extension needs is `activeTab`. 

Besides this, the extension doesn't make any network calls and doesn't store any kind of information.

For the hashing algorithm, I used the [official Javascript implementation of SuperGenPass](https://github.com/chriszarate/supergenpass-lib) installed as a npm module.

## Manually installing the extension

1. clone this repository
2. open a terminal, navigate to where you've cloned the repo and run `npm i`
3. run `npm run build`. This will create a `build` folder.
4. open any Chrome based browser, type `chrome://extensions` in the address bar
5. enable `Developer mode` by flicking the switch on the top-right corner
6. click on the `Load unpacked` button and select the aforementioned `build` folder

## Power (a.k.a. lazy) users

If you're like me and you don't want to write your master password each time you want to generate a password for a website (please don't judge), I implemented a possible workflow for this scenario - you can inject a local environment variable into the `build` folder.

Just follow the steps described above, but instead of `step 3`, do the following:
- create a `env.development` file
- add a `REACT_APP_MASTER_PASSWORD` variable into the file
  - example: `REACT_APP_MASTER_PASSWORD=this_is_my_master_password`
- run `npm run build:development`.
- continue with the next steps described above