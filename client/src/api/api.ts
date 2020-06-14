export default <T>(query: string): Promise<T> => {
    return fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({query})
    }).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText)
        }

        return response.json()
    })
}