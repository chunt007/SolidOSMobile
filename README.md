This is an early concept of a SolidOS Mobile App utilizing Expo Go and React Native. 

The earlier version utilized Ionic and Capcitor. But ran into many development issues due to severe versioning issues and compatibility. There were troubles testing the earlier version to Solidcommunity.net. Specifically ODIC auth. You may find yourself running into a lot of JDK Development issues specificlaly when utilizing those tools. Yes they are lightweight and probably more preferred in the open source community, but time was running out for a working version.

Comprehension of the pane registry for SolidOS and technical concepts like n3, turtle, and RDF files can overwhelm a beginning developer. 

Many may believe that Android Studio is required to start a mobile project, but Expo GO makes the development processs a lot simplier.

1. Why use a real phone and not an Android Emulator?

There are some limitations a developer can run into. To my understanding it is that Android Emulators have limitations when testing. You may see errors or not see things that are suppose to work in nature. This is why I suggest using a cheap phone of your choice and install the Expo GO app from the Google Play Store.

2. Why is this utilzing WebView? Why can't I just use my web browser to explore the solid page. What would be the point of such an application?
It is true that many users prefer to avoid an application entirely. They can bog down ram, take up space, and feel like a nuisance. But mobile applications leverage native support and pull data fast when a user needs it. It is also a fast way to keep track of any solid connected data you have with other providers. This is simply a concept app of what could be. I do not claim that any one process is superior. This is just getting the job going a lot faster. If any user prefers, they can take this code from this and make their own applications. It can be a challenge to read the documentation when you can simply learn by doing! It is also a simple way to store cookies when you toggle between tabs and test features. 


This was built and designed on a Windows 11 machine.

Subsystem for Linux was not used in the process of this development. Poweshell command line and Git for Windows BASH was utilized at times.






This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
