export interface ITermsUserPersistence {
    ip: string
    acceptedAt: Date
    userAgent: {
        name: string
        version: string
        os: string
        type: string
    }
}

export interface IUserPersistenceContract {
    email: string
    password: string
    budgetBoxIds?: string[]
    totalBalanceAvailable?: number
    terms: ITermsUserPersistence[]
}
