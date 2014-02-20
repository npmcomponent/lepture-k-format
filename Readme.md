*This repository is a mirror of the [component](http://component.io) module [lepture/k-format](http://github.com/lepture/k-format). It has been modified to work with NPM+Browserify. You can install it using the command `npm install npmcomponent/lepture-k-format`. Please do not open issues or send pull requests against this repo. If you have issues with this repo, report it to [npmcomponent](https://github.com/airportyh/npmcomponent).*

# k-format

Fix keyboard behavior for format.

## Installation

Install with [component(1)](http://component.io):

    $ component install lepture/k-format

## API

The only API is itself:

```
require('k-format')(editableElement)
```

This will fix all the wrong behaviors of keyboard in editable element.

1. always insert `<p>`
2. shift + enter insert `<br>`
3. double enter insert `<hr>`
4. disable insert blank new lines

## License

MIT
