import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import CodeSnippet from "../components/codeSnippet"
import ShoppingList from "../components/shoppingList/shoppingList"
import tokens from "../data/tokens"
import { css } from "@emotion/core"

const shoppingListExample = `
<ShoppingList
  name="Shopping List"
>
  
</ShoppingList>
`;


const myShoppingListExample = (
  <ShoppingList
    heading="Shopping List"
  >
    <ShoppingList.Item
      name="Astro Camping Hat"
      price={11.99}
    />
    <ShoppingList.Item
      name="Astro Hat - Sizzling Summer Edition"
      price={8.99}
      description="One size fits all."
      inStock={false}
    />
    <ShoppingList.Item
      name="Astro Beanie - White Winter Edition"
      price={9.99}
    />
    <ShoppingList.Item
      name="Astro Beanie - Splashing Spring Edition"
      price={10.99}
    />
  </ShoppingList>
)

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Shopping List Component</h1>
    <ul>
      <li>This component accepts a <code>name</code> prop and <code>ShoppingList.Item</code> components as children.</li>
      <li>The <code>ShoppingList.Item</code> component accepts <code>name</code> and <code>description</code> props as well as any custom children elements.</li>
      <li>Once the <code>X Delete</code> button is clicked the user has 5 seconds to <code>Undo</code> the deletion.</li>
    </ul>
  
    <h2>In {tokens.layout.maxWidth.default}px max-width container</h2>
    {myShoppingListExample}

    <h2>In {tokens.layout.maxWidth.small}px max-width container</h2>
    <div
      css={css({
        margin: `0 auto`,
        maxWidth: tokens.layout.maxWidth.small,
      })}
    >
      {myShoppingListExample}
    </div>

    <h3>Shopping List Component Code Snippet</h3>
    <CodeSnippet code={shoppingListExample} language="jsx" />

  </Layout>
)

export default IndexPage
