import { PrismaClient } from "@boni/database"
import { Injectable } from "@nestjs/common"
import { PrismaPg } from "@prisma/adapter-pg"
import "dotenv/config"

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        console.log("TESTE 3:", process.env.DATABASE_URL)
        const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
        super({ adapter })
    }
}
