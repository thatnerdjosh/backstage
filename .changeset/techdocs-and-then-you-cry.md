---
'@backstage/plugin-techdocs': minor
---

This plugin now exports two TechDocs addons which expose "core" TechDocs functionality for use within a TechDocs addon-enabled configuration. If you wish to use TechDocs addons, you can get the same search and state/build log indication experiences by adding the following two addons to your `<TechDocsAddons>` registry:

```tsx
import {
  TechDocsSearch,
  TechDocsStateIndicator,
} from '@backstage/plugin-techdocs';
import { TechDocsAddons } from '@backstage/plugin-techdocs-addons';

// ...

<TechDocsAddons>
  <TechDocsStateIndicator />
  <TechDocsSearch />
</TechDocsAddons>;
```

If you do not wish to use TechDocs addons, no change is necessary and no functionality will be lost.
