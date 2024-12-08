// Task 4
import React, { useState } from 'react';
import CharacterList from './CharacterList';
import CharacterDetail from './CharacterDetail';

const App = () => {
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);

  return (
    <div>
      <h1>Marvel Characters</h1>
      <CharacterList setSelectedCharacterId={setSelectedCharacterId} />
      {selectedCharacterId && <CharacterDetail characterId={selectedCharacterId} />}
    </div>
  );
};

export default App;