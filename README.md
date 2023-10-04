# railstodo README

This minimal extension allow you to insert snippet with command `Rails > Todo git annotation` (or `ctrl+shift+n`).
It will be insert a snippet like:

- `# TODO gitBranch: description of I need to do` for *ruby* file
- `<%# TODO gitBranch: description of I need to do %>` for *erb* file
- `// TODO gitBranch: description of I need to do` for *javascript* or *typescript* file


in a terminal you can run this:

```bash
  rails notes --annotations="TODO $(git branch --show-current)"
```

or you can create an alias:

```bash
 alias todo="rails notes --annotations=\"TODO \$(git branch --show-current)\""
```
