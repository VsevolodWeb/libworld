export default {
  serverUrl: 'http://localhost:5000',
  getBookImageFolderURL() {
    return this.serverUrl + '/books-images/'
  }
}