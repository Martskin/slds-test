import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import tokens from "../data/tokens"
import CodeSnippet from "../components/codeSnippet"

const SecondPage = () => (
  <Layout>
    <SEO title="Tokens" />
    <h1>Tokens</h1>
    <CodeSnippet code={JSON.stringify(tokens, null, 2)} language="json" />
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
