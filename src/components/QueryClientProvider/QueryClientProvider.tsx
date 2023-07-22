import { QueryClient, QueryClientProvider as Provider } from 'react-query'

function QueryClientProvider(props : any) {
    const queryClient = new QueryClient() 

  return <Provider client={queryClient}>{props.children}</Provider>
}

export default QueryClientProvider