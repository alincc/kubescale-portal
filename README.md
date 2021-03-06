# Kubescale Portal

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

## Development server

Run `ng serve -o` for a dev server. Navigate to `http://localhost:1337/`. The app will automatically reload if you change any of the source files.

## Generating components, services and directives

When contributing to the project, use CLI for generation of directives in a following manner to follow the general folder structure:

Run `ng g component components/<name>` to generate a new component. 

Run `ng g directive directives/<name>/<name>` to generate a new directive. 

Run `ng g service services/<name>Service/<name>` to generate a new service. 

## Code style

The project uses 4 spaced inlines. Variables are to use camelCase, CSS class names are to use kebab-case. General rules, regarding the code style are declared in `tslint.json`.

## Build

Run `ng build --prod --base-href "https://<USER_NAME>.github.io/<REPO_NAME>/"
` to build the application and deploy it to GitHub Pages by running `ngh` command (requires `angular-cli-ghpages
` package, that can be installed by `npm install -g angular-cli-ghpages`). The build artifacts will be stored in the `dist/` directory and committed to `gh-pages` branch.
