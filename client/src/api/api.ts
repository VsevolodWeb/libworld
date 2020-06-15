export type ApiType<N extends string, T> = {
    data: {
        [K in N]: T
    }
}

export default async <ApiType>(query: string): Promise<ApiType> => {
    const response = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({query})
    })
    if (!response.ok) {
        throw new Error(response.statusText)
    }

    // todo: вынести then в общий api вызов
    return await response.json()
}