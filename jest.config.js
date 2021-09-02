module.exports  = {
  testPathIgnorePatterns:['/node_modules','/.next/'],
  setupFilesAfterEnv:[
    "<rootDir>/src/tests/setupTests.ts"
  ],

  //converte ts para js
  transform:{
    "^.+\\.(js|jsx|ts|tsx)$":"<rootDir>/node_modules/babel-jest"
  },

  //permite que o jest interprete arquivos outros tipos de arquivos
  moduleNameMapper: {
    "\\.(scss|css|sass)$":"identity-obj-proxy"

  },

  testEnvironment: 'jsdom',
  collectCoverage:true,

  collectCoverageFrom: [
    "src/**/*.tsx",
    "!src/**/*.test.tsx",
    "!src/**/*_app.tsx",
    "!src/**/*_document.tsx",
    
  ],
  coverageReporters:["lcov","json"]


}