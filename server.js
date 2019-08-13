const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-body');
const AdmZip = require('adm-zip');
const path = require('path');
const fs = require('fs');

app.use(
    bodyParser({
        multipart: true,
        formLimit: '100mb',
        textLimit: '100mb',
        includeUnparsed: true,
        formidable: {
            uploadDir: __dirname + '/uploads',
            keepExtensions: true,
            maxFieldsSize: 100 * 1024 * 1024
            // onFileBegin: function (name, file) {
            //     console.log(name, file);
            // }
        }
    })
);
app.use(async ctx => {
    console.log(ctx.request.URL);
    // ctx.body = 'Hello World';
    if (ctx.request.method != 'POST') {
        return (ctx.body = 'hello!');
    }
    const { serverPath } = ctx.request.body;
    const file = ctx.request.files.file;

    if (fs.existsSync(path.resolve(serverPath || ''))) {
        const zip = new AdmZip(file.path);
        zip.extractAllTo(path.resolve(serverPath), true);
        return (ctx.body = {
            msg: 'ok'
        });
    } else {
        ctx.status(400);
        ctx.body = {
            msg: '指定路径不存在'
        };
        return;
    }
});

app.on('error', err => {
    console.error('[file-receiver error]: ' + err);
});

app.listen(process.env.PORT || 2001);
