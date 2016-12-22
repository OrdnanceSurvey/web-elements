`<os-button>` is a wrapper around `<md-button>` with some added wins / differences:

- uses MDL for the ripple instead of ngMaterial1
- more variations e.g. `outline`, `super`
- optional loading spinner `spinner="true"`

<osel-docs-demo osel-title="Basic usage" osel-html="button.demo.html"></osel-docs-demo>

## Attributes

Parameter | Type | Default | Description
--- | --- | --- | ---
**colour** | `string` | | Colour palette name (i.e. colour intention). Supported values are the same as ngMaterial1: `primary`/`accent`/`warn`/`background`.  Essentially this adds a class (md-**colour**) to the internal `<md-button>` so any normal ngMaterial1 palette should work. 
**variation** | `string` | | Specific variation. Supports `solid`/`outline`/`super`/`icon`/`text`.
**type** | `string` | | Adds the `type` attribute to the internal `<button>`, this is useful for form button types such as `submit`/`button`
**disabled** | `boolean` | `false` | Dis/Enable the button to stop clicks being allowed
**loading** | `boolean` | `false` | Show/hide the inner loading spinner. Also disables the button while true