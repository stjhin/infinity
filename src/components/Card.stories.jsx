import React from 'react'
import Card from './Card'
import { eventControl, propControl, slotControl } from '../storybook/controlGroups'
import googleIconNames from '../data/googleIconNames.json'
import figmaDocs from './Card.figma.generated'

const ICON_OPTIONS = ['', ...googleIconNames]

const TYPE_OPTIONS = ['default', 'no-image', 'no-image-link', 'link']
const TYPE_LABELS = {
  default: 'Default',
  'no-image': 'No Image',
  'no-image-link': 'No Image Link',
  link: 'Link',
}

// Inline SVG placeholder so image slots render without external assets.
const PLACEHOLDER_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">' +
    '<rect width="480" height="360" fill="#dfd8fd"/>' +
    '<circle cx="240" cy="130" r="52" fill="#b8acf6"/>' +
    '<path d="M120 300 L300 130 L360 260 L430 210 L430 300 Z" fill="#8f7ee7"/>' +
    '<text x="240" y="330" font-family="sans-serif" font-size="24" fill="#352c63" text-anchor="middle">Image</text>' +
    '</svg>'
)}`

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Card surfaces a title, subtitles, body copy, an optional image, and a CTA (button or link). ' +
          'Variants follow the Figma Card component set ' +
          `(${figmaDocs.figmaUrl}): Type (Default, No Image, No Image Link, Link), Orientation (Portrait, Landscape) and Alignment (Left, Center). ` +
          'The card width adjusts to its content: text columns cap at 208px (240px card) or 296px for no-image types (328px card), ' +
          'and the landscape image column is 240px (480px card). Override with a style width when a fixed size is needed.',
      },
    },
  },
  argTypes: {
    type: propControl({
      name: 'Type',
      description: 'Figma variant: Type. Default/No Image render a Button CTA; No Image Link/Link render a text Link CTA.',
      control: { type: 'select' },
      options: TYPE_OPTIONS,
      labels: TYPE_LABELS,
    }),
    orientation: propControl({
      name: 'Orientation',
      description: 'Figma variant: Orientation. Portrait stacks image above text; landscape places them side by side.',
      control: { type: 'radio' },
      options: ['portrait', 'landscape'],
    }),
    alignment: propControl({
      name: 'Alignment',
      description: 'Figma variant: Alignment. Controls text alignment inside the card.',
      control: { type: 'radio' },
      options: ['left', 'center'],
    }),
    className: propControl({ name: 'Class name', control: { type: 'text' } }),
    showImage: slotControl({ name: 'Show image', description: 'Figma boolean property "Image#7:23". Ignored for No Image types.', control: { type: 'boolean' } }),
    showSubtitleTop: slotControl({ name: 'Show subtitle top', description: 'Figma boolean property "Subtitle-top#7:25".', control: { type: 'boolean' } }),
    showTitle: slotControl({ name: 'Show title', description: 'Figma boolean property "Title#7:22".', control: { type: 'boolean' } }),
    showSubtitleBottom: slotControl({ name: 'Show subtitle bottom', description: 'Figma boolean property "Subtitle-bottom#7:29".', control: { type: 'boolean' } }),
    showDescription: slotControl({ name: 'Show description', description: 'Figma boolean property "Description#7:24".', control: { type: 'boolean' } }),
    showButton: slotControl({ name: 'Show button', description: 'Figma boolean property "Button#7:21".', control: { type: 'boolean' } }),
    subtitleTop: slotControl({ name: 'Subtitle top', control: { type: 'text' } }),
    title: slotControl({ name: 'Title', control: { type: 'text' } }),
    subtitleBottom: slotControl({ name: 'Subtitle bottom', control: { type: 'text' } }),
    description: slotControl({ name: 'Description', control: { type: 'text' } }),
    footerText: slotControl({ name: 'Footer text', description: 'Gray footer subtitle shown in Figma No Image / No Image Link types. Empty hides it.', control: { type: 'text' } }),
    imageSrc: slotControl({ name: 'Image src', control: { type: 'text' } }),
    imageAlt: slotControl({ name: 'Image alt', control: { type: 'text' } }),
    buttonLabel: slotControl({ name: 'CTA label', control: { type: 'text' } }),
    buttonLeadingIcon: slotControl({
      name: 'CTA leading icon',
      description: 'Google Material Symbol name (button CTA only).',
      control: { type: 'select' },
      options: ICON_OPTIONS,
      labels: { '': 'None' },
    }),
    buttonTrailingIcon: slotControl({
      name: 'CTA trailing icon',
      description: 'Google Material Symbol name (button CTA only).',
      control: { type: 'select' },
      options: ICON_OPTIONS,
      labels: { '': 'None' },
    }),
    linkHref: slotControl({ name: 'Link href', description: 'Href for link-type CTAs.', control: { type: 'text' } }),
    onButtonClick: eventControl({ control: false }),
  },
}

export default meta

const BASE_ARGS = {
  type: 'default',
  orientation: 'portrait',
  alignment: 'left',
  showImage: true,
  showSubtitleTop: true,
  showTitle: true,
  showSubtitleBottom: true,
  showDescription: true,
  showButton: true,
  subtitleTop: 'Subtitle',
  title: 'Card title',
  subtitleBottom: 'Subtitle',
  description: 'Lorem ipsum dolor sit amet, consectur adipiscing elit, sed do eiusmond tempor incidunt.',
  footerText: '',
  imageSrc: PLACEHOLDER_IMAGE,
  imageAlt: 'Card image',
  buttonLabel: 'Learn more',
  buttonLeadingIcon: 'chevron_left',
  buttonTrailingIcon: 'chevron_right',
  linkHref: '#',
}

const renderCard = (args) => <Card {...args} />

const createStory = (name, args) => ({
  name,
  render: renderCard,
  args: { ...BASE_ARGS, ...args },
})

export const Default = createStory('Default', {
  type: 'default',
  orientation: 'portrait',
  alignment: 'left',
})

export const DefaultLandscape = createStory('Default / Landscape', {
  type: 'default',
  orientation: 'landscape',
  alignment: 'left',
})

export const NoImage = createStory('No Image', {
  type: 'no-image',
  orientation: 'landscape',
  alignment: 'left',
  showImage: false,
  footerText: 'Subtitle',
})

export const NoImageCentered = createStory('No Image / Centered', {
  type: 'no-image',
  orientation: 'landscape',
  alignment: 'center',
  showImage: false,
  footerText: 'Subtitle',
})

export const NoImageLink = createStory('No Image Link', {
  type: 'no-image-link',
  orientation: 'landscape',
  alignment: 'left',
  showImage: false,
  footerText: 'Subtitle',
})

export const NoImageLinkCentered = createStory('No Image Link / Centered', {
  type: 'no-image-link',
  orientation: 'landscape',
  alignment: 'center',
  showImage: false,
  footerText: 'Subtitle',
})

export const LinkPortrait = createStory('Link / Portrait', {
  type: 'link',
  orientation: 'portrait',
  alignment: 'left',
})

export const LinkLandscape = createStory('Link / Landscape', {
  type: 'link',
  orientation: 'landscape',
  alignment: 'left',
})