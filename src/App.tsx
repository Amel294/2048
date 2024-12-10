import Board from "./components/board/Board"
import Nav from "./components/Nav/Nav"

const App = () => {
  return (
    <div>
      <Nav/>
    <div className="bg-black min-h-screen p-0 m-0 flex items-center justify-center">
      <div className="flex flex-col items-center ">
      <Board />
      </div>
    </div>
    </div>
  )
}

export default App
