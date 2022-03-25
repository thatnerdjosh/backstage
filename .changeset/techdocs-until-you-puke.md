---
'@backstage/plugin-techdocs': minor
---

TechDocs now supports a new method of customization: addons!

To customize the standalone TechDocs reader page experience, update your `/packages/app/src/App.tsx` in the following way:

```diff
- import { TechDocsIndexPage, TechDocsReaderPage } from '@backstage/plugin-techdocs';
- import { techDocsPage } from './components/techdocs/TechDocsPage';
+ import {
+   TechDocsIndexPage,
+   TechDocsReaderPage,
+   TechDocsSearch,
+   TechDocsStateIndicator,
+ } from '@backstage/plugin-techdocs';
+ import { TechDocsAddons } from '@backstage/plugin-techdocs-addons';

// ...

    <Route path="/docs" element={<TechDocsIndexPage />} />
    <Route
      path="/docs/:namespace/:kind/:name/*"
      element={<TechDocsReaderPage />}
    >
-      {techDocsPage}
+      <TechDocsAddons>
+        <TechDocsStateIndicator />
+        <TechDocsSearch />
+      </TechDocsAddons>
    </Route>

// ...
```

To customize the TechDocs reader experience on the Catalog entity page, update your `packages/app/src/components/catalog/EntityPage.tsx` in the following way:

```diff
- import { EntityTechdocsContent } from '@backstage/plugin-techdocs';
+ import {
+   EntityTechdocsContent,
+   TechDocsSearch,
+   TechDocsStateIndicator,
+ } from '@backstage/plugin-techdocs';
+ import { TechDocsAddons } from '@backstage/plugin-techdocs-addons';

// ...

  <EntityLayoutWrapper>
    <EntityLayout.Route path="/" title="Overview">
      {overviewContent}
    </EntityLayout.Route>

    <EntityLayout.Route path="/docs" title="Docs">
-      <EntityTechDocsContent />
+      <EntityTechdocsContent>
+        <TechDocsAddons>
+          <TechDocsStateIndicator />
+          <TechDocsSearch />
+        </TechDocsAddons>
+      </EntityTechdocsContent>
    </EntityLayout.Route>
  </EntityLayoutWrapper>

// ...
```

If you do not wish to customize your TechDocs reader experience in this way at this time, no changes are necessary!
