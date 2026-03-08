TESTS
[Dependencias]
1- instalar dependencias (aunque react tiene incorporado jest y testing)
### npm install --save-dev jest @testing-library/react @testing-library/jest-dom react-test-renderer
2- intalar babel (opcional)
### npm install --save-dev jest babel-jest @babel/preset-env @babel/preset-react react-test-renderer

3- Crear archivo jest.config.js en /src y exportar los siguientes modulos:

module.exports = {
    roots: ["<rootDir>/src"],
    testMatch: [
      "**/__tests__/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)",
    ],
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest",
    },
  };

4- Verificar que en setupTests.js esten importados jest-dom y jest-dom/extend-expect

import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect"

### CORRER TESTS ###
 si queremos correr todos los tests simplementes por terminal pasamos el comando:
 
 `npm test`

 si queremos correr solo un test pasamos el comando:

 `npm "nombretest.test.js"`
 ejemplo

 `npm Footer.test.js`
