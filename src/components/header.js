import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import tokens from "../data/tokens"
import { css } from "@emotion/core"
import Logo from "./logo"

const Header = ({ siteTitle, siteAuthor }) => (
  <header
    css={css({
      backgroundColor: tokens.color.background.light,
      color: tokens.color.text.default,
      fontFamily: tokens.font.family.sansSerif,
      padding: tokens.space.xs,
    })}
  >
    <div>
      <Link
        to="/"
        css={css({
          alignItems: 'center',
          color: tokens.color.text.secondary,
          display: 'inline-flex',
          textDecoration: 'none',
        })}
      >
        <div>
          <Logo />
        </div>
        <div>
          <div
            css={css({
              color: tokens.color.text.default,
              fontSize: 24,
              lineHeight: 1,
            })}
          >
            {siteAuthor}
          </div>
          <div
            css={css({
              fontSize: tokens.font.size.sm,
            })}
          >
            {siteTitle}
          </div>
        </div>
      </Link>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  siteAuthor: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
  siteAuthor: ``,
}

export default Header
