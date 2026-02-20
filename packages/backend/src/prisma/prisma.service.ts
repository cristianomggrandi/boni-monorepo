import { PrismaClient } from "@boni/database"
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common"
import { PrismaPg } from "@prisma/adapter-pg"
import "dotenv/config"

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
        super({ adapter })
    }

    async onModuleInit() {
        try {
            await this.$connect()
            console.log("[Prisma] ✓ Connected to database successfully")
        } catch (error) {
            console.error("[Prisma] ✗ Failed to connect to database:", error)
            throw error
        }
    }

    async onModuleDestroy() {
        try {
            await this.$disconnect()
            console.log("[Prisma] ✓ Disconnected from database")
        } catch (error) {
            console.error("[Prisma] ✗ Failed to disconnect from database:", error)
            throw error
        }
    }
}
