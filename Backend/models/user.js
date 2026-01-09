import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      validate: {
            validator: (nameValue) => {
                return /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(nameValue) &&
                    nameValue.length >= 3 &&
                    nameValue.length <= 12;
            },
            message: "Name must be 3–12 letters and contain only alphabets"
        }
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, 
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
