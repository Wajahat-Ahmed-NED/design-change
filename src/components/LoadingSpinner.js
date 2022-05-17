import { Bars } from  'react-loader-spinner'
import { COLORS } from '../utils/CONSTANTS'

export default function LoadingSpinner({ style }) {


  return (
    <Bars 
        height="30"
        width="30"
        color='#bbb'
        ariaLabel='loading'
        wrapperStyle={{ 
            display: 'flex',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            ...style 
        }}
    />
  )
}
