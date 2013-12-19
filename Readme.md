
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
