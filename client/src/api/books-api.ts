import api, {ApiType} from './api'
import {BookType} from '../store/books-reducer'

export const booksAPI = {
    createBook(book: BookType) {
        const query = `
            mutation {
              createBook(book: {name: "${book.name}", description: "${book.description}", author: "${book.author}", categoryId: "${book.categoryId}", year: "${book.year}"}) {
                _id
                name
                description
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
              readBook(id: "${_id}") {
                _id
                name
                description
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
                updateCategory(category: {_id: "${book._id}", name: "${book.name}", description: "${book.description}", author: "${book.author}", year: "${book.year}", categoryId: "${book.categoryId}"}) {
                    _id
                    name
                    description
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
    deleteBook(id: string) {
        const query = `
            mutation {
                deleteBook(id: "${id}")
            }
        `
        return api<ApiType<'deleteCategory', string>>(query)
    }
}