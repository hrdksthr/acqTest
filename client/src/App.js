import React from 'react';
import UsersComponent from "./Modules/Users"
import './App.css';
import CombinedStore from "./Stores/combines.store"
function App() {
  return (
    <UsersComponent {...new CombinedStore()}/>
  );
}

export default App;
