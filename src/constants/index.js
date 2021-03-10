import { Dimensions } from "react-native";

export const height = Dimensions.get("screen").height;
export const width = Dimensions.get("screen").width;

export const ONBOARDING = [
  {
    ASSET: require("../../assets/PassMain.png")
  },
  {
    ASSET: require("../../assets/three-month-pass.jpg")
  },
  {
    ASSET: require("../../assets/six-month-pass.jpg")
  },
  {
    ASSET: require("../../assets/twelve-month-pass.jpg")
  },
  {
    ASSET: require("../../assets/pass-benifit.jpg")
  }
];