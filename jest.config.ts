module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'], // Ajuste de acordo com a estrutura do seu projeto
    testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'], // Procura por arquivos .ts de teste
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
  };
  