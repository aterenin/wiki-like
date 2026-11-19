# Wiki-like: a Zola theme

[Wiki-like](https://aterenin.github.io/wiki-like) is a Zola theme for hosting pages which aesthetically appear to look like those of a wiki, but are non-interactive.
A demo website built with Wiki-like can be found at [aterenin.github.io/wiki-like](https://aterenin.github.io/wiki-like).

# Features 

[Wiki-like](https://github.com/aterenin/wiki-like) is designed for most features you would need for content that would be displayed in the style of a wiki. This includes:

* A Wikipedia-inspired layout with a navigation menu on the left, and appropriate styling for lists, tables, quotations, code blocks, and other content that is well-suited to a theme of this kind.
* Math via [KaTeX](https://katex.org). KaTeX inline math is written `` `$x$` `` and display-style math is written `` ```$$ ... $$``` `` inside triple-backticks over multiple lines, with no language label. A client-side rendering script is included on all pages where this syntax is used, but rendering can instead be done server-side or disabled.
* Diagrams via [Mermaid](https://mermaid.js.org). These are written inside triple backticks as in `` ```mermaid ... ``` ``. A client-side rendering script is included on all pages where this syntax is used, but rendering can instead be done server-side or disabled.
* Both KaTeX math and Mermaid diagrams can be rendered server-side. This is done by running a pair of Node scripts after `zola build` has completed. A deploy script for building with these features is included, which enables them if an appropriate option is set in `Zola.toml`.
* They can also be disabled entirely, even if the respective syntax is used, by creating blank files called `templates/includes/katex.html` and `templates/includes/mermaid.html` in your site's code.
* Footnotes that are numbered rather than named, using `[^1]` and similar, will render as sidenotes rather than footnotes.
* Please open a GitHub issue if there is another type of content that you would like to display using this theme, but it is not supported natively.

# Design and maintainability 

[Wiki-like](https://github.com/aterenin/wiki-like) is [designed to last](https://jeffhuang.com/designed_to_last/).
This means it follows a set of best practices which try to ensure websites correctly built with it will work correctly in the indefinite future with minimal maintenance, even as the internet changes and links break over time.
As consequence, the theme has no JavaScript or CSS dependencies if KaTeX and Mermaid are used server-side.

# Documentation

The examples below document the theme's options which are available in the TOML files, which are listed as comments within each file.

## Zola.toml

```toml
title = "Example" # should be set to your site's title
base_url = "https://example.com"
compile_sass = true # should be set to true
build_search_index = false # not used by the theme
generate_feeds = false # not used by the theme
minify_html = true # to ensure correct rendering due to minification of whitespace, should be set to true, unless there is a reason to override it

[markdown]
bottom_footnotes = true # should be set to true to ensure correct footnote formatting
highlighting.light_theme = "github-light" # this changes the syntax highlighting theme in light mode
highlighting.dark_theme = "github-dark" # this changes the syntax highlighting theme in dark mode
smart_punctuation = true # should be set to true
insert_anchor_links = "heading" # should be set to "heading"

[extra]
server_side_katex = false # set to true to enable server-side KaTeX rendering via scripts/katex.mjs, this will also include KaTeX CSS and fonts in the build
server_side_mermaid = false # set to true to enable server-side Mermaid rendering via scripts/mermaid.mjs, this will include rendered assets as colocated files
```

## Page and section configuration

```toml 
title = "Page or section title" # a title should be set on every page, to ensure the page can be correctly linked from menus
[extra]
show_subpages = true # if the page is a section, setting this to true will generate a menu of pages within the section
```