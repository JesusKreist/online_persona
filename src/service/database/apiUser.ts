import { getModelForClass, prop } from "@typegoose/typegoose";

class ApiUser {
  @prop({ required: true })
  public apiKey!: string;

  @prop({ required: true, default: false })
  public isBulkAllowed!: boolean;

  @prop({ required: true, unique: true })
  public emailAddress!: string;

  @prop({ required: true })
  public firstName!: string;

  @prop({ required: true })
  public lastName!: string;
}

export const ApiUserModel = getModelForClass(ApiUser);
