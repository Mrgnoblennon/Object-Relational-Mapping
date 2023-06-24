const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [Product], // Include the associated Products
  })
    .then((tags) => {
      // Respond with the fetched tags
      res.json(tags);
    })
    .catch((err) => {
      // Handle any errors
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: { id: req.params.id },
    include: [Product], // Include the associated Products
  })
    .then((tag) => {
      if (!tag) {
        // If no tag is found with the given id, return a 404 status
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      // If a tag is found, return it as a JSON response
      res.status(200).json(tag);
    })
    .catch((err) => {
      // If an error occurs, return a 500 status and the error message
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => {
      res.status(201).json(tag); // Return the created tag as a JSON response
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedTag) => {
      if (updatedTag[0] === 0) {
        // If no tag is found with the given id, return a 404 status
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      // If the tag is updated successfully, return a success message
      res.status(200).json({ message: 'Tag updated successfully' });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a tag by its `id` value and its associated product tags
  Tag.findByPk(req.params.id)
    .then((tag) => {
      if (!tag) {
        // If no tag is found with the given id, return a 404 status
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      // Delete the associated product tags first
      return ProductTag.destroy({
        where: {
          tag_id: req.params.id,
        },
      })
        .then(() => {
          // Once the associated product tags are deleted, delete the tag itself
          return tag.destroy();
        })
        .then(() => {
          // If the tag and associated product tags are deleted successfully, return a success message
          res.status(200).json({ message: 'Tag deleted successfully' });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router
