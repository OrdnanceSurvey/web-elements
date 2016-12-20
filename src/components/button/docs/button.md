`<os-button>` is a wrapper around `<md-button>` with some added wins / differences:

- uses MDL for the ripple instead of ngMaterial1
- more variations e.g. `outline`, `super`
- optional loading spinner `spinner="true"`

<osel-docs-demo osel-title="Basic usage" osel-html="button.demo.html"></osel-docs-demo>

## Attributes

Parameter | Type | Default | Description
--- | --- | --- | ---
**colour** | `string` | | Colour intention e.g. `primary`, `secondary`
**variation** | `string` | | Specific variation e.g. `solid`, `outline`, `super`, `icon`, `text`
**type** | `string` | | Adds the `type` attribute e.g. `submit`, `button`
**disabled** | `boolean` | `false` | Dis/Enable the button to stop clicks being allowed
**loading** | `boolean` | `false` | Show/hide the inner loading spinner. Also disables the button while true