const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// route for all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
})
// route for one category by id
router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id)
    .then((categoryData) => {
      res.json(categoryData);
    })
});

// route for new category
router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((newCategory) => {
      res.json(newCategory)
    })
    .catch((err => { res.json(err) }))
});

// route to update the category by id
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id,
      }
    }
  )
    .then((updatedCategory) => {
      res.json(updatedCategory)
    })
    .catch((err => {
      console.log(err);
      res.json(err);
    }))

});

// route to delete the category by id
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    }
  })
    .then((deletedCategory) => {
      res.json(deletedCategory)
    })
    .catch((err => res.json(err)))
});

module.exports = router;
