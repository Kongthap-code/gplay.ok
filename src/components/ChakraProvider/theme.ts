import { extendTheme } from "@chakra-ui/react";
import fonts from "./foundations/fonts";
import semanticTokens from "./foundations/semanticTokens";

const theme = extendTheme({
  semanticTokens,
  fonts,
});

export default theme;