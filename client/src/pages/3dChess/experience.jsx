import { Canvas } from "@react-three/fiber";
import Board from "../../components/3dSceneComponents/board/board";
import { Environment, OrbitControls } from "@react-three/drei";
import {
  aiMoveFigure,
  moveFigure,
  postMoveAction,
  setSelectCell,
} from "../../store/gameSlice";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";

const Scene = () => {
  const dispatch = useAppDispatch();
  const { board, figures, selectedCell, availableMoves } = useAppSelector(
    (state) => state.game
  );

  const onCellSelect = useCallback(
    (cell) => {
      dispatch(setSelectCell(cell));
    },
    [dispatch]
  );

  const onFigureMove = useCallback(
    (target) => {
      dispatch(moveFigure({ target }));
    },
    [dispatch]
  );

  const onPostFigureMove = useCallback(() => {
    setTimeout(() => {
      dispatch(postMoveAction({}));
      console.log("Additional actions after a delay");
    }, 300);
  }, [dispatch]);

  return (
    <>
      <Canvas camera={{ fov: 45, position: [10, 5, 0] }}>
        <OrbitControls enablePan={false} minDistance={4} maxDistance={12} />
        <ambientLight />
        <pointLight position={[0, 0, 0]} intensity={20} />
        <Environment files="./hdr/086_hdrmaps_com_free_10K.exr" background />
        <Board
          board={board}
          figures={figures}
          selectedCell={selectedCell}
          onCellSelect={onCellSelect}
          availableMoves={availableMoves}
          onFigureMove={onFigureMove}
          onPostFigureMove={onPostFigureMove}
        />
      </Canvas>
    </>
  );
};

export default Scene;
