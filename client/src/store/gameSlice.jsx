import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chess } from "chess.js";
import axios from "axios";
import $ from "jquery";
import { useDispatch } from "react-redux";

export let chess = new Chess();

const initialState = {
  board: [
    ["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"],
    ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"],
    ["a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6"],
    ["a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5"],
    ["a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4"],
    ["a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3"],
    ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"],
    ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"],
  ],
  figures: chess.board(),
  selectedCell: null,
  availableMoves: [],
  aiAvailableMoves: [],
  whoseMove: "w",
  history: chess.history({ verbose: true }),
  gameType: "AI",
  isCheck: chess.isCheck(),
  isMate: chess.isGameOver(),
  isAiMove: false,
};

export const gameSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    moveFigure: (state, action) => {
      if (state.selectedCell && state.gameType === "AI") {
        chess.move({
          from: state.selectedCell,
          to: action.payload.target,
          promotion: "q",
        });
        state.selectedCell = null;
        state.availableMoves = [];
        state.history = chess.history({ verbose: true });
        state.whoseMove = "b";

        state.isCheck = chess.isCheck();
        state.isMate = chess.isGameOver();
        // state.figures = chess.board();
        console.log("state.figures = ", chess.board());
      }
      if (state.whoseMove === "b" && state.gameType === "AI") {
        $.post(
          "http://127.0.0.1:5000/make_move",
          { fen: chess.fen() },
          function (data) {
            console.log(data.fen);
            chess.move(data.best_move, { sloppy: true });
          }
        );

        state.selectedCell = null;
        state.availableMoves = [];
        state.history = chess.history({ verbose: true });
        state.whoseMove = "w";

        state.isCheck = chess.isCheck();
        state.isMate = chess.isGameOver();
        // state.figures = chess.board();
        console.log("state.figures Black= ", chess.board());
      }
      state.figures = chess.board();
      if (state.selectedCell && state.gameType === "singlePlayer") {
        chess.move({
          from: state.selectedCell,
          to: action.payload.target,
          promotion: "q",
        });
        state.selectedCell = null;
        state.availableMoves = [];
        state.history = chess.history({ verbose: true });
        state.whoseMove === "w"
          ? (state.whoseMove = "b")
          : (state.whoseMove = "w");
        state.isCheck = chess.isCheck();
        state.isMate = chess.isGameOver();
        state.figures = chess.board();
      }
      state.figures = chess.board();
    },

    setSelectCell: (state, action) => {
      state.isCheck = chess.isCheck();
      state.isMate = chess.isGameOver();
      const colorOfSelectedFigure = chess.get(action.payload)?.color;
      console.log("state.figures onSelectCell= ", chess.board());
      if (colorOfSelectedFigure === state.whoseMove) {
        state.selectedCell = action.payload;
        state.figures = chess.board();
        state.availableMoves = chess.moves({
          square: action.payload,
          verbose: true,
          legal: true,
        });
      }
    },
    setGameType: (state, action) => {
      state.gameType = action.payload;
      chess = new Chess();
      state.figures = chess.board();
      state.selectedCell = null;
      state.history = [];
      state.whoseMove = "w";
    },
    setSceneBackground: (state, action) => {
      state.sceneBackground = action.payload;
    },
    newGame: (state) => {
      chess = new Chess();
      state.figures = chess.board();
      state.selectedCell = null;
      state.history = [];
      state.whoseMove = "w";
    },
    postMoveAction: (state) => {
      console.log("postMoveAction called");
      state.isCheck = chess.isCheck();
      state.isMate = chess.isGameOver();
      state.figures = chess.board();
    },
  },
});

export const {
  setSelectCell,
  moveFigure,
  postMoveAction,
  aiMoveFigure,
  setGameType,
  setSceneBackground,
  newGame,
} = gameSlice.actions;
