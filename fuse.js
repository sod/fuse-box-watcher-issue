const {FuseBox, QuantumPlugin, WebIndexPlugin, Sparky, SassPlugin, CSSPlugin, CSSResourcePlugin, VueComponentPlugin} = require('fuse-box');

let isProduction = false;

Sparky.context(() => ({
    create() {
        const fuse = FuseBox.init({
            hash: isProduction,
            automaticAlias: true,
            useTypescriptCompiler: true,
            homeDir: 'src',
            output: 'dist/$name.js',
            target: 'browser@es6',
            alias: {
                vue: 'vue/dist/vue.min',
            },
            plugins: [
                VueComponentPlugin({
                    style: [
                        SassPlugin({
                            importer: true
                        }),
                        CSSResourcePlugin(),
                        CSSPlugin(),
                    ],
                }),
                CSSPlugin(),
                WebIndexPlugin({
                    template: 'src/index.html',
                    appendBundles: true,
                }),
                isProduction && QuantumPlugin({
                    bakeApiIntoBundle: 'app',
                    uglify: true,
                    css: true,
                }),
            ]
        });

        const app = fuse.bundle('app')
            .instructions('>main.ts');

        const run = () => fuse.run();

        if (!isProduction) {
            fuse.dev({
                open: true,
            });

            app.watch();
        }

        return {fuse, app, run};
    }
}));

Sparky.task('set-production', () => {
    isProduction = true;
});

Sparky.task('clean', () => Sparky.src('./dist').clean('dist/'));

const run = (context) => context.create().run();
const tasks = ['clean'];

Sparky.task('default', [...tasks], run);
Sparky.task('production', ['set-production', ...tasks], run);
