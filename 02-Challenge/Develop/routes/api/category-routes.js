const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product], // Include the associated Products
  })
    .then((categories) => {
      // Respond with the fetched categories
      res.json(categories);
    })
    .catch((err) => {
      // Handle any errors
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: { id: req.params.id },
    include: [Product], // Include the associated Products
  })
    .then((category) => {
      if (!category) {
        // If no category is found with the given id, return a 404 status
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      // If a category is found, return it as a JSON response
      res.status(200).json(category);
    })
    .catch((err) => {
      // If an error occurs, return a 500 status and the error message
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((category) => {
      res.status(201).json(category); // Return the created category as a JSON response
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedCategory) => {
      if (updatedCategory[0] === 0) {
        // If no category is found with the given id, return a 404 status
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      // If the category is updated successfully, return a success message
      res.status(200).json({ message: 'Category updated successfully' });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => {
      if (!deletedCategory) {
        // If no category is found with the given id, return a 404 status
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      // If the category is deleted successfully, return a success message
      res.status(200).json({ message: 'Category deleted successfully' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
