import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import nodePolyfills from 'rollup-plugin-node-polyfills';

export default {
    input: "src/lips.js",
    output: {
        name: "lips",
        file: "dist/lips.js",
        format: "umd",
        globals: {
            "@babel/runtime/regenerator": "regeneratorRuntime"
        },
        manualChunks: () => 'everything.js'
    },
    onwarn: (warning, next) => {
        const str = warning.toString();
        if (/Use of eval is strongly discouraged/.test(str)) {
            return;
        }
        next(warning);
    },
    plugins: [
        babel({
            "babelrc": false,
            babelHelpers: 'runtime',
            "plugins": [
                "@babel/plugin-transform-async-to-generator",
                "@babel/plugin-transform-regenerator",
                ["@babel/plugin-transform-runtime", {
                    "helpers": true,
                    "regenerator": true
                }]
            ],
            "presets": [
                "@babel/preset-env"
            ],
            "exclude": "node_modules/**"
        }),
        nodePolyfills(),
        commonjs({
            include: "node_modules/**"
        }),
        nodeResolve({
            mainFields: ["jsnext:main"]
        })
    ]
};
