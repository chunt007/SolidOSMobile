Created with EXPO Go + React Native

Simply download the package, install the necessary libraries, and download EXPO GO for android from the Google Play Store.

Do not forget to install your packages by using npm install once you have extracted the zipfile.

Once you have done this, start your development server in VSCode, scan the QRCode after metro bundler loads up, and you can test SolidOS Mobile live on your device!

No need for Android Development Studio or Emulators.

You can use your android device.

This uses WebView to store cookies like most mobile apps including Facebook, Twitter, and Instagram. 

No EAS account needed. 

Coming soon for Apple IPhone.

This is an early prototype of what's to come. Many may ask why SolidOS needs an application and to that, many mobile applications probably don't need an application.

But running tons of tabs inside of a browser is not idle and eats your ram. With SolidOS for mobile, you can upload and send files remotely.

Make sure you login into your pod provider first before you attempt to delete or upload any files. Solidcommunity.net seems to work well with this application. 

Be sure to change export const SOLID_POD_FOLDER_URL = "https://yourname.solidcommunity.net/"; inside of solidClient.ts to get the turtle folder listing.

Be sure to change export const SOLID_FOLDER_URL = "https://yourname.solidcommunity.net/profile/"; to your name. As of now, you can upload from your android device using a file picker and the file should upload. You can also delete files as long as you are logged in. Unless you are attempting to delete files from the root, it will not work at this time.


