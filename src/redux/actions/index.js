import axios from 'axios';
import {
  SET_STYLE
} from './types';
import { systemWeights, robotoWeights, sanFranciscoWeights } from 'react-native-typography'

export const iosStyleLoad = () => dispatch => {
  const style = [{
    TextFontFamilyBoldPrimary: sanFranciscoWeights.bold.fontFamily, 
    TextFontWeightBoldPrimary: sanFranciscoWeights.bold.fontWeight,
    TextFontFamilyRegularPrimary: sanFranciscoWeights.regular.fontFamily, 
    TextFontWeightRegularPrimary: sanFranciscoWeights.regular.fontWeight,
    TextFontColorPrimary: "#21ce99",
    TextFontColorSecondary: "#21ce99",
    TextFontSizePrimary:14,
    TextFontColorPrimary: "#21ce99",
    BorderColorPrimary: "#21ce99",
    BorderColorSecondary: "#21ce99",
    BorderWidthPrimary:2,
    ButtonBackgroundColorPrimary:"#21ce99",
    ButtonBackgroundColorSecondary:"transparent",
    ButtonTextColorPrimary:"#0e0d0d",
    ButtonTextColorSecondary:"#21ce99",
    ButtonTextSizePrimary:14,
    ButtonTextSizeSecondary:14,
    ButtonBorderRadiusPrimary: 25,
    ButtonBorderWidthPrimary:1,
    ViewBackgroundColorPrimary:"#0e0d0d",
    LogoIconSize:30    
  }]
  dispatch({ type: SET_STYLE, payload: style })
}

export const androidStyleLoad = () => dispatch => {
  const style = [{
    TextFontFamilyBoldPrimary: sanFranciscoWeights.bold.fontFamily, 
    TextFontWeightBoldPrimary: sanFranciscoWeights.bold.fontWeight,
    TextFontFamilyRegularPrimary: sanFranciscoWeights.regular.fontFamily, 
    TextFontWeightRegularPrimary: sanFranciscoWeights.regular.fontWeight,
    TextFontColorPrimary: "#21ce99",
    TextFontColorSecondary: "#21ce99",
    TextFontSizePrimary:14,
    TextFontColorPrimary: "#21ce99",
    BorderColorPrimary: "#21ce99",
    BorderColorSecondary: "#21ce99",
    BorderWidthPrimary:1,
    ButtonBackgroundColorPrimary:"#21ce99",
    ButtonBackgroundColorSecondary:"transparent",
    ButtonTextColorPrimary:"#0e0d0d",
    ButtonTextColorSecondary:"#21ce99",
    ButtonTextSizePrimary:15,
    ButtonTextSizeSecondary:14,
    ButtonBorderRadiusPrimary: 25,
    ButtonBorderWidthPrimary:1,
    ViewBackgroundColorPrimary:"#0e0d0d",
    LogoIconSize:30    
  }]
  dispatch({ type: SET_STYLE, payload: style })
}
