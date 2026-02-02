"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const plan = await prisma.plan.create({
        data: {
            name: 'Basic',
            slug: 'basic',
            requestsPerMonth: 100,
            softLimitPercent: 80,
            priceMonthly: 10,
        },
    });
    console.log('Created plan:', plan);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map