import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TodoListPage from "./pages/TodoListPage";

function App(props) {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<TodoListPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;