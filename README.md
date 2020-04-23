# README

## Directory structure

### front
The frontend application built with [Nuxt.js](https://nuxtjs.org/). The application uses a **component-based architecture pattern**.

#### Components architecture

The `front` application follows a component based architecture with:
- `front/components/base-components`: base components that the only point is to display data and emit events
- `front/components/[dummy]`: functional components that implements business logic and use base components
- `front/pages`: pages that fetch the data and emit request to backend

#### API service
Methods to interact with REST Api are defined in `front/services/api.service.ts`.
This service is inject in Nuxt Context to be able to access it from components in `front/plugins/api-service.plugin.ts`.

#### VueX store
We use a VueX store to have a _frontend cache_ to store data from forms or fetched from backend. 
The store is organize by modules to simplify its evolution.  

### back
The backend application built with [NestJS](https://nestjs.com/). The application uses a **Clean Architecture pattern** (see below).

#### Clean Architecture
The `back` application is designed using a [Clean Architecture pattern](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) (also known as [Hexagonal Architecture](http://www.maximecolin.fr/uploads/2015/11/56570243d02c0_hexagonal-architecture.png)).
Therefore [SOLID principles](https://en.wikipedia.org/wiki/SOLID_(object-oriented_design)) are used in code, especially the [Dependency Inversion Principle](https://en.wikipedia.org/wiki/Dependency_inversion_principle) (do not mix up with the classic dependency injection in NestJS for example).

Concretely, there are 3 main packages: `domain`, `use_cases` and `infrastructure`. These packages have to respect these rules:
- `domain` contains the business code and its logic, and has no outward dependency: nor on frameworks (NestJS for example), nor on `use_cases` or `infrastructure` packages.
- `use_cases` is like a conductor. It will depend only on `domain` package to execute business logic. `use_cases` should not have any dependencies on `infrastructure`.
- `infrastructure` contains all the technical details, configuration, implementations (database, web services, etc.), and must not contain any business logic. `infrastructure` has dependencies on `domain`, `use_cases` and frameworks.  

#### Swagger documentation
To have an executable documentation of back APIs, Swagger documentation is available on the `/api/doc` endpoint.

### doc
Contains the technical documentation, such as **Architecture Decision Records (ADR)** (see below).

#### ADR
An Architecture Decision Record (ADR) is a document that captures an important architectural decision made along with its context and consequences. For more details, see [description by Michael Nygard](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions). 

We use Nat Pryce's [adr-tools](https://github.com/npryce/adr-tools) to keep the same pattern when adding a new ADR.

## Git strategy
We use [Feature Branch pattern](https://martinfowler.com/bliki/FeatureBranch.html) and [Gitmoji](https://github.com/carloscuesta/gitmoji) to easily categorize commits using emojis.

### Continuous Deployment
Every time a commit is pushed on `master` branch, it will be automatically deployed to DEV environment. Deployment to DEMO environment is on demand with a manual trigger.

## How-to
The `npm` commands are the same, whether you are on `back` or `front` application. 

### Requirements
- Node LTS 12.x

### Install
```
npm install
```

### Test
```
npm test
```

### Run
```
npm run start:dev
```

#### Database migrations

When running `back` for the first time, or after database deletion, you have to run migrations to create a local database, and another migration to populate it.
```
# Create database schema
npm run typeorm:migration:run

# Populate database
npm run typeorm:seed:run
```


#### REST API

* Swagger documentation: /api/doc/

### Environment variables
See [INSTALL.md](INSTALL.md).

 

