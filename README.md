# gulp-locale-online-translator

Copy source files to new destination and use that destination as new source

Automatically creates needed folders before proceeding. Ability to remove 'prefixes' from path>


## Usage

```
var gulpLocaleOnlineTranslator = require('gulp-locale-online-translator');

gulp.task('translate-locale-files', function (done) {
    var original = {
        filename: './src/locale/locale-en.json',
        locale: 'en'
    };
    var translations = [
        {
            url: "http://postlikeapirate.com/AJAXtranslate.php?typing=",
            locale: "pirate"
        }
    ];

    gulpLocaleOnlineTranslator(original, translations, done);
});
```


## Contributing
We encourage you to contribute to this repo! Please send pull requests with modified and updated code.

1. Fork it ( https://github.com/tobiasc/gulp-locale-online-translator )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -a -m 'Add some feature'`), note please squash your commits if you have more than one.
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
