import mongoose, { Document, Schema } from "mongoose";
import mongooseLong from "mongoose-long";
import { ReferralStatus } from "../lib/utils/enums";

// Register mongoose-long plugin
mongooseLong(mongoose);

// Define ReferralDocument interface
export type ReferralDocument = Document & {
  referredBy: number;
  invitedUserId: number;
  status?: ReferralStatus;
};

// Create ReferralSchema
const ReferralSchema = new Schema<ReferralDocument>(
  {
    referredBy: { type: Number, ref: "User", index: true },
    invitedUserId: { type: Number, ref: "User", index: true },
    status: { type: String, enum: ReferralStatus, default: "pending" },
  },
  {
    timestamps: true,
    collection: "referrals",
  }
);

// Create ReferralModel
export const ReferralModel = mongoose.model<ReferralDocument>(
  "Referral",
  ReferralSchema
);
