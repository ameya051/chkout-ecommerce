import Product from "../../../models/Product";
import db from "../../../utils/db";

const handler = async (req, res) => {
  await db.connect();
  const products = await Product.find().lean();
  await db.disconnect();
  res.status(200).send(products);
};

export default handler;
