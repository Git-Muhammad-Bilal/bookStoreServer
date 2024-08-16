const { default: axios } = require("axios")


let books = []
exports.getBooks = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const subject = req.query.subject || 'fiction'
  try {

  } catch (error) {
    console.log(error.message);
    res.send(error.message)

  }
  let { data } = await axios.get(`https://openlibrary.org/subjects/${subject}.json?limit=${Number(page) * 8}&page=${page}`)
  
  res.send(data)
}

exports.getBook = async (req, res) => {
  let bookId =  req.params.bookId;
  try {
    const { data } =await axios.get(`https://openlibrary.org/authors/${bookId}.json`)
    const { data: book } =await axios.get(`https://openlibrary.org/${data?.authors[0]?.author?.key}.json`)
      
    if (data && book) {
      const { authors, covers, works, description, title, created, subjects } = data
      let newBk = {
        author: book?.name,
        img: covers && covers[0],
        description: description?.value,
        title,
        published: created?.value,
        subjects: subjects?.length ? subjects.slice(0, 10) : 'No subjects',
        title,
        bookId

      }
      res.send(newBk)

    }

  } catch (error) {
    console.log(error.message);
    res.send(error.message)
  }
}
exports.serchBooks = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const title = req.query.title;

  try {

    let { data } = await axios.get(`https://openlibrary.org/search.json?title=${title}&page=${page}&limit=${8}`)
    res.send(data)

  } catch (error) {
    console.log(error.message);
    res.send(error.message)

  }
}

