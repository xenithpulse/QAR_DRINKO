import mongoose , {Schema} from "mongoose"


const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Product title required"],
    },
    features: {
      type: String,
      required: [true, "Product Features required"],
    },
    overview: {
      type: String,
    },
    specs: {
      type: String,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    featured  :{
      type : Boolean,
      default:false
    }
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default  Product;
