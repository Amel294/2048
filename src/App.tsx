import Board from "./components/board/Board"
import Title from "./components/Title/Title"

const App = () => {
  return (
    <div className="bg-black min-h-screen p-0 m-0 flex items-center justify-center">
      <div className="flex flex-col items-center ">

      <Title />
      <Board />
      </div>
    </div>
  )
}

export default App
