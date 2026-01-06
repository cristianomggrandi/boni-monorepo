import { PrismaClient, Role } from "@boni/database"
import { PrismaPg } from "@prisma/adapter-pg"
import "dotenv/config"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
    // Limpar dados existentes (opcional, para re-seed)
    await prisma.appointment.deleteMany()
    await prisma.service.deleteMany()
    await prisma.address.deleteMany()
    await prisma.worker.deleteMany()
    await prisma.business.deleteMany()
    await prisma.category.deleteMany()
    await prisma.user.deleteMany()

    // User - Customer
    await prisma.user.create({
        data: {
            email: "admin@admin.com",
            name: "Admin User",
            password: "asdasd", // Em produção, hash real
            role: Role.ADMIN,
        },
    })

    // Novo Admin
    const newAdmin = await prisma.user.create({
        data: {
            email: "teste@admin.com",
            name: "Teste Admin",
            password: "asdasd",
            role: Role.ADMIN,
        },
    })

    // User - Customer
    const user = await prisma.user.create({
        data: {
            email: "customer@example.com",
            name: "João Silva",
            password: "hashedpassword", // Em produção, hash real
            role: Role.USER,
            phone: "11999999999",
            birthday: new Date("1990-01-01"),
        },
    })

    // User - Worker
    const workerUser = await prisma.user.create({
        data: {
            email: "worker@example.com",
            name: "Maria Oliveira",
            password: "hashedpassword",
            role: Role.WORKER,
        },
    })

    // Category
    const category = await prisma.category.create({
        data: {
            name: "Cabelo",
            description: "Serviços de cabelo",
        },
    })

    // Business (sem manager ainda)
    const business = await prisma.business.create({
        data: {
            name: "Salão Boni",
        },
    })

    // Worker
    const worker = await prisma.worker.create({
        data: {
            userId: workerUser.id,
            businessId: business.id,
            employeeId: "EMP001",
            hireDate: new Date("2023-01-01"),
        },
    })

    // Atualizar Business com manager
    await prisma.business.update({
        where: { id: business.id },
        data: { managerId: workerUser.id },
    })

    // Address
    const address = await prisma.address.create({
        data: {
            businessId: business.id,
            streetNumber: "123",
            street: "Rua Principal",
            city: "São Paulo",
            state: "SP",
            zipCode: "01234-567",
            country: "Brasil",
            latitude: -23.5505,
            longitude: -46.6333,
        },
    })

    // Service
    const service = await prisma.service.create({
        data: {
            name: "Corte de Cabelo",
            description: "Corte masculino",
            businessId: business.id,
            categoryId: category.id,
        },
    })

    // Appointment
    const appointment = await prisma.appointment.create({
        data: {
            date: new Date("2025-12-20T10:00:00Z"),
            userId: user.id,
            businessId: business.id,
            workerId: workerUser.id,
            services: {
                connect: { id: service.id },
            },
        },
    })

    // Appointments para o novo admin
    await prisma.appointment.create({
        data: {
            date: new Date("2026-02-01T10:00:00Z"),
            userId: newAdmin.id,
            businessId: business.id,
            workerId: workerUser.id,
            services: {
                connect: { id: service.id },
            },
        },
    })

    await prisma.appointment.create({
        data: {
            date: new Date("2026-02-15T14:00:00Z"),
            userId: newAdmin.id,
            businessId: business.id,
            workerId: workerUser.id,
            services: {
                connect: { id: service.id },
            },
        },
    })

    await prisma.appointment.create({
        data: {
            date: new Date("2025-12-01T09:00:00Z"),
            userId: newAdmin.id,
            businessId: business.id,
            workerId: workerUser.id,
            services: {
                connect: { id: service.id },
            },
        },
    })

    await prisma.appointment.create({
        data: {
            date: new Date("2025-12-10T16:00:00Z"),
            userId: newAdmin.id,
            businessId: business.id,
            workerId: workerUser.id,
            services: {
                connect: { id: service.id },
            },
        },
    })

    console.log("Database seeded successfully!")
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
