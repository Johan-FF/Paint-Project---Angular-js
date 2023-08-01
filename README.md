# ProyectoPAINT

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.6.

This is a real-time online drawing project, i.e. multi-user. 

![ezgif com-video-to-gif](https://github.com/Johan-FF/Paint-Project---Angular-js/assets/94552691/2c686b66-00d2-4e30-ad75-c0bd4d71a613)

In the latest update it is possible to draw polygons and lines, as well as to change the color and position of the elements on the canvas.

## Configuration

If you want to change the urls of the APIs used, access environments/environment.ts and change the urls "api_url" for the management of users and drawings, and "ws_url" for the management of the wbesocket that guarantees real-time operation, inside the constant "environment".
If you want to see the documentation of the backend used, please consult:  [User-API---FastAPI](https://github.com/Johan-FF/User-API---FastAPI.git)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
