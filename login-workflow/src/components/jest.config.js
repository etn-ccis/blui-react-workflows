const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
    transform: {
        ...tsjPreset.transform,
        '^.+\\.svg$': './svgTransform.js',
    },
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.test.json',
        },
    },
    testEnvironment: 'jsdom',
};
