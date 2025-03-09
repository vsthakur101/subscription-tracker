import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxLength: [50, "Name can not exceed 32 characters"],
        minLength: [3, "Name must be at least 3 characters"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [1, "Price can not be less than 1"]
    },
    currency: {
        type: String,
        enum: ["USD", "EUR", "GBP"],
        default: "USD"
    },
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"]
    },
    category: {
        type: String,
        enum: ["sports", "news", "entertainment", "lifestyle", "technology", "finance", "politics", "other"],
        required: [true, "Category is required"]
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["active", "canceled", "expired"],
        default: "active"
    },
    startDate: {
        type: Date,
        required: [true, "Start date is required"],
        validate: {
            validator: function (v) {
                return v <= new Date();
            },
            message: "Start date must be a past date"
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (v) {
                return v > this.startDate;
            },
            message: "Renewal date must be a future date"
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    }
}, { timestamps: true });

subscriptionSchema.pre("save", function (next) {
    if (!this.renewalDate) {
        const renewalPeriod = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };
        const startDate = new Date(this.startDate);
        const frequency = this.frequency || "monthly";
        const renewalDays = renewalPeriod[frequency];
        const renewalDate = new Date(startDate.setDate(startDate.getDate() + renewalDays));
        this.renewalDate = renewalDate;
    }

    //Auto update the status if renewal date is in the passed
    if(this.renewalDate < new Date()) {
        this.status = "expired";
    }
    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
// The above code defines a subscription schema with name, price, currency, frequency, category, paymentMethod, status, startDate, renewalDate, and user fields. The name, price, category, paymentMethod, startDate, renewalDate, and user fields are required. The price field must be greater than or equal to 1. The currency field must be one of USD, EUR, or GBP. The frequency field must be one of daily, weekly, monthly, or yearly. The category field must be one of sports, news, entertainment, lifestyle, technology, finance, politics, or other. The paymentMethod field must be a string. The status field must be one of active, canceled, or expired. The startDate field must be a past date, and the renewalDate field must be a future date. The user field is a reference to the User model and is required.