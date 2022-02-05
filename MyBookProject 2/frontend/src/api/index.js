import axios from 'axios'

const api=axios.create({
    baseURL:'http://localhost:4444',
})


// export const getDetails = () =>api.get('/users')

export const adduser = payload => api.post('/adduser',payload)

export const getUserbyEmail = email => api.get(`/user/${email}`)

export const addBook=payload=>api.post('/addbook',payload)

export const getBooks = () => api.get('/books')

export const updateBook = (id,payload) => api.put(`/updatebook/${id}`,payload)

export const deleteBook = id => api.delete(`/deletebook/${id}`)

export const updateBookLike = (id,payload) => api.put(`/updatelike/${id}`,payload)

export const addRequest = (payload) => api.post('/addrequest',payload)

export const getIssueRequest = () => api.get('/issuerequest')

export const statusUpdate = (id,email,payload) => api.put(`/statusupdate/${id}/${email}`,payload)

export const deleteRequest = (id,email) => api.delete(`/deleterequest/${id}/${email}`)

export const updateBookQuantity = id => api.put(`/updatebookquantity/${id}`)


const apis={
    // getDetails,
    adduser,
    getUserbyEmail,
    addBook,
    getBooks,
    updateBook,
    deleteBook,
    updateBookLike,
    addRequest,
    getIssueRequest,
    statusUpdate,
    deleteRequest,
    updateBookQuantity
}

export default apis
