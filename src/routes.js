const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
} = require('./handler');

const routes = [

  // TODO: Implementasikan route API dapat menyimpan buku
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },

  // TODO: Implement get all books handler API dapat menampilkan seluruh buku
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },

  // TODO: Implement get book by id handler API dapat menampilkan detail buku
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookByIdHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },

  // TODO: Implement edit book by id handler API dapat mengubah data buku
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBookByIdHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },

  // TODO: Implement delete book by id handler API dapat menghapus buku
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookByIdHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },

];

// Export routes agar dapat digunakan di server.js
module.exports = routes;