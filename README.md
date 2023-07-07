# Snippet Builder (alpha testing)

https://zamsyt.github.io/snippetbuilder

This is a minimal demo currently with one feature: optional sections. Sections are defined using markdown headings within css comments. Anything under empty headings is non-optional (and anything before the first heading).

```css
/* ## First optional section ## */
body {
  color: red;
}

/* ## Second optional section ## */
...
```

(For testing purposes, it will currrently switch to listing all one-line comments for a file in the URL if the heading syntax isn't found.)

You can append links to raw files directly to the end of the URL. It works with GitHub raw file URLs. (Other sources might work too if they allow CORS, but many probably won't work.)

## Examples

https://zamsyt.github.io/snippetbuilder/https://raw.githubusercontent.com/zamsyt/snippetbuilder/main/examples/Easy%20multi-column%20notes.css
