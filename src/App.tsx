import './App.css'
import SimpleChart from './components/SimpleChart/SimpleChart'

function App() {

  return (
    <>
      <div style={{width: "100%", height: "200px"}}>
        <SimpleChart title='test chart' data={[
          59, 
          65, 
          555, 
          674, 
          43,
          554, 
          426, 
          4984, 
          513, 
          584]} dataOffset={400} lineColor='#ffffff' />
      </div>
    </>
  )
}

export default App