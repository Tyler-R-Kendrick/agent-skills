---
description: Guidance for EditorConfig for consistent coding styles.
metadata:
  displayName: EditorConfig
---

# EditorConfig

## Overview
EditorConfig helps maintain consistent coding styles across different editors and IDEs.

## Example (.editorconfig)
```ini
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 4
insert_final_newline = true
trim_trailing_whitespace = true

[*.{cs,csx}]
csharp_new_line_before_open_brace = all
csharp_space_after_cast = false
dotnet_sort_system_directives_first = true

[*.{json,yml,yaml}]
indent_size = 2

[*.md]
trim_trailing_whitespace = false
```

## Best Practices
- Place .editorconfig in repository root
- Set root = true in top-level file
- Configure language-specific rules
- Include in version control
- Combine with .NET analyzers
