const router = require('express').Router()
const People = require('./people-model')

router.get('/', async (req, res, next) => {
  try {
    const data = await People.getAll()
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.get('/:id' , async (req, res, next) => {
  try {
    const data = await People.getById(req.params.id)
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const data = await People.insert(req.body)
    res.status(201).json(data)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const data = await People.remove(req.params.id)
    res.json(data)
  } catch (error) {
    next(error)
  }
})

module.exports = router;