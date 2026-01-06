# Design Document

## Overview

This design outlines the transformation of the current project structure into a monorepo containing three distinct projects: backend, mobile, and a new shared database project. The database project will extract and centralize the Prisma client and schema management, enabling both backend and mobile applications to share the same database types and client functionality.

The restructuring will use npm workspaces for dependency management and maintain backward compatibility with existing functionality while providing a cleaner separation of concerns.

## Architecture

### Monorepo Structure

```
root/
├── package.json (workspace configuration)
├── packages/
│   ├── database/
│   │   ├── package.json
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   ├── src/
│   │   │   └── index.ts (exports Prisma client)
│   │   └── tsconfig.json
│   ├── backend/ (moved from ./backend)
│   │   ├── package.json (updated dependencies)
│   │   └── ... (existing structure)
│   └── mobile/ (moved from ./mobile)
│       ├── package.json (updated dependencies)
│       └── ... (existing structure)
└── node_modules/ (hoisted dependencies)
```

### Dependency Flow

-   **Database Project**: Standalone package that generates and exports Prisma client
-   **Backend Project**: Imports database package for all database operations
-   **Mobile Project**: Imports database package for type definitions and client access

## Components and Interfaces

### Database Package Interface

```typescript
// packages/database/src/index.ts
export { PrismaClient } from "@prisma/client"
export * from "@prisma/client"

// Re-export commonly used types
export type { User, Worker, Business, Category, Service, Appointment, Address, Role } from "@prisma/client"
```

### Workspace Configuration

```json
// root/package.json
{
    "name": "boni-monorepo",
    "private": true,
    "workspaces": ["packages/*"],
    "scripts": {
        "build": "npm run build --workspaces",
        "build:database": "npm run build -w @boni/database",
        "build:backend": "npm run build -w @boni/backend",
        "build:mobile": "npm run build -w @boni/mobile",
        "dev": "npm run dev --workspaces --if-present",
        "db:generate": "npm run db:generate -w @boni/database",
        "db:migrate": "npm run db:migrate -w @boni/database",
        "db:push": "npm run db:push -w @boni/database"
    }
}
```

### Database Package Configuration

```json
// packages/database/package.json
{
    "name": "@boni/database",
    "version": "1.0.0",
    "main": "dist/index.js",
    "types": "dist/index.d.ts",
    "scripts": {
        "build": "tsc",
        "db:generate": "prisma generate",
        "db:migrate": "prisma migrate dev",
        "db:push": "prisma db push",
        "db:reset": "prisma migrate reset --force"
    },
    "dependencies": {
        "@prisma/client": "^7.2.0"
    },
    "devDependencies": {
        "prisma": "^7.2.0",
        "typescript": "^5.7.3"
    }
}
```

## Data Models

The existing Prisma schema will be moved to the database package without modification, maintaining all current models:

-   **User**: Core user entity with role-based access
-   **Worker**: Employee/service provider entity
-   **Business**: Business/organization entity
-   **Category**: Service categorization hierarchy
-   **Service**: Available services offered by businesses
-   **Appointment**: Booking/scheduling entity
-   **Address**: Location data for businesses

The schema output configuration will be updated to generate types in the database package's build directory for proper distribution.

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

**Property 1: Database package import compatibility**
_For any_ project importing the database package, all Prisma client methods and types should be accessible and functional
**Validates: Requirements 1.2, 1.3**

**Property 2: Schema change propagation**
_For any_ valid schema modification, regenerating the database package should make updated types available to all consuming projects
**Validates: Requirements 1.4**

**Property 3: Migration backward compatibility**
_For any_ existing codebase functionality, migrating to the monorepo structure should preserve all existing behavior
**Validates: Requirements 1.5, 3.1, 3.2, 3.3**

**Property 4: Dependency hoisting consistency**
_For any_ common dependency across projects, npm workspace installation should hoist shared dependencies to the root level
**Validates: Requirements 2.2**

**Property 5: Build system flexibility**
_For any_ project in the workspace, the build system should support both individual project builds and workspace-wide builds
**Validates: Requirements 2.3**

**Property 6: Script execution across workspaces**
_For any_ npm script, the workspace configuration should support running scripts across all or specific workspaces
**Validates: Requirements 2.4**

**Property 7: Import path resolution**
_For any_ updated import statement, all references should resolve correctly to the new database project location
**Validates: Requirements 3.4**

**Property 8: Environment and build preservation**
_For any_ existing environment configuration or build process, the migration should maintain functionality without modification
**Validates: Requirements 3.5**

## Error Handling

### Migration Errors

-   **Dependency Conflicts**: Handle version mismatches between projects during workspace setup
-   **Import Resolution Failures**: Provide clear error messages for broken import paths during migration
-   **Build Failures**: Ensure graceful handling of build errors with rollback capabilities

### Runtime Errors

-   **Database Connection Issues**: Maintain existing error handling for database connectivity
-   **Type Mismatches**: Provide clear TypeScript errors for type incompatibilities
-   **Package Resolution**: Handle cases where database package is not properly installed or built

### Development Workflow Errors

-   **Schema Generation Failures**: Provide clear feedback when Prisma generation fails
-   **Workspace Command Errors**: Handle npm workspace command failures gracefully
-   **Cross-Package Dependency Issues**: Detect and report circular dependencies or missing dependencies

## Testing Strategy

### Dual Testing Approach

This feature requires both unit testing and property-based testing to ensure comprehensive coverage:

-   **Unit tests** verify specific migration steps, configuration examples, and integration points
-   **Property tests** verify universal behaviors that should hold across all workspace operations and migrations

### Unit Testing Requirements

Unit tests will cover:

-   Specific workspace configuration examples
-   Individual migration steps (moving files, updating package.json)
-   Integration between database package and consuming projects
-   Build script functionality for each project type

### Property-Based Testing Requirements

Property-based testing will use **fast-check** for JavaScript/TypeScript to verify:

-   Import compatibility across different project configurations
-   Schema change propagation with various schema modifications
-   Dependency hoisting behavior with different dependency combinations
-   Build system flexibility with various project structures

Each property-based test will run a minimum of 100 iterations and be tagged with comments referencing the corresponding correctness property using the format: **Feature: database-extraction, Property {number}: {property_text}**

Each correctness property will be implemented by a single property-based test that validates the universal behavior described in the property statement.
