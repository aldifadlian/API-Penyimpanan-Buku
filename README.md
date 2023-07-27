# Bookshelf API
### Personal Project Aplikasi Back-end

# 👨‍💻Specifications
- API dapat menyimpan buku
- API dapat menampilkan seluruh buku
- API dapat menampilkan detail buku
- API dapat mengubah data buku
- API dapat menghapus buku
- Project menggunakan port 9000
- Project memiliki runner script dengan nama start
- Tambahkan fitur query parameters pada route GET /books (Mendapatkan seluruh buku).
-     ?name : Tampilkan seluruh buku yang mengandung nama berdasarkan nilai yang diberikan pada query ini secara non-case sensitive  (tidak peduli besar dan kecil huruf).
-     ?reading : Bernilai 0 atau 1. Bila 0, maka tampilkan buku yang sedang tidak dibaca (reading: false). Bila 1, maka tampilkan buku yang sedang dibaca (reading: true). Selain itu, tampilkan buku baik sedang dibaca atau tidak
-     ?finished : Bernilai 0 atau 1. Bila 0, maka tampilkan buku yang sudah belum selesai dibaca (finished: false). Bila 1, maka tampilkan buku yang sudah selesai dibaca (finished: true). Selain itu, tampilkan buku baik yang sudah selesai atau belum dibaca.

## Body Request
{
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
}

# 💻 How to Run This Program?
1. Clone repositori ini
2. Run with command "npm run start"
3. Try to add/read/update/delete the book from bookshelf API using POSTMAN
