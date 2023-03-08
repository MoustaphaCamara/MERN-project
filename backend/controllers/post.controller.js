const PostModel = require("../models/post.model");

module.exports.getPosts = async (req, res) => {
  const posts = await PostModel.find();
  res.status(200).json(posts);
};

module.exports.setPosts = async (req, res) => {
  if (!req.body.message) {
    res.status(400).json({ message: "Merci d'ajouter un message.." });
  }
  const post = await PostModel.create({
    message: req.body.message,
    author: req.body.author,
  });
  res.status(200).json(post);
};

module.exports.editPost = async (req, res) => {
  const post = await PostModel.findById(req.params.id);
  if (!post) {
    res
      .status(400)
      .json({ message: "Le post n'existe pas dans la base de données." });
  }
  const updatePost = await PostModel.findByIdAndUpdate(post, req.body, {
    new: true,
  });
  res.status(200).json(updatePost);
};

module.exports.deletePost = async (req, res) => {
  const post = await PostModel.findById(req.params.id);
  if (!post) {
    res
      .status(400)
      .json({ message: "Ce message n'existe pas dans la base de données" });
  }
  await PostModel.findByIdAndRemove(post);
  res.status(200).json({
    "message supprimé": post,
  });
};

module.exports.likePost = async (req, res) => {
  const post = await PostModel.findById(req.params.id);
  if (!post) {
    res
      .status(400)
      .json({ message: "Ce message n'existe pas dans la base de données" });
  }
  try {
    await PostModel.findByIdAndUpdate(
      post,
      {
        $addToSet: {
          likers: req.body.userId,
        },
      },
      { new: true }
    ).then((data) =>
      res.status(200).json({ "likers actualisés:": data.likers })
    );
    // ).then((data) => res.status(200).send(data));
    // res.status(200).send(post)
    // pour avoir le nouveau liker directement, then(). sinon il s'affichera qu'à la requête d'après..
    // res.status(200).json({
    //   "message liké : ": post,
    //   "Liké par : ": req.body.userId,
    // });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.dislikePost = async (req, res) => {
  const post = await PostModel.findById(req.params.id);
  if (!post) {
    res
      .status(400)
      .json({ message: "Ce message n'existe pas dans la base de données" });
  }
  try {
    await PostModel.findByIdAndUpdate(
      post,
      {
        $pull: {
          likers: req.body.userId,
        },
      },
      { new: true }
    ).then((data) =>
      res.status(200).json({ "likers actualisés:": data.likers })
    );
  } catch (err) {
    res.status(400).json(err);
  }
};
