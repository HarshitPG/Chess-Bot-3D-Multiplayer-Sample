import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { gameSlice } from "./gameSlice";

export const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
  },
});

export const useAppDispatch = () => useDispatch();

export const useAppSelector = useSelector;
