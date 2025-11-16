Welcome to SolidOS for mobile

Project timeline

1. Expo Go and Android are currently working and being utilized.

2. Outdated libraries and depreciated command lines. 
In the process of creating a truly seamless mobile experience, there have been several issues such as tutorials both old and new.
certain commands and where to initate those commands in said directories can not always be held as the programming gospal.

3. Progress
   We will be using React Native and Expo GO. Unfortunately a lot of the libraries I have found from Solid app design are designed to work exclusively with React.
   This requires a translation or a conversation of some type. In the future, it is possible that we may have to design entire libraries
   that translate, serialize, convert, etc to mobile development environments.

React and React Native have different requirements and are designed for different purposes.

4. Authentication issues
@ldo/solid-react library redirects you to an "acceptable use policy page" in pivot, but does not redirect you back to your local server.
@inrupt/solid-client-authn-browser also stops at the  "acceptable use policy page" in pivot as well without redirect back to the localserver. 
However, the statement "import { authn, authSession } from "solid-logic";" Which is found in the profile-pane, seems to work.

But the profile-panes import { context, fetcher } from "./context";
import { authn, authSession } from "solid-logic"; I am assuming, redirects you just fine. Is anyone experiencing this?

