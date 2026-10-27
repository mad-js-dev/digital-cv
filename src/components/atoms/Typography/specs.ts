/**
 * Typography Specification Tokens
 * 
 * This file defines the mapping between semantic typography variants 
 * and their visual properties.
 */

// No unused imports here

export const TYPOGRAPHY_SPECS = {
  roles: {
    display: {
      tag: 'h1',
      variants: {
        small: 'display-small',
        medium: 'display-medium',
        large: 'display-large',
      },
      defaultVariant: 'display-medium',
    },
    headline: {
      tag: 'h2',
      variants: {
        small: 'headline-small',
        medium: 'headline-medium',
        large: 'headline-large',
      },
      defaultVariant: 'headline-medium',
    },
    title: {
      tag: 'h3',
      variants: {
        small: 'title-small',
        medium: 'title-medium',
        large: 'title-large',
      },
      defaultVariant: 'title-medium',
    },
    body: {
      tag: 'p',
      variants: {
        small: 'body-small',
        medium: 'body-medium',
        large: 'body-large',
      },
      defaultVariant: 'body-medium',
    },
    label: {
      tag: 'span',
      variants: {
        small: 'label-small',
        medium: 'label-medium',
        large: 'label-large',
      },
      defaultVariant: 'label-large',
    },
  },
  defaults: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 400,
    letterSpacing: 0,
    color: 'current',
    treatment: 'none',
  }
} as const;

export type TypographyRole = keyof typeof TYPOGRAPHY_SPECS.roles;
