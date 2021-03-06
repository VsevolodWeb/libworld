import api, {ApiType} from './api'
import {BookType} from '../store/books-reducer'
import {Override} from '../store/store'

export const booksAPI = {
    createBook(book: Override<BookType, { text: FormData }>) {
        const query = `
            mutation {
              createBook(book: {name: "${book.name}",
                                description: "${book.description}",
                                cover: "${book.cover}",
                                author: "${book.author}",
                                categoryId: "${book.categoryId}",
                                year: ${book.year},
                                text: ${book.text}}) {
                _id
                name
                description
                cover
                author
                year
                category {
                  _id name
                }
              }
            }
        `
        return api<ApiType<'createBook', BookType>>(query)
    },
    readBooks() {
        const query = `
            query {
              readBooks {
                _id
                name
                description
                cover
                author
                year
                category {
                  _id name
                }
              }
            }
        `
        return api<ApiType<'readBooks', BookType[]>>(query)
    },
    readBook(_id: string) {
        const query = `
            query {
              readBook(_id: "${_id}") {
                _id
                name
                description
                cover
                author
                year
                category {
                  _id name
                }
              }
            }
        `
        return api<ApiType<'readBook', BookType>>(query)
    },
    updateBook(book: BookType) {
        const query = `
            mutation {
                updateBook(book: {_id: "${book._id}", name: "${book.name}", description: "${book.description}", cover: "${book.cover}", author: "${book.author}", year: ${book.year}, categoryId: "${book.categoryId}"}) {
                    _id
                    name
                    description
                    cover
                    author
                    year
                    category {
                      _id
                    }
                }
            }
        `
        return api<ApiType<"updateBook", BookType>>(query)
    },
    deleteBook(_id: string) {
        const query = `
            mutation {
                deleteBook(_id: "${_id}")
            }
        `
        return api<ApiType<'deleteBook', string>>(query)
    }
}