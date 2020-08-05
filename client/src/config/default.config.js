class clientConfig {
  constructor() {
    this.serverUrl = 'http://localhost:5000'
    this.booksImageFolderURL = this.serverUrl + '/books-images/'
  }
}

export default new clientConfig()