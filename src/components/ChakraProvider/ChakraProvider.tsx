import { ChakraProvider as Provider } from '@chakra-ui/react'
import theme from './theme'

function ChakraProvider(props : any) {
  return <Provider theme={theme}>{props.children}</Provider>
}

export default ChakraProvider