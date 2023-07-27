const { nanoid } = require('nanoid');
const books = require('./books');

// TODO: Implementasikan route API dapat menyimpan buku
const addBookHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
    
  // Client tidak melampirkan properti name pada request body.
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  // Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount.
  else if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
    
  // Bila seluruh pengecekan telah dilewati, maka buku akan ditambahkan ke array books.
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = (pageCount === readPage);

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
    
  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  // Bila buku berhasil dimasukkan, maka server harus mengembalikan respons dengan:
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  // Bila buku gagal dimasukkan karena alasan umum (generic error), maka server harus mengembalikan respons dengan:
  else{
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
  }

};

// TODO: Implement get all books handler API dapat menampilkan seluruh buku
const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  let filteredBooks = books;

  // Parameter untuk case ?name -> Tampilkan seluruh buku yang mengandung nama berdasarkan nilai yang diberikan pada query
  if (name !== undefined) {
    filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }

  /* Parameter untuk case ?reading -> Bernilai 0 atau 1. 
  Bila 0, maka tampilkan buku yang sedang tidak dibaca (reading: false). 
  Bila 1, maka tampilkan buku yang sedang dibaca (reading: true). 
  */
  else if (reading !== undefined) {
    filteredBooks = filteredBooks.filter((book) => book.reading === !!Number(reading));
  }

  /* Parameter untuk case ?finished -> Bernilai 0 atau 1. 
  Bila 0, maka tampilkan buku yang sudah belum selesai dibaca (finished: false). 
  Bila 1, maka tampilkan buku yang sudah selesai dibaca (finished: true).
  */
  else if (finished !== undefined) {
    filteredBooks = filteredBooks.filter((book) => book.finished === !!Number(finished));
  } 

  // Bila seluruh pengecekan telah dilewati, maka server akan merespons dengan menampilkan semua buku
  const response = h.response({
    status: 'success',
    data: {
      books: filteredBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

// TODO: Implement get book by id handler API dapat menampilkan detail buku
const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const book = books.filter((n) => n.id === bookId)[0];
  // Bila id yang dilampirkan oleh client tidak ditemukan oleh server, maka server akan merespons dengan:
  if (book === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  }
  // Bila id yang dilampirkan oleh client ditemukan oleh server, maka server akan merespons dengan:
  else if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }
};

// TODO: Implement edit book by id handler API dapat mengubah data buku
const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === bookId);

  // Client tidak melampirkan properti name pada request body. Bila hal ini terjadi, maka server akan merespons dengan:
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  // Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount. Bila hal ini terjadi, maka server akan merespons dengan:
  else if (readPage > pageCount ) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  // Id yang dilampirkan oleh client tidak ditemukkan oleh server.
  else if (index === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  // Bila seluruh pengecekan telah dilewati, maka data buku akan diperbarui.
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
}

// TODO: Implement delete book by id handler API dapat menghapus buku
const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((book) => book.id === bookId);

  // Id yang dilampirkan oleh client tidak ditemukkan oleh server.
  if (index === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }
  // Bila seluruh pengecekan telah dilewati, maka buku akan dihapus.
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
}

// Export semua handler
module.exports = { 
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler, };