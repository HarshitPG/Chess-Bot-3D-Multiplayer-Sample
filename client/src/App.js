import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ColorContext } from "./context/colorMultiplayer/colorContext";
import Onboard from "./components/onboard/onboard";
import JoinGame from "./components/joinGame/joinGame";
import JoinRoom from "./components/joinroom/joinroom";
import Home from "./pages/home/home";
import ChessBot from "./pages/chessBot/chessBot";
import MultiplayerChessComponent from "./components/multiplayerChessBoard/multiplayerChess";
import Scene from "./pages/3dChess/experience";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  const [didRedirect, setDidRedirect] = React.useState(false);

  const playerDidRedirect = React.useCallback(() => {
    setDidRedirect(true);
  }, []);

  const playerDidNotRedirect = React.useCallback(() => {
    setDidRedirect(false);
  }, []);

  const [userName, setUserName] = React.useState("");
  console.log(didRedirect);

  return (
    <Provider store={store}>
      <ColorContext.Provider
        value={{
          didRedirect: didRedirect,
          playerDidRedirect: playerDidRedirect,
          playerDidNotRedirect: playerDidNotRedirect,
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/PlayWithAI" element={<ChessBot />} />
            <Route path="/3d" element={<Scene />} />
            <Route
              path="/MultiPlayer"
              element={<Onboard setUserName={setUserName} />}
            />
            <Route
              path="/game/:gameid"
              element={
                didRedirect ? (
                  <>
                    <JoinGame userName={userName} isCreator={true} />
                    <MultiplayerChessComponent userName={userName} />
                  </>
                ) : (
                  <JoinRoom />
                )
              }
            />
          </Routes>
        </Router>
      </ColorContext.Provider>
    </Provider>
  );
}

export default App;
