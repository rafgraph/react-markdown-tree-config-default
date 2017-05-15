# React Markdown Tree Config Default

Default config for [React Markdown Tree](https://github.com/rafrex/react-markdown-tree) for zero setup markdown styling with syntax highlighting.

```shell
$ yarn add react-markdown-tree-config-default
# OR
$ npm install --save react-markdown-tree-config-default
```

```js
import { MarkdownProvider } from 'react-markdown-tree';
import markdownConfig from 'react-markdown-tree-config-default';
import App from './App';
...
<MarkdownProvider config={markdownConfig}>
  <App />
</MarkdownProvider>
```

You can also use the UMD build that's available from Unpkg:
```html
<!-- Available at window.ReactMarkdownTreeConfigDefault -->
<script src="https://unpkg.com/react-markdown-tree-config-default/dist/react-markdown-tree-config-default.min.js"></script>
```

### Editing the Config

The imported `markdownConfig` is a mutable POJO, so you can overwrite any of the renderers by assigning it to your custom renderer (a ReactComponent). This is useful if overall you like the style but want to slightly tweak how it renders. You can also add a `containerProps` object for default props to pass down to every instance of `<Markdown>`. These edits must be made before passing it in as a `prop` to `<MarkdownProvider>`. See [React Markdown Tree Config](https://github.com/rafrex/react-markdown-tree#config-object) for more info on the config object structure.
```js
import markdownConfig from 'react-markdown-tree-config-default';

// to render soft breaks as line breaks
markdownConfig.renderers.Softbreak = () => <br />;

// to render paragraphs with your custom styles
markdownConfig.renderers.Paragraph = props => {
  const style = {
    // your custom paragraph styles
  }
  return <p style={style}>{props.children}</p>;
};

// etc...

// add a containerProps object for default props to pass
// down to every instance of <Markdown>
markdownConfig.containerProps = {
  // default container props
}
```
