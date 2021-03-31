# Firebase Introduction

A comprehensive introduction to authentication and databases using [Firebase](https://firebase.google.com/).

View the [**live example**](https://ssw-322.web.app/).

## Getting started

1. [Sign in](https://console.firebase.google.com/) to the Firebase Console

1. Create a new project in the Firebase Console

1. Install the CLI

   ```bash
   npm install -g firebase-tools
   ```

   > The CLI can be used later for deployment.

1. Sign in to your firebase account with [`firebase-tools`](https://github.com/firebase/firebase-tools)

   ```bash
   firebase login
   ```

1. Install Angular

   ```bash
   npm install -g @angular/cli
   ```

1. Create a new Angular project

   ```bash
   ng new <my-new-app>
   ```

1. Add `@angular/fire`

   ```bash 
   ng add @angular/fire
   ```

1. [Add firebase](https://fireship.io/snippets/install-angularfire/) (api-keys/modules) to your project

1. Use the [Angular CLI](https://angular.io/cli)

   ```bash
   ng serve
   ng generate ...
   ng build
   ```

## Angular

The included Angular app demonstrates the basics of `Firebase Authentication` and the `Cloud Firestore` database. In this example a basic to do list app is created that allows users to login, view, and edit their list of *todos*.  

### Authentication

Firebase provides easy integration via several providers for authenticating users with your applications. 

> Be sure to enable your preferred authentication provider in the firebase console.

### Database

Cloud Firestore is a document based database (NoSQL) most similar to MongoDB (more info [here](https://www.youtube.com/watch?v=v_hR4K4auoQ&list=PLl-K7zZEsYLluG5MCVEzXAQ7ACZBCuZgZ)).

> Be sure to enable test mode under security rules to get started.

In this example, there are two collections: one for `users` and another for `todos`. The users collection is populated/updated on sign-in in `auth.service.ts`.

`users`
```
{
   uid: "abc1234",
   displayName: "John Smith",
   email: "johnsmith@gmail.com",
   photoURL: "..."
}
...
```

`todos`
```
{
   userId: "abc1234",
   name: "something todo"
}
...
```

> Note: in a production environment a user's todo list should be secured via Firestore [security rules](https://firebase.google.com/docs/rules/basics?authuser=0).


## Resources

- [Cloud Firestore Video Series](https://www.youtube.com/watch?v=v_hR4K4auoQ&list=PLl-K7zZEsYLluG5MCVEzXAQ7ACZBCuZgZ)
- Fireship [Youtube Channel](https://www.youtube.com/channel/UCsBjURrPoezykLs9EqgamOA)
  - [Angular Essentials](https://www.youtube.com/watch?v=oqZ4-ULwfbc&list=PL0vfts4VzfNjsTV_6i9a9iczMnthWqHzM)
  - [Authentication](https://www.youtube.com/watch?v=e8GA1UOj8mE&list=PL0vfts4VzfNg7nTsEkiWCCNB8BvoZcPz4)
  - [Firebase Basics](https://www.youtube.com/watch?v=2ciHixbc4HE&list=PL0vfts4VzfNj28Xp5kmNAdIqABNGhTzKF)
  - [Firestore](https://www.youtube.com/watch?v=jm66TSlVtcc&list=PL0vfts4VzfNiPCzuRPXFZS1Hnw_RvVEXR)
  - [Reactive Forms](https://www.youtube.com/watch?v=JeeUY6WaXiA&t=603s)
  - [Reactive Forms w/ Firestore](https://www.youtube.com/watch?v=MG8n8ggY0mk)
- [AngularFire docs](https://github.com/angular/angularfire)
- [Getting started with Angular Material](https://material.angular.io/guide/getting-started)
- [Angular Material Components](https://material.angular.io/components/categories)
- [RXJS Marbles](https://rxmarbles.com/)
