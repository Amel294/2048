import Board from "./components/board/Board"
import Nav from "./components/Nav/Nav"

const App = () => {
  return (
    <div className="bg-black max-h-screen overflow-hidden p-0 m-0">
      <Nav />
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <Board />
        </div>
      </div>
    </div>
  )
}

export default App
