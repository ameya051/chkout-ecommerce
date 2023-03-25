import db from "../../../../utils/db.js";
import Product from "../../../../models/Product";
import { getSession } from "next-auth/react/index.js";

const handler = async (req, res) => {
  if (req.method === "GET") {
    db.connect();
    const product = await Product.findById(req.query.id);
    db.disconnect();
    if (product) {
      res.send(product.reviews);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } else if (req.method === "POST") {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).send({ message: "signin required" });
    }

    await db.connect();
    const product = await Product.findById(req.query.id);
    if (product) {
      const existReview = product.reviews.find(
        (x) => x.user == session.user._id
      );
      if (existReview) {
        await Product.updateOne(
          { _id: req.query.id, "reviews._id": existReview._id },
          {
            $set: {
              "reviews.$.comment": req.body.comment,
              "reviews.$.rating": Number(req.body.rating),
            },
          }
        );

        const updatedProduct = await Product.findById(req.query.id);
        updatedProduct.numReviews = updatedProduct.reviews.length;
        updatedProduct.rating =
          updatedProduct.reviews.reduce((a, c) => c.rating + a, 0) /
          updatedProduct.reviews.length;
        await updatedProduct.save();

        await db.disconnect();
        return res.send({ message: "Review updated" });
      } else {
        const review = {
          user: mongoose.Types.ObjectId(req.user._id),
          name: req.user.name,
          rating: Number(req.body.rating),
          comment: req.body.comment,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
          product.reviews.reduce((a, c) => c.rating + a, 0) /
          product.reviews.length;
        await product.save();
        await db.disconnect();
        res.status(201).send({
          message: "Review submitted",
        });
      }
    } else {
      await db.disconnect();
      res.status(404).send({ message: "Product Not Found" });
    }
  } else {
    res
      .status(400)
      .send({ message: "Invalid req method. Use GET/POST method only" });
  }
};

export default handler;
