import axios from 'axios';

const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const add = newNote => {
    const request = axios.post(baseUrl, newNote)
    return request.then(response => response.data)
}

const update = (id, updatedNote) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedNote)
    return request.then(response => response.data)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const getImportant = data => {
    let newData = [];
    data.map(d => {
      if (d.important === true) {
          newData.push(d);
      }
    });
    return newData;
}

export default {
    getAll: getAll,
    add: add,
    update: update,
    remove: remove,
    getImportant: getImportant
}
