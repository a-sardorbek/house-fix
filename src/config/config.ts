import { registerAs } from '@nestjs/config'

export interface DatabaseConfig {
    url?: string
}

export const databaseConfig = registerAs('database', (): DatabaseConfig => {
    return {
        url: process.env.DATABASE_URL ?? undefined
    }
})
