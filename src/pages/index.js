import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import CodeSnippet from "../components/codeSnippet"
import ShoppingList from "../components/shoppingList/shoppingList"
import tokens from "../data/tokens"
import { css } from "@emotion/core"
import beer from "../images/boneyard-beer.jpg"

const shoppingListExample = `
<ShoppingList
  heading="My Shopping List"
>
  <ShoppingList.Item
    heading="Loaf of bread"
    description="Sour dough or gluton free if they have it."
  />
  <ShoppingList.Item
    heading="Container of milk"
    description="2% not the low-fat watery stuff."
    isChecked
  />
  <ShoppingList.Item
    heading="Stick of butter"
    description="Or ghee if they have it."
  />
  <ShoppingList.Item
    heading="Chips"
    description="Potato or corn but nothing with onion flavor."
  />
  <ShoppingList.Item
    heading="Beer"
    description="Pilsner, IPA, Stout, Anything cold but look for Boneyard RPM:"
  >
    <img src={beer} alt="boneyard IPA" width="60" />
    <div>
      <span role="img" aria-label="beer emoji">🍺</span>
      <span role="img" aria-label="crazy face emoji">🤪</span>
    </div>
  </ShoppingList.Item>
  <ShoppingList.Item
    heading="Coffee"
    description="Grounds for pour-over."
  />
  <ShoppingList.Item
    heading="Pickles"
    description="Dill of course."
  />
</ShoppingList>
`;


const myShoppingListExample = (
  <ShoppingList
      heading="My Shopping List"
    >
      <ShoppingList.Item
        heading="Loaf of bread"
        description="Sour dough or gluton free if they have it."
      />
      <ShoppingList.Item
        heading="Container of milk"
        description="2% not the low-fat watery stuff."
        isChecked
      />
      <ShoppingList.Item
        heading="Stick of butter"
        description="Or ghee if they have it."
      />
      <ShoppingList.Item
        heading="Chips"
        description="Potato or corn but nothing with onion flavor."
      />
      <ShoppingList.Item
        heading="Beer"
        description="Pilsner, IPA, Stout, Anything cold but look for Boneyard RPM:"
      >
        <img src={beer} alt="boneyard IPA" width="60" />
        <div>
          <span role="img" aria-label="beer emoji">🍺</span>
          <span role="img" aria-label="crazy face emoji">🤪</span>
        </div>
      </ShoppingList.Item>
      <ShoppingList.Item
        heading="Coffee"
        description="Grounds for pour-over."
      />
      <ShoppingList.Item
        heading="Pickles"
        description="Dill of course."
      />
    </ShoppingList>
)

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Shopping List Component</h1>
    <p>This component accepts a <code>heading</code> prop and <code>ShoppingList.Item</code> components as children.</p>
    <p>The <code>ShoppingList.Item</code> component accepts <code>heading</code> and <code>description</code> props as well as any custom children elements.</p>

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
