import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import CodeSnippet from "../components/codeSnippet"
import ShoppingList from "../components/shoppingList/shoppingList"
import tokens from "../data/tokens"
import { css } from "@emotion/core"

const shoppingListDefaultExample = `
<ShoppingList
  heading="Shopping List"
>
  <ShoppingList.Item
    upc={983710}
    name="Astro Camping Hat"
    price={11.99}
  />
  <ShoppingList.Item
    upc={983711}
    name="Astro Hat - Sizzling Summer Edition"
    price={8.99}
    description="One size fits all."
    inStock={false}
  />
  <ShoppingList.Item
    upc={983712}
    name="Astro Beanie - White Winter Edition"
    price={9.99}
  />
  <ShoppingList.Item
    upc={983713}
    name="Astro Beanie - Splashing Spring Edition"
    price={10.99}
  />
</ShoppingList>
`;

const shoppingListNarrowExample = `
<ShoppingList
  heading="Shopping List"
  variant="narrow"
>
  <ShoppingList.Item
    upc={983710}
    name="Astro Camping Hat"
    price={11.99}
  />
  <ShoppingList.Item
    upc={983711}
    name="Astro Hat - Sizzling Summer Edition"
    price={8.99}
    description="One size fits all."
    inStock={false}
  />
  <ShoppingList.Item
    upc={983712}
    name="Astro Beanie - White Winter Edition"
    price={9.99}
  />
  <ShoppingList.Item
    upc={983713}
    name="Astro Beanie - Splashing Spring Edition"
    price={10.99}
  />
</ShoppingList>
`;

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Shopping List Component</h1>
    <ul>
      <li>This component accepts a <code>name</code> prop, a <code>variant</code> prop and <code>ShoppingList.Item</code> components as children.</li>
      <li>The <code>ShoppingList.Item</code> component accepts <code>upc</code>, <code>name</code>, <code>price</code>, <code>description</code> and <code>inStock</code> props.</li>
      <li>Once the <code>remove</code> button is clicked the user has 5 seconds to <code>undo</code> the deletion.</li>
    </ul>
  
    <h2>Default variant in {tokens.layout.maxWidth.default}px max-width container</h2>
    <ShoppingList
      heading="Shopping List"
    >
      <ShoppingList.Item
        upc={983710}
        name="Astro Camping Hat"
        price={11.99}
      />
      <ShoppingList.Item
        upc={983711}
        name="Astro Hat - Sizzling Summer Edition"
        price={8.99}
        description="One size fits all."
        inStock={false}
      />
      <ShoppingList.Item
        upc={983712}
        name="Astro Beanie - White Winter Edition"
        price={9.99}
      />
      <ShoppingList.Item
        upc={983713}
        name="Astro Beanie - Splashing Spring Edition"
        price={10.99}
      />
    </ShoppingList>

    <h2>Narrow variant in {tokens.layout.maxWidth.small}px max-width container</h2>
    <div
      css={css({
        margin: `0 auto`,
        maxWidth: tokens.layout.maxWidth.small,
      })}
    >
      <ShoppingList
        heading="Shopping List"
        variant="narrow"
      >
        <ShoppingList.Item
          upc={983710}
          name="Astro Camping Hat"
          price={11.99}
        />
        <ShoppingList.Item
          upc={983711}
          name="Astro Hat - Sizzling Summer Edition"
          price={8.99}
          description="One size fits all."
          inStock={false}
        />
        <ShoppingList.Item
          upc={983712}
          name="Astro Beanie - White Winter Edition"
          price={9.99}
        />
        <ShoppingList.Item
          upc={983713}
          name="Astro Beanie - Splashing Spring Edition"
          price={10.99}
        />
      </ShoppingList>
    </div>

    <h3>Shopping List Default Code Snippet</h3>
    <CodeSnippet code={shoppingListDefaultExample} language="jsx" />

    <h3>Shopping List Narrow Variant Code Snippet</h3>
    <CodeSnippet code={shoppingListNarrowExample} language="jsx" />

    <h3>Tokens</h3>
    <CodeSnippet code={JSON.stringify(tokens, null, 2)} language="json" />

  </Layout>
)

export default IndexPage
