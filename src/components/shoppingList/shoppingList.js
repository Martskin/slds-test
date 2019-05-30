import PropTypes from "prop-types"
import React from "react"
import tokens from "../../data/tokens"
import { css } from "@emotion/core"
import shoppinListItem from './shoppingListItem'

class ShoppingList extends React.Component {
  static Item = shoppinListItem;

  render() {
    const { heading, children } = this.props;

    return (
      <div
        css={css({
          border: tokens.border.component,
          borderRadius: tokens.border.radius.default,
          color: tokens.color.text.default,
          fontFamily: tokens.font.family.sansSerif,
          marginBottom: tokens.space.md,
          overflow: 'hidden',
          padding: 0,
        })}
      >
        {heading && (
          <div
            css={css({
              fontSize: tokens.font.size.lg,
              margin: 0,
              padding: tokens.space.sm,
            })}
          >
            {heading}
          </div>
        )}
        <ul
          css={css({
            listStyle: 'none',
            margin: 0,
            padding: 0,
          })}
        >
          {children}
        </ul>
      </div>
    );
  }
}

ShoppingList.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}

ShoppingList.defaultProps = {
  heading: undefined,
  children: undefined
}

export default ShoppingList
