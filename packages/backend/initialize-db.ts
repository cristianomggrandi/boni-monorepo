import { PrismaClient, Role } from "@boni/database"
import { PrismaPg } from "@prisma/adapter-pg"
import "dotenv/config"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
    // Limpar dados existentes (opcional, para re-seed)
    await prisma.appointment.deleteMany()
    await prisma.service.deleteMany()
    await prisma.serviceGroup.deleteMany()
    await prisma.address.deleteMany()
    await prisma.worker.deleteMany()
    await prisma.business.deleteMany()
    await prisma.businessCategory.deleteMany()
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
    const categoriesData = [
        {
            name: "Cabelo",
            description: "Serviços de cabelo",
            subcategories: [
                { name: "Corte", description: "Cortes de cabelo" },
                { name: "Coloração", description: "Tinturas e colorações" },
                { name: "Tratamento", description: "Tratamentos capilares" },
            ],
        },
        {
            name: "Unhas",
            description: "Serviços de unhas",
            subcategories: [
                { name: "Manicure", description: "Cuidados das mãos" },
                { name: "Pedicure", description: "Cuidados dos pés" },
                { name: "Nail Art", description: "Decoração de unhas" },
            ],
        },
        {
            name: "Maquiagem",
            description: "Serviços de maquiagem",
            subcategories: [
                { name: "Maquiagem Social", description: "Maquiagem para eventos" },
                { name: "Maquiagem de Noiva", description: "Maquiagem para casamentos" },
                { name: "Maquiagem Artística", description: "Maquiagem criativa" },
            ],
        },
        {
            name: "Estética Corporal",
            description: "Tratamentos estéticos",
            subcategories: [
                { name: "Depilação", description: "Remoção de pelos" },
                { name: "Hidratação", description: "Tratamentos hidratantes" },
                { name: "Massagem Relaxante", description: "Massagens corporais" },
            ],
        },
        {
            name: "Massagem",
            description: "Serviços de massagem",
            subcategories: [
                { name: "Massagem Terapêutica", description: "Massagens para dores" },
                { name: "Massagem Relaxantee", description: "Massagens para relaxamento" },
                { name: "Reflexologia", description: "Massagem nos pés" },
            ],
        },
    ]

    let businessCategory
    for (const catData of categoriesData) {
        // Criar categoria principal
        const mainCategory = await prisma.businessCategory.create({
            data: {
                name: catData.name,
                description: catData.description,
            },
        })

        if (!businessCategory) businessCategory = mainCategory

        // Criar subcategorias
        for (const sub of catData.subcategories) {
            await prisma.businessCategory.create({
                data: {
                    name: sub.name,
                    description: sub.description,
                    parentId: mainCategory.id,
                },
            })
        }
    }

    // Business (sem manager ainda)
    const business = await prisma.business.create({
        data: {
            name: "Salão Boni",
            image: "https://example.com/salao-boni.jpg",
            categories: {
                connect: { id: businessCategory.id }, // Conecta à categoria "Cabelo"
            },
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

    // ServiceCategory for the business
    const serviceGroup = await prisma.serviceGroup.create({
        data: {
            name: "Serviços Gerais",
            businessId: business.id,
        },
    })

    // Service
    const service = await prisma.service.create({
        data: {
            name: "Corte de Cabelo",
            description: "Corte masculino",
            serviceGroup: { connect: { id: serviceGroup.id } },
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

    // Adicionar 5 novos businesses com imagens de teste
    const businessesData = [
        {
            name: "Barbearia Elite",
            image: "https://example.com/barbearia-elite.jpg",
            city: "Rio de Janeiro",
            state: "RJ",
            lat: -22.9068,
            lng: -43.1729,
        },
        {
            name: "Salão Glamour",
            image: "https://example.com/salao-glamour.jpg",
            city: "Belo Horizonte",
            state: "MG",
            lat: -19.9191,
            lng: -43.9386,
        },
        {
            name: "Estética Bella",
            image: "https://example.com/estetica-bella.jpg",
            city: "Porto Alegre",
            state: "RS",
            lat: -30.0346,
            lng: -51.2177,
        },
        {
            name: "Cabelos & Cia",
            image: "https://example.com/cabelos-cia.jpg",
            city: "Salvador",
            state: "BA",
            lat: -12.9714,
            lng: -38.5014,
        },
        {
            name: "Beleza Total",
            image: "https://example.com/beleza-total.jpg",
            city: "Brasília",
            state: "DF",
            lat: -15.7942,
            lng: -47.8822,
        },
    ]

    for (let i = 0; i < businessesData.length; i++) {
        const bizData = businessesData[i]

        // Criar user para manager
        const managerUser = await prisma.user.create({
            data: {
                email: `${bizData.name.toLowerCase().replace(/\s+/g, "")}@example.com`,
                name: `Manager ${bizData.name}`,
                password: "hashedpassword",
                role: Role.WORKER,
            },
        })

        // Criar business
        const newBusiness = await prisma.business.create({
            data: {
                name: bizData.name,
                image: bizData.image,
            },
        })

        // Criar worker
        const newWorker = await prisma.worker.create({
            data: {
                userId: managerUser.id,
                businessId: newBusiness.id,
                employeeId: `EMP${Math.floor(Math.random() * 1000)}`,
                hireDate: new Date("2023-01-01"),
            },
        })

        // Atualizar business com manager
        await prisma.business.update({
            where: { id: newBusiness.id },
            data: { managerId: managerUser.id },
        })

        // Criar address
        await prisma.address.create({
            data: {
                businessId: newBusiness.id,
                streetNumber: "456",
                street: "Rua Secundária",
                city: bizData.city,
                state: bizData.state,
                zipCode: "01234-568",
                country: "Brasil",
                latitude: bizData.lat,
                longitude: bizData.lng,
            },
        })

        // Criar serviceGroup
        const newServiceGroup = await prisma.serviceGroup.create({
            data: {
                name: "Serviços Gerais",
                businessId: newBusiness.id,
            },
        })

        // Criar service
        const newService = await prisma.service.create({
            data: {
                name: "Corte Básico",
                description: "Corte simples",
                serviceGroup: { connect: { id: newServiceGroup.id } },
            },
        })

        // Criar appointment de exemplo

        const appointmentDate = new Date("2026-01-10T11:00:00Z")
        appointmentDate.setDate(appointmentDate.getDate() + i) // Adiciona i dias para variar

        await prisma.appointment.create({
            data: {
                date: appointmentDate,
                userId: user.id,
                businessId: newBusiness.id,
                workerId: managerUser.id,
                services: {
                    connect: { id: newService.id },
                },
            },
        })
    }

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
