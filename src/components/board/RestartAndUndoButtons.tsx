import { Button } from "@nextui-org/react"
import useGameStore from "../../store/useGameStore"

function RestartAndUndoButtons() {
    const {regenerateBoard,undo} = useGameStore()
  return (
    <div className="flex gap-4">
        <Button color='danger'
            onPress={regenerateBoard}
          >
            Restart
          </Button>
          <Button color='warning'
            onPress={undo}
          >
            <span>⏪</span> Undo
          </Button>
    </div>
  )
}
export default RestartAndUndoButtons