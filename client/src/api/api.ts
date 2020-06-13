export default <T>(query: string): Promise<T> => {
    console.log(query)
    return fetch('/graphql', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({query})
    }).then(response => {
        console.log(response)
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        return response.json()
    })
}