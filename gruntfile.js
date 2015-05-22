var modRewrite = require('connect-modrewrite');
var mountFolder = function (connect, dir) {
    console.log(connect.static(require('path').resolve(dir)));
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            options: {
                port: 8655,
                hostname: 'localhost',
            },
            server: {
                options: {
                    middleware: function (connect) {
                        return [
                            modRewrite(['!\\.html|\\.js|\\.svg|\\.css|\\.png|\\.jpg$ /index.html [L]']),
                            mountFolder(connect, 'app')
                        ];
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('server', ['connect:server']);

};