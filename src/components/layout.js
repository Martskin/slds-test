/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import tokens from "../data/tokens"
import { css } from "@emotion/core"
import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            author
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} siteAuthor={data.site.siteMetadata.author} />
        <div
          css={css({
            'main, footer': {
              color: tokens.color.text.default,
              fontFamily: tokens.font.family.sansSerif,
              margin: `0 auto`,
              maxWidth: tokens.layout.maxWidth.default,
              padding: tokens.space.md,
            },
            code: {
              backgroundColor: tokens.color.background.light,
              borderRadius: tokens.border.radius.default,
              color: tokens.color.text.error,
              padding: tokens.space.xxs,
            },
            h2 : {
              color: tokens.color.text.secondary,
              fontSize: tokens.font.size.lg,
            },
            h3 : {
              color: tokens.color.text.secondary,
              fontSize: tokens.font.size.md,
            },
            footer: {
              color: tokens.color.text.secondary,
              fontSize: tokens.font.size.sm,
            }
          })}
        >
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
