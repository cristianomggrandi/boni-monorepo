// Import from the generated client
import { Prisma as GeneratedPrisma, PrismaClient as GeneratedPrismaClient } from "../generated/prisma/client.js"

// Re-export the Prisma client
export const PrismaClient = GeneratedPrismaClient
export const Prisma = GeneratedPrisma

// Re-export all types
export * from "../generated/prisma/client.js"
export * from "../generated/prisma/enums.js"

// Re-export commonly used types for convenience
export type { Address, Appointment, Business, Category, Service, User, Worker } from "../generated/prisma/client.js"

// Re-export enums as values (not just types)
export { Role } from "../generated/prisma/enums.js"
