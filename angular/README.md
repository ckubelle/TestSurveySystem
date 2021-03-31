# Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.6.

> *The project structure is for demonstration purposes only. Check out [this repo](https://github.com/robertschaedler3/Scalable-Angular-Project) a more sustainable project structure.*

Install Firebase
```
npm i @angular/fire firebase
```

Import firebase modules
```typescript
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBTX9YUButf8jub-KPa6FYw4jE7M43i6EQ",
      authDomain: "surveycreator-859ac.firebaseapp.com",
      databaseURL: "https://surveycreator-859ac-default-rtdb.firebaseio.com",
      projectId: "surveycreator-859ac",
      storageBucket: "surveycreator-859ac.appspot.com",
      messagingSenderId: "206479619725",
      appId: "1:206479619725:web:79cc75b3e956a05c0b54c4",
        measurementId: "G-7C2RE14J5L"
    }),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule   // auth
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

[**Full guide here**](https://fireship.io/snippets/install-angularfire/)